import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, Instagram, Facebook, Menu, X, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateEnquiry, useRequestUploadUrl } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <StatsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="text-lg sm:text-xl tracking-widest font-semibold uppercase text-primary">
          R C Patel
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wider font-medium text-foreground/70">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <Button
          variant="outline"
          className="hidden md:inline-flex rounded-none border-primary/30 hover:bg-primary/5 uppercase tracking-widest text-xs"
          asChild
        >
          <a href="#contact">Inquire Now</a>
        </Button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-widest font-medium text-foreground/70 hover:text-primary transition-colors py-2 border-b border-border/30 last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 bg-primary text-white text-center py-3 text-xs uppercase tracking-widest font-medium"
              >
                Inquire Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Luxurious Minimal Living Room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 text-center text-white py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-6 text-white/70">
            Interior Design Studio · Gujarat, India
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light mb-6 sm:mb-8 max-w-4xl mx-auto leading-tight">
            Where Precision Meets{" "}
            <span className="italic font-light text-amber-200">Warmth</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-light max-w-xl mx-auto mb-8 sm:mb-10 text-white/75 leading-relaxed px-2">
            Transforming raw spaces into refined living environments. Craftsmanship, confidence, and trust — every project, every detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-none bg-primary hover:bg-primary/90 text-white px-8 py-5 sm:py-6 text-xs sm:text-sm uppercase tracking-widest w-full sm:w-auto"
              asChild
            >
              <a href="#portfolio" data-testid="link-explore-work">Explore Our Work</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-none border-white/50 text-white hover:bg-white/10 px-8 py-5 sm:py-6 text-xs sm:text-sm uppercase tracking-widest bg-transparent w-full sm:w-auto"
              asChild
            >
              <a href="#contact" data-testid="link-get-quote">Get a Quote</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-xs sm:text-sm uppercase tracking-widest mb-3 block">About the Studio</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-5 sm:mb-6 leading-snug">
              Crafting Spaces with Intent.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              At R C Patel Interior, we believe a space should feel as good as it looks. Based in Surat, Gujarat, we specialise in residential and commercial interiors that balance aesthetic restraint with inviting warmth.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              From conceptual space planning to turnkey execution, we handle every detail — materials, contractors, timelines — so you simply step into your dream environment.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8 pt-4 border-t border-border/50">
              {[["10+", "Years"], ["200+", "Projects"], ["100%", "Turnkey"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl sm:text-3xl font-light text-primary">{num}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
            <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 uppercase tracking-widest text-xs sm:text-sm group" asChild>
              <a href="#services" className="flex items-center gap-2">
                Our Services <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="relative h-[320px] sm:h-[450px] md:h-[560px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/about-details.png"
              alt="Design details and craftsmanship"
              className="w-full h-full object-cover shadow-2xl"
            />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-primary text-white p-4 sm:p-6 hidden sm:block">
              <p className="text-2xl sm:text-3xl font-light">200+</p>
              <p className="text-xs uppercase tracking-widest opacity-80 mt-1">Projects Delivered</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { title: "Residential Interiors", desc: "Personalised homes that reflect your lifestyle — from living rooms to master suites." },
  { title: "Commercial Spaces", desc: "Retail stores, restaurants, and hospitality interiors that impress from the first step." },
  { title: "Modular Kitchens", desc: "Sleek, highly functional kitchens tailored to your culinary habits and aesthetic." },
  { title: "Office Interiors", desc: "Productive, inspiring workplaces designed to energise your team every day." },
  { title: "Turnkey Solutions", desc: "End-to-end execution from concept to handover. One point of contact, zero stress." },
  { title: "Space Planning", desc: "Strategic layouts maximising flow, functionality, and natural light in any property." },
];

function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-primary text-xs sm:text-sm uppercase tracking-widest mb-3 block">Expertise</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light">Comprehensive Design Solutions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="bg-background p-6 sm:p-8 border border-border/50 hover:border-primary/40 hover:shadow-md transition-all"
              data-testid={`card-service-${i}`}
            >
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h3 className="text-base sm:text-lg font-medium mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const items = [
    { img: "/images/portfolio-1.png", title: "Serene Residence", category: "Residential" },
    { img: "/images/portfolio-2.png", title: "Modern Culinary Space", category: "Modular Kitchen" },
    { img: "/images/portfolio-3.png", title: "The Terracotta Lounge", category: "Living Room" },
  ];

  return (
    <section id="portfolio" className="py-16 sm:py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4">
          <div>
            <span className="text-primary text-xs sm:text-sm uppercase tracking-widest mb-3 block">Selected Works</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light">Featured Projects</h2>
          </div>
          <Button variant="outline" className="rounded-none self-start sm:self-auto text-xs sm:text-sm" asChild>
            <a href="#contact">Start Your Project</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group cursor-pointer"
              data-testid={`card-portfolio-${i}`}
            >
              <div className="overflow-hidden relative aspect-[4/5] mb-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="bg-white/90 text-black px-5 py-2 text-xs uppercase tracking-widest">
                    View Project
                  </div>
                </div>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{item.category}</p>
              <h3 className="text-base sm:text-lg font-medium group-hover:text-primary transition-colors">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { num: "10+", label: "Years of Excellence" },
    { num: "200+", label: "Projects Completed" },
    { num: "50+", label: "Commercial Spaces" },
    { num: "100%", label: "Client Satisfaction" },
  ];
  return (
    <section className="py-12 sm:py-16 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-2">{s.num}</p>
              <p className="text-xs uppercase tracking-widest text-background/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Consultation", desc: "Understanding your vision, lifestyle, and spatial requirements in detail." },
    { num: "02", title: "Concept & Design", desc: "Layouts, material palettes, furniture selection, and 3D visualisations." },
    { num: "03", title: "Execution", desc: "Bringing the design to life with skilled craftsmen and quality materials." },
    { num: "04", title: "Handover", desc: "A spotless, ready-to-live space — exactly as envisioned, on schedule." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-primary-foreground/60 text-xs uppercase tracking-widest mb-3 block">Our Process</span>
          <h2 className="text-3xl sm:text-4xl font-light">How We Work</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="text-4xl sm:text-5xl font-light text-primary-foreground/20 mb-4">{step.num}</div>
              <h3 className="text-lg sm:text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-primary-foreground/65 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const createEnquiry = useCreateEnquiry();
  const requestUploadUrl = useRequestUploadUrl();

  const [form, setForm] = useState({
    name: "", phone: "", email: "", projectType: "",
    city: "", budget: "", message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).slice(0, 3);
    setFiles(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.projectType || !form.message) {
      toast({ title: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const imagePaths: string[] = [];
      for (const file of files) {
        const { uploadURL, objectPath } = await requestUploadUrl.mutateAsync({
          data: { name: file.name, size: file.size, contentType: file.type },
        });
        await fetch(uploadURL, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });
        imagePaths.push(objectPath);
      }

      await createEnquiry.mutateAsync({
        data: {
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          projectType: form.projectType as "residential" | "commercial" | "office" | "hospitality" | "other",
          city: form.city || undefined,
          budget: form.budget || undefined,
          message: form.message,
          imageObjectPaths: imagePaths,
        },
      });

      setSubmitted(true);
      toast({ title: "Enquiry submitted!", description: "We'll contact you within 24 hours." });
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16">

          {/* Left: Info */}
          <div>
            <span className="text-primary text-xs sm:text-sm uppercase tracking-widest mb-3 block">Get in Touch</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8 leading-snug">
              Let's create something beautiful together.
            </h2>
            <p className="text-muted-foreground mb-8 sm:mb-12 max-w-md text-sm sm:text-base leading-relaxed">
              Whether you are redesigning a single room or building a full commercial space, we are here to bring your vision to life.
            </p>

            <div className="space-y-5 sm:space-y-6">
              {[
                { icon: MapPin, label: "Studio Location", value: "Surat, Gujarat, India" },
                { icon: Phone, label: "Phone / WhatsApp", value: "+91 98765 43210" },
                { icon: Mail, label: "Email", value: "info@rcpatelinterior.com" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium">{label}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-secondary/30 p-6 sm:p-8 md:p-10 border border-border/50">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-4">
                <CheckCircle className="w-14 h-14 text-primary" />
                <h3 className="text-2xl font-light">Enquiry Received!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thank you for reaching out. We'll contact you within 24 hours to discuss your project.
                </p>
                <Button variant="outline" className="rounded-none mt-4 text-xs uppercase tracking-widest" onClick={() => setSubmitted(false)}>
                  Send Another
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-light mb-6 sm:mb-8">Project Enquiry</h3>
                <form className="space-y-5" onSubmit={handleSubmit}>

                  {/* Name + Phone — stacked on mobile, side-by-side on sm+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground">Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your full name"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  {/* Email + City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="your@email.com"
                        data-testid="input-email"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground">City</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Surat, Ahmedabad..."
                        data-testid="input-city"
                      />
                    </div>
                  </div>

                  {/* Project Type + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground">Project Type *</label>
                      <select
                        required
                        value={form.projectType}
                        onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                        data-testid="select-project-type"
                      >
                        <option value="">Select...</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="office">Office</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground">Budget Range</label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                        data-testid="select-budget"
                      >
                        <option value="">Select...</option>
                        <option value="Under 5L">Under ₹5 Lakh</option>
                        <option value="5L-15L">₹5L – ₹15L</option>
                        <option value="15L-30L">₹15L – ₹30L</option>
                        <option value="30L-50L">₹30L – ₹50L</option>
                        <option value="50L+">₹50L+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Message *</label>
                    <textarea
                      rows={3}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your project..."
                      data-testid="textarea-message"
                    />
                  </div>

                  {/* Image upload */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Reference Images (optional, max 3)
                    </label>
                    <label
                      className="flex items-center gap-3 border border-dashed border-border/70 p-3 sm:p-4 cursor-pointer hover:border-primary/50 transition-colors"
                      data-testid="label-image-upload"
                    >
                      <Upload className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        {files.length > 0
                          ? files.map((f) => f.name).join(", ")
                          : "Upload floor plans or inspiration images"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFile}
                        data-testid="input-file-upload"
                      />
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={uploading || createEnquiry.isPending}
                    className="w-full rounded-none bg-primary hover:bg-primary/90 text-white h-12 sm:h-14 uppercase tracking-widest text-xs sm:text-sm mt-2"
                    data-testid="button-submit-enquiry"
                  >
                    {uploading || createEnquiry.isPending ? "Submitting..." : "Send Enquiry"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-6">
          <div>
            <div className="text-xl sm:text-2xl tracking-widest font-semibold uppercase text-primary mb-3 sm:mb-4">
              R C Patel Interior
            </div>
            <p className="text-background/60 max-w-sm text-xs sm:text-sm leading-relaxed">
              Transforming raw spaces into refined living environments. Serving residential and commercial clients across Gujarat, India.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="pt-6 sm:pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between text-xs text-background/40 uppercase tracking-wider gap-3 sm:gap-0">
          <p>&copy; {new Date().getFullYear()} R C Patel Interior. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
      data-testid="link-whatsapp"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
