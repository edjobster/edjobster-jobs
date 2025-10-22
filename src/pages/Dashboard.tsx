import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookmarkIcon, FileTextIcon, CalendarIcon, EyeIcon, Upload, Briefcase } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    savedJobs: 0,
    appliedJobs: 0,
    interviewsScheduled: 0,
    profileViews: 0,
  });

  useEffect(() => {
    checkUser();
    fetchDashboardData();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUser(session.user);
  };

  const fetchDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profileData);

    // Fetch stats
    const [savedJobsRes, appliedJobsRes] = await Promise.all([
      supabase.from("saved_jobs").select("id", { count: "exact" }).eq("user_id", user.id),
      supabase.from("applied_jobs").select("*", { count: "exact" }).eq("user_id", user.id),
    ]);

    const interviewCount = appliedJobsRes.data?.filter(job => job.status === 'interview_scheduled').length || 0;

    setStats({
      savedJobs: savedJobsRes.count || 0,
      appliedJobs: appliedJobsRes.count || 0,
      interviewsScheduled: interviewCount,
      profileViews: Math.floor(Math.random() * 100),
    });
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Welcome Section */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback>{getInitials(profile?.full_name || user?.email)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || user?.email?.split("@")[0]}!</h1>
          <p className="text-muted-foreground">Track your job search progress</p>
        </div>
      </div>

      {/* Profile Completion */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your profile is {profile?.profile_completion || 0}% complete</span>
              <span className="font-medium">{profile?.profile_completion || 0}%</span>
            </div>
            <Progress value={profile?.profile_completion || 0} />
            <p className="text-sm text-muted-foreground mt-2">
              Complete your profile to increase visibility to recruiters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
            <BookmarkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.savedJobs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Applied Jobs</CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appliedJobs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewsScheduled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.profileViews}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          size="lg" 
          className="h-auto py-6 flex-col gap-2"
          onClick={() => navigate("/profile")}
        >
          <Upload className="h-6 w-6" />
          <span>Upload/Update Resume</span>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline"
          className="h-auto py-6 flex-col gap-2"
          onClick={() => navigate("/jobs")}
        >
          <Briefcase className="h-6 w-6" />
          <span>Explore New Jobs</span>
        </Button>
        
        <Button 
          size="lg" 
          variant="secondary"
          className="h-auto py-6 flex-col gap-2"
          onClick={() => navigate("/cv-tuner")}
        >
          <FileTextIcon className="h-6 w-6" />
          <span>Enhance Resume (CV Tuner)</span>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
