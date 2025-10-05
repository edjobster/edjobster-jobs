import { useState } from "react";
import { Search, MapPin, Briefcase, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Jobs() {
  const [showFilters, setShowFilters] = useState(true);

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      experience: "5-8 years",
      skills: ["React", "Node.js", "AWS"],
      salary: "₹25-35 LPA",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLabs",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["Agile", "Product Strategy", "Analytics"],
      salary: "₹20-30 LPA",
      posted: "1 day ago",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataMinds Inc",
      location: "Hyderabad, Telangana",
      type: "Full-time",
      experience: "2-4 years",
      skills: ["Python", "ML", "SQL"],
      salary: "₹18-28 LPA",
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "UX Designer",
      company: "DesignHub",
      location: "Pune, Maharashtra",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["Figma", "User Research", "Prototyping"],
      salary: "₹15-22 LPA",
      posted: "5 days ago",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech Systems",
      location: "Delhi NCR",
      type: "Full-time",
      experience: "4-7 years",
      skills: ["Kubernetes", "Docker", "CI/CD"],
      salary: "₹22-32 LPA",
      posted: "1 week ago",
    },
    {
      id: 6,
      title: "Marketing Manager",
      company: "GrowthLabs",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      experience: "5-8 years",
      skills: ["Digital Marketing", "SEO", "Analytics"],
      salary: "₹18-25 LPA",
      posted: "4 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-accent">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center px-3 border rounded-lg">
                <Search className="h-5 w-5 text-muted-foreground mr-2" />
                <Input
                  type="text"
                  placeholder="Search jobs, skills, or describe your ideal role..."
                  className="border-0 focus-visible:ring-0"
                />
              </div>
              <Button className="bg-primary hover:bg-primary-hover">
                Search Jobs
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-full md:w-64 space-y-4">
              <Card className="shadow-soft">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className="font-semibold mb-2 block">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi NCR</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="font-semibold mb-2 block">Experience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresher">Fresher</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="font-semibold mb-3 block">Employment Type</Label>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type} />
                          <label htmlFor={type} className="text-sm cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold mb-2 block">Posting Date</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">Last 24 hours</SelectItem>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline" className="w-full">
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </aside>
          )}

          {/* Job Listings */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">
                Showing {jobs.length} jobs
              </p>
              <Select defaultValue="recent">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {jobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-soft transition-smooth cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-xl mb-1">{job.title}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge variant="secondary">{job.posted}</Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {job.type} • {job.experience}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="font-semibold text-primary text-lg">
                      {job.salary}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Save Job
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary-hover">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
