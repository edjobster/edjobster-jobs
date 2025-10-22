import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPinIcon, BriefcaseIcon } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const statusConfig = {
  submitted: { label: "Submitted", color: "bg-gray-500", icon: "⚪" },
  screening: { label: "In Progress", color: "bg-blue-500", icon: "🔵" },
  interview_scheduled: { label: "Interview Scheduled", color: "bg-green-500", icon: "📅" },
  offer: { label: "Offer Received", color: "bg-green-600", icon: "🎉" },
  rejected: { label: "Rejected", color: "bg-red-500", icon: "❌" },
  withdrawn: { label: "Withdrawn", color: "bg-gray-400", icon: "⬅️" },
};

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserAndFetchApplications();
  }, []);

  const checkUserAndFetchApplications = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    fetchApplications(session.user.id);
  };

  const fetchApplications = async (userId: string) => {
    const { data, error } = await supabase
      .from("applied_jobs")
      .select("*")
      .eq("user_id", userId)
      .order("applied_at", { ascending: false });

    if (error) {
      toast.error("Failed to load applications");
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const handleWithdraw = async (applicationId: string) => {
    const { error } = await supabase
      .from("applied_jobs")
      .update({ status: "withdrawn" })
      .eq("id", applicationId);

    if (error) {
      toast.error("Failed to withdraw application");
    } else {
      fetchApplications((await supabase.auth.getUser()).data.user!.id);
      toast.success("Application withdrawn");
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Applications</h1>
        <p className="text-muted-foreground">Track your application status</p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No applications yet</p>
            <Button onClick={() => navigate("/jobs")}>Find Jobs</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => {
            const status = statusConfig[app.status as keyof typeof statusConfig];
            return (
              <Card key={app.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <BriefcaseIcon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{app.job_title}</h3>
                      <p className="text-muted-foreground mb-2">{app.company_name}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{app.job_type}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {app.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{status.icon}</span>
                        <Badge className={status.color}>{status.label}</Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Applied {formatDistanceToNow(new Date(app.applied_at))} ago • 
                        Last updated {formatDistanceToNow(new Date(app.last_updated))} ago
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/jobs/${app.id}`)}
                      >
                        View Details
                      </Button>
                      {app.status !== "withdrawn" && app.status !== "rejected" && (
                        <Button 
                          variant="ghost"
                          onClick={() => handleWithdraw(app.id)}
                        >
                          Withdraw
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Applications;
