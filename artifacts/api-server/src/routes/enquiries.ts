import { Router } from "express";
import { db, enquiriesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  CreateEnquiryBody,
  UpdateEnquiryStatusBody,
  ListEnquiriesQueryParams,
  GetEnquiryParams,
  GetEnquiryQueryParams,
  UpdateEnquiryStatusParams,
  UpdateEnquiryStatusQueryParams,
} from "@workspace/api-zod";

const ADMIN_KEY = process.env.ADMIN_KEY ?? "rcpatel-admin-2025";

const router = Router();

router.post("/enquiries", async (req, res) => {
  const parsed = CreateEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, phone, email, projectType, city, budget, message, imageObjectPaths } = parsed.data;

  const [enquiry] = await db.insert(enquiriesTable).values({
    name,
    phone,
    email: email ?? null,
    projectType,
    city: city ?? null,
    budget: budget ?? null,
    message,
    imageObjectPaths: imageObjectPaths ?? [],
    status: "new",
  }).returning();

  req.log.info({ enquiryId: enquiry.id }, "New enquiry submitted");
  res.status(201).json(formatEnquiry(enquiry));
});

router.get("/enquiries", async (req, res) => {
  const parsed = ListEnquiriesQueryParams.safeParse(req.query);
  if (!parsed.success || parsed.data.adminKey !== ADMIN_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const enquiries = await db.select().from(enquiriesTable).orderBy(desc(enquiriesTable.createdAt));
  res.json(enquiries.map(formatEnquiry));
});

router.get("/enquiries/:id", async (req, res) => {
  const paramsParsed = GetEnquiryParams.safeParse(req.params);
  const queryParsed = GetEnquiryQueryParams.safeParse(req.query);

  if (!paramsParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  if (!queryParsed.success || queryParsed.data.adminKey !== ADMIN_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const [enquiry] = await db.select().from(enquiriesTable).where(eq(enquiriesTable.id, paramsParsed.data.id));
  if (!enquiry) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json(formatEnquiry(enquiry));
});

router.patch("/enquiries/:id", async (req, res) => {
  const paramsParsed = UpdateEnquiryStatusParams.safeParse(req.params);
  const queryParsed = UpdateEnquiryStatusQueryParams.safeParse(req.query);
  const bodyParsed = UpdateEnquiryStatusBody.safeParse(req.body);

  if (!paramsParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  if (!queryParsed.success || queryParsed.data.adminKey !== ADMIN_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!bodyParsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }

  const [updated] = await db
    .update(enquiriesTable)
    .set({ status: bodyParsed.data.status })
    .where(eq(enquiriesTable.id, paramsParsed.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json(formatEnquiry(updated));
});

function formatEnquiry(e: typeof enquiriesTable.$inferSelect) {
  return {
    id: e.id,
    name: e.name,
    phone: e.phone,
    email: e.email ?? null,
    projectType: e.projectType,
    city: e.city ?? null,
    budget: e.budget ?? null,
    message: e.message,
    status: e.status,
    imageObjectPaths: (e.imageObjectPaths as string[]) ?? [],
    createdAt: e.createdAt.toISOString(),
  };
}

export default router;
