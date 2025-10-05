import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Briefcase, Users, Building2, TrendingUp, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const popularSearches = [
    "Remote jobs",
    "Data Analyst",
    "Teacher Jobs",
    "Software Engineer",
    "Freshers in Delhi",
    "Marketing Manager",
  ];

  const stats = [
    { icon: Users, label: "Active Candidates", value: "250K+" },
    { icon: Briefcase, label: "Active Jobs", value: "15K+" },
    { icon: Building2, label: "Partner Companies", value: "5K+" },
    { icon: TrendingUp, label: "Applications/Day", value: "10K+" },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      experience: "5-8 years",
      skills: ["React", "Node.js", "AWS"],
      salary: "₹25-35 LPA",
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
    },
  ];

  const topCompanies = [
    { id: 1, name: "TechCorp Solutions", logo: "🏢", jobs: 45 },
    { id: 2, name: "InnovateLabs", logo: "🚀", jobs: 32 },
    { id: 3, name: "DataMinds Inc", logo: "📊", jobs: 28 },
    { id: 4, name: "DesignHub", logo: "🎨", jobs: 19 },
    { id: 5, name: "EduTech Pro", logo: "📚", jobs: 25 },
    { id: 6, name: "FinanceFlow", logo: "💰", jobs: 38 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with AI Search */}
      <section className="relative gradient-hero text-white py-20 md:py-28 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-[480px] h-[480px] bg-primary/40 rounded-full blur-[110px] animate-float mix-blend-screen"></div>
          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-primary/30 rounded-full blur-[130px] animate-float-slow mix-blend-screen"></div>
          <div className="absolute top-1/3 right-1/3 w-[420px] h-[420px] bg-primary/20 rounded-full blur-[110px] animate-float mix-blend-screen" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 ai-grid opacity-60"></div>
          {/* AI Particle Waves */}
          <div className="absolute inset-0 overflow-hidden opacity-40">
            <div className="absolute bottom-0 left-0 w-full h-[60%] particle-wave-1"></div>
            <div className="absolute bottom-0 left-0 w-full h-[60%] particle-wave-2" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-0 left-0 w-full h-[60%] particle-wave-3" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AI-Powered Job Search<br />Made Simple
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-95">
              Type naturally — we'll understand your skills, role, and goals.
            </p>

            {/* AI Search Bar */}
            <div className="bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-5 pb-2 md:pb-0">
                <Search className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Search jobs, skills, or describe your ideal role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-foreground"
                  autoFocus
                />
              </div>
              <div className="relative p-[3px]">
                {/* Shooting star outline animation */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 rounded-full animate-[spin-border_3s_linear_infinite]" 
                       style={{
                         background: 'linear-gradient(90deg, transparent 0%, transparent 60%, rgba(147,197,253,1) 80%, rgba(255,255,255,1) 85%, rgba(147,197,253,1) 90%, transparent 100%)',
                       }}
                  ></div>
                </div>
                <Button
                  size="lg"
                  className="group relative overflow-visible rounded-full px-8 bg-gradient-to-b from-[#7c3aed] via-[#6366f1] to-[#4f46e5] text-white shadow-[0_8px_32px_rgba(99,102,241,0.4),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_0_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.6),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_0_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 border-0"
                  aria-label="Search Jobs"
                >
                  {/* Inner glow */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent"></span>
                  {/* Content */}
                  <span className="relative flex items-center gap-2">
                    <Wand2 className="h-5 w-5 opacity-90 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110 -scale-x-100" />
                    Search Jobs
                  </span>
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-sm opacity-90">Popular:</span>
              {popularSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 cursor-pointer transition-base"
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Top Companies Hiring Now</h2>
            <Link to="/companies">
              <Button variant="outline">View All Companies</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCompanies.map((company) => (
              <Card
                key={company.id}
                className="hover:shadow-soft transition-smooth cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{company.logo}</div>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {company.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {company.jobs} jobs
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Job Listings</h2>
            <Link to="/jobs">
              <Button variant="outline">View All Jobs</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-soft transition-smooth cursor-pointer"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">{job.company}</p>
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
                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">{job.salary}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary-hover">
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
