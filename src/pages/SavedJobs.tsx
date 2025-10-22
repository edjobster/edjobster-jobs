import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, BriefcaseIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserAndFetchJobs();
  }, []);

  const checkUserAndFetchJobs = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    fetchSavedJobs(session.user.id);
  };

  const fetchSavedJobs = async (userId: string) => {
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*")
      .eq("user_id", userId)
      .order("saved_at", { ascending: false });

    if (error) {
      toast.error("Failed to load saved jobs");
    } else {
      setSavedJobs(data || []);
    }
    setLoading(false);
  };

  const handleRemove = async (jobId: string) => {
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("id", jobId);

    if (error) {
      toast.error("Failed to remove job");
    } else {
      setSavedJobs(savedJobs.filter(job => job.id !== jobId));
      toast.success("Job removed from saved list");
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
        <p className="text-muted-foreground">Jobs you've bookmarked for later</p>
      </div>

      {savedJobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No saved jobs yet</p>
            <Button onClick={() => navigate("/jobs")}>Explore Jobs</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {savedJobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <BriefcaseIcon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{job.job_title}</h3>
                    <p className="text-muted-foreground mb-2">{job.company_name}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{job.job_type}</Badge>
                      <Badge variant="outline">{job.work_mode}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        {job.location}
                      </div>
                    </div>
                    
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {job.skills.slice(0, 5).map((skill: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Saved {formatDistanceToNow(new Date(job.saved_at))} ago
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={() => navigate(`/jobs/${job.id}`)}>
                      Apply Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleRemove(job.id)}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
