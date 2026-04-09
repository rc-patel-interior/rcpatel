import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  useListEnquiries,
  useUpdateEnquiryStatus,
  getListEnquiriesQueryKey,
} from "@workspace/api-client-react";
import type { UpdateEnquiryStatusBodyStatus } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, Image as ImageIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
  contacted: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
  in_progress: "bg-orange-100 text-orange-800 hover:bg-orange-100/80",
  completed: "bg-green-100 text-green-800 hover:bg-green-100/80",
  closed: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
};

export default function Admin() {
  const [adminKey, setAdminKey] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputValue, setInputValue] = useState("rcpatel-admin-2025");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const stored = localStorage.getItem("rcpatel_admin_key");
    if (stored) {
      setAdminKey(stored);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      localStorage.setItem("rcpatel_admin_key", inputValue.trim());
      setAdminKey(inputValue.trim());
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rcpatel_admin_key");
    setAdminKey("");
    setIsAuthenticated(false);
  };

  const {
    data: enquiries,
    isLoading,
    isError,
  } = useListEnquiries(
    { adminKey },
    {
      query: {
        enabled: isAuthenticated && !!adminKey,
        queryKey: getListEnquiriesQueryKey({ adminKey }),
      },
    }
  );

  const updateStatus = useUpdateEnquiryStatus();

  const handleStatusChange = async (
    id: number,
    newStatus: UpdateEnquiryStatusBodyStatus
  ) => {
    try {
      await updateStatus.mutateAsync({
        id,
        data: { status: newStatus },
        params: { adminKey },
      });
      
      queryClient.setQueryData(
        getListEnquiriesQueryKey({ adminKey }),
        (old: any) => {
          if (!old) return old;
          return old.map((enq: any) =>
            enq.id === id ? { ...enq, status: newStatus } : enq
          );
        }
      );

      toast({
        title: "Status updated",
        description: `Enquiry #${id} status changed to ${newStatus}.`,
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not update status. Check your admin key.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-center">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter Admin Key"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  data-testid="input-admin-key"
                />
              </div>
              <Button
                type="submit"
                className="w-full uppercase tracking-widest"
                data-testid="button-login"
              >
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif text-foreground">
              Enquiries Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage client requests and project leads
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="uppercase tracking-widest text-xs"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="p-6 text-center text-destructive">
              Failed to load enquiries. Your admin key might be invalid.
              <br />
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleLogout}
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : !enquiries?.length ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              No enquiries found yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {enquiries.map((enquiry) => (
              <Card key={enquiry.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                    {/* Client Info */}
                    <div className="p-6 space-y-4 col-span-1">
                      <div>
                        <h3 className="font-medium text-lg">{enquiry.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(enquiry.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground block text-xs uppercase">
                            Phone
                          </span>
                          {enquiry.phone}
                        </div>
                        {enquiry.email && (
                          <div>
                            <span className="text-muted-foreground block text-xs uppercase">
                              Email
                            </span>
                            {enquiry.email}
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground block text-xs uppercase">
                            City
                          </span>
                          {enquiry.city || "Not provided"}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6 space-y-4 col-span-2">
                      <div className="flex gap-4">
                        <div>
                          <span className="text-muted-foreground block text-xs uppercase mb-1">
                            Type
                          </span>
                          <Badge variant="secondary" className="capitalize">
                            {enquiry.projectType}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-xs uppercase mb-1">
                            Budget
                          </span>
                          <span className="font-medium">{enquiry.budget}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-xs uppercase mb-1">
                          Message
                        </span>
                        <p className="text-sm bg-muted/50 p-3 rounded-md">
                          {enquiry.message}
                        </p>
                      </div>
                      
                      {enquiry.imageObjectPaths && enquiry.imageObjectPaths.length > 0 && (
                        <div>
                           <span className="text-muted-foreground block text-xs uppercase mb-2">
                            Attachments
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {enquiry.imageObjectPaths.map((path, idx) => (
                              <a 
                                key={idx} 
                                href={`/api/storage${path}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="block w-20 h-20 rounded-md border overflow-hidden hover:opacity-80 transition-opacity bg-muted flex items-center justify-center group relative"
                              >
                                <img 
                                  src={`/api/storage${path}`} 
                                  alt={`Attachment ${idx + 1}`} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                                  }}
                                />
                                <ImageIcon className="absolute w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-50 transition-opacity" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status & Actions */}
                    <div className="p-6 bg-muted/5 flex flex-col justify-between col-span-1">
                      <div className="space-y-2">
                        <span className="text-muted-foreground block text-xs uppercase mb-1">
                          Current Status
                        </span>
                        <Select
                          defaultValue={enquiry.status}
                          onValueChange={(val: UpdateEnquiryStatusBodyStatus) =>
                            handleStatusChange(enquiry.id, val)
                          }
                          disabled={updateStatus.isPending}
                        >
                          <SelectTrigger
                            className={STATUS_COLORS[enquiry.status] || ""}
                          >
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="in_progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
