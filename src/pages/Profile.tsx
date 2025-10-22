import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [workExperience, setWorkExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any>(null);

  useEffect(() => {
    checkUserAndFetchProfile();
  }, []);

  const checkUserAndFetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    fetchProfileData(session.user.id);
  };

  const fetchProfileData = async (userId: string) => {
    const [profileRes, workRes, eduRes, skillsRes, socialRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase.from("work_experience").select("*").eq("user_id", userId),
      supabase.from("education").select("*").eq("user_id", userId),
      supabase.from("skills").select("*").eq("user_id", userId),
      supabase.from("social_links").select("*").eq("user_id", userId).maybeSingle(),
    ]);

    setProfile(profileRes.data);
    setWorkExperience(workRes.data || []);
    setEducation(eduRes.data || []);
    setSkills(skillsRes.data || []);
    setSocialLinks(socialRes.data);
  };

  const updateProfile = async (updates: any) => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", profile.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
      fetchProfileData(profile.id);
    }
    setLoading(false);
  };

  const addSkill = async (skillName: string) => {
    const { error } = await supabase
      .from("skills")
      .insert({ user_id: profile.id, skill_name: skillName });

    if (error) {
      toast.error("Failed to add skill");
    } else {
      fetchProfileData(profile.id);
    }
  };

  const removeSkill = async (skillId: string) => {
    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", skillId);

    if (error) {
      toast.error("Failed to remove skill");
    } else {
      fetchProfileData(profile.id);
    }
  };

  if (!profile) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Progress value={profile.profile_completion || 0} className="flex-1" />
              <span className="text-sm font-medium">{profile.profile_completion || 0}%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Complete your profile to increase visibility
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback>{profile.full_name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    defaultValue={profile.full_name}
                    onBlur={(e) => updateProfile({ full_name: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={profile.email} disabled />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue={profile.phone}
                    onBlur={(e) => updateProfile({ phone: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    defaultValue={profile.location}
                    onBlur={(e) => updateProfile({ location: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    placeholder="e.g., Senior Software Engineer"
                    defaultValue={profile.headline}
                    onBlur={(e) => updateProfile({ headline: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="visibility">Visible to Recruiters</Label>
                  <Switch
                    id="visibility"
                    checked={profile.visible_to_recruiters}
                    onCheckedChange={(checked) => updateProfile({ visible_to_recruiters: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent>
              {workExperience.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No work experience added yet
                </p>
              ) : (
                <div className="space-y-4">
                  {workExperience.map((exp) => (
                    <Card key={exp.id}>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold">{exp.role}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company_name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(exp.start_date).toLocaleDateString()} - 
                          {exp.is_current ? " Present" : new Date(exp.end_date).toLocaleDateString()}
                        </p>
                        {exp.description && (
                          <p className="text-sm mt-2">{exp.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent>
              {education.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No education added yet
                </p>
              ) : (
                <div className="space-y-4">
                  {education.map((edu) => (
                    <Card key={edu.id}>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.institute}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {edu.start_year} - {edu.end_year}
                        </p>
                        {edu.cgpa && (
                          <p className="text-sm mt-1">CGPA: {edu.cgpa}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-sm py-1 px-3">
                    {skill.skill_name}
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      addSkill(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Button>Add</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
