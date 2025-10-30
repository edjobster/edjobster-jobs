import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  GraduationCap,
  Users,
  Calendar,
  Building2,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [responsibilitiesOpen, setResponsibilitiesOpen] = useState(true);
  const [requirementsOpen, setRequirementsOpen] = useState(true);
  const [benefitsOpen, setBenefitsOpen] = useState(false);

  // Mock job data - in real app, fetch based on id
  const job = {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    companyLogo: "🏢",
    location: "Bangalore, Karnataka",
    jobType: "Full-time",
    workMode: "Hybrid",
    experience: "5-8 years",
    salary: "₹25-35 LPA",
    postedDate: "Oct 5, 2025",
    lastUpdated: "Oct 10, 2025",
    applicationDeadline: "Nov 15, 2025",
    jobId: "TCORP-2025-SE-1847",
    industry: "Information Technology",
    vacancies: 3,
    pincode: "560001",
    status: "Active",
    skills: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL", "Docker", "Kubernetes"],
    education: "Bachelor's in Computer Science or related field",
    description: `We are seeking a talented Senior Software Engineer to join our dynamic engineering team. In this role, you'll work on cutting-edge projects that impact millions of users worldwide. You'll collaborate with cross-functional teams to design, develop, and deploy scalable cloud-based solutions.`,
    responsibilities: [
      "Design and develop high-quality, scalable software solutions using modern technologies",
      "Lead technical discussions and provide mentorship to junior developers",
      "Collaborate with product managers and designers to define feature specifications",
      "Write clean, maintainable code following best practices and coding standards",
      "Conduct code reviews and ensure code quality across the team",
      "Optimize application performance and troubleshoot production issues",
      "Participate in agile ceremonies and contribute to sprint planning",
      "Stay updated with emerging technologies and industry trends",
    ],
    requirements: [
      "5-8 years of professional software development experience",
      "Strong proficiency in React.js and modern JavaScript/TypeScript",
      "Experience with Node.js and building RESTful APIs",
      "Solid understanding of cloud platforms (AWS, Azure, or GCP)",
      "Experience with containerization (Docker) and orchestration (Kubernetes)",
      "Familiarity with relational databases (PostgreSQL, MySQL)",
      "Strong problem-solving skills and attention to detail",
      "Excellent communication and collaboration abilities",
      "Experience with CI/CD pipelines and DevOps practices",
    ],
    preferredQualifications: [
      "Master's degree in Computer Science or related field",
      "Experience with microservices architecture",
      "Knowledge of GraphQL and modern API design patterns",
      "Contributions to open-source projects",
      "Experience with performance optimization and monitoring tools",
    ],
    benefits: [
      { icon: "💰", title: "Competitive Salary", desc: "Industry-leading compensation package" },
      { icon: "🏥", title: "Health Insurance", desc: "Comprehensive medical coverage for you and family" },
      { icon: "🏖️", title: "Flexible PTO", desc: "Unlimited paid time off policy" },
      { icon: "🏠", title: "Remote Work", desc: "Hybrid work model with flexible hours" },
      { icon: "📚", title: "Learning Budget", desc: "Annual budget for courses and conferences" },
      { icon: "🎯", title: "Career Growth", desc: "Clear career progression paths" },
      { icon: "🍕", title: "Free Meals", desc: "Catered lunch and snacks" },
      { icon: "🎮", title: "Wellness Programs", desc: "Gym membership and wellness initiatives" },
    ],
    companyDescription: `TechCorp Solutions is a leading technology company specializing in cloud-based enterprise solutions. With over 5,000 employees worldwide, we're committed to innovation and excellence. Our mission is to empower businesses through cutting-edge technology and exceptional service.`,
    companyWebsite: "https://techcorp-solutions.com",
    companySize: "5000+ employees",
    companyIndustry: "Information Technology & Services",
  };

  const relatedJobs = [
    {
      id: 2,
      title: "Full Stack Developer",
      company: "TechCorp Solutions",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      salary: "₹18-25 LPA",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "TechCorp Solutions",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      salary: "₹22-32 LPA",
    },
    {
      id: 4,
      title: "Tech Lead",
      company: "TechCorp Solutions",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      salary: "₹35-45 LPA",
    },
  ];

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Job removed from saved list" : "Job saved successfully",
      description: isSaved ? "Job has been removed from your saved jobs" : "You can view this job later in your saved jobs",
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Job link has been copied to clipboard",
    });
  };

  const handleShare = (platform: string) => {
    toast({
      title: `Sharing to ${platform}`,
      description: "Opening share dialog...",
    });
  };

  const handleApply = () => {
    navigate(`/jobs/${id}/apply`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/jobs">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-semibold truncate">{job.title}</h1>
              <p className="text-sm text-muted-foreground truncate">{job.company}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/jobs">Jobs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{job.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Job Header Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex gap-4">
                <div className="text-5xl">{job.companyLogo}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
                    <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                      {job.status}
                    </Badge>
                  </div>
                  <h2 className="text-xl text-muted-foreground mb-4">{job.company}</h2>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge variant="secondary" className="gap-1">
                      <Briefcase className="h-3 w-3" />
                      {job.jobType}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Building2 className="h-3 w-3" />
                      {job.workMode}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      Posted {job.postedDate}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Last Updated: {job.lastUpdated} | Job ID: {job.jobId}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 md:flex-col">
                <Button onClick={handleApply} size="lg" className="flex-1 md:flex-none">
                  Apply Now
                </Button>
                <Button
                  variant={isSaved ? "default" : "outline"}
                  size="lg"
                  onClick={handleSaveJob}
                  className="flex-1 md:flex-none"
                >
                  <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                  {isSaved ? "Saved" : "Save Job"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Clock className="h-8 w-8 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Experience</p>
                    <p className="font-semibold">{job.experience}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <DollarSign className="h-8 w-8 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Salary</p>
                    <p className="font-semibold">{job.salary}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Vacancies</p>
                    <p className="font-semibold">{job.vacancies} positions</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <GraduationCap className="h-8 w-8 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Education</p>
                    <p className="font-semibold text-xs">Bachelor's</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Required Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <Collapsible open={descriptionOpen} onOpenChange={setDescriptionOpen}>
                <CardHeader>
                  <CollapsibleTrigger className="w-full">
                    <CardTitle className="flex items-center justify-between">
                      <span>About the Role</span>
                      {descriptionOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </CardTitle>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Responsibilities */}
            <Card>
              <Collapsible open={responsibilitiesOpen} onOpenChange={setResponsibilitiesOpen}>
                <CardHeader>
                  <CollapsibleTrigger className="w-full">
                    <CardTitle className="flex items-center justify-between">
                      <span>Key Responsibilities</span>
                      {responsibilitiesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </CardTitle>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Requirements */}
            <Card>
              <Collapsible open={requirementsOpen} onOpenChange={setRequirementsOpen}>
                <CardHeader>
                  <CollapsibleTrigger className="w-full">
                    <CardTitle className="flex items-center justify-between">
                      <span>Requirements & Qualifications</span>
                      {requirementsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </CardTitle>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Required Qualifications</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((item, index) => (
                            <li key={index} className="flex gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Preferred Qualifications</h4>
                        <ul className="space-y-2">
                          {job.preferredQualifications.map((item, index) => (
                            <li key={index} className="flex gap-3">
                              <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Education</h4>
                        <p className="text-muted-foreground">{job.education}</p>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Benefits */}
            <Card>
              <Collapsible open={benefitsOpen} onOpenChange={setBenefitsOpen}>
                <CardHeader>
                  <CollapsibleTrigger className="w-full">
                    <CardTitle className="flex items-center justify-between">
                      <span>Benefits & Perks</span>
                      {benefitsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </CardTitle>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {job.benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-3 p-3 rounded-lg bg-accent/50">
                          <span className="text-2xl">{benefit.icon}</span>
                          <div>
                            <h4 className="font-semibold mb-1">{benefit.title}</h4>
                            <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Job ID</p>
                    <p className="font-semibold text-sm">{job.jobId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Industry</p>
                    <p className="font-semibold text-sm">{job.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Pincode</p>
                    <p className="font-semibold text-sm">{job.pincode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Application Deadline</p>
                    <p className="font-semibold text-sm">{job.applicationDeadline}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Vacancies</p>
                    <p className="font-semibold text-sm">{job.vacancies} positions</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Posted On</p>
                    <p className="font-semibold text-sm">{job.postedDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Share this Job</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare("LinkedIn")}>
                    <Share2 className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare("WhatsApp")}>
                    <Share2 className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare("Twitter")}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare("Facebook")}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Company Overview */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{job.companyLogo}</span>
                  <div>
                    <h3 className="font-semibold">{job.company}</h3>
                    <p className="text-sm text-muted-foreground">{job.companyIndustry}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{job.companyDescription}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{job.companySize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{job.companyIndustry}</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/companies">
                      View all jobs from {job.company}
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full" asChild>
                    <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Related Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedJobs.map((relatedJob) => (
                  <div key={relatedJob.id} className="p-3 rounded-lg border hover:border-primary transition-colors">
                    <h4 className="font-semibold mb-2">{relatedJob.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{relatedJob.company}</p>
                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{relatedJob.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">{relatedJob.type}</Badge>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/jobs/${relatedJob.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="mt-6">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Ready to apply?</h3>
                <p className="text-sm text-muted-foreground">
                  Submit your application before {job.applicationDeadline}
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleApply} size="lg">
                  Apply Now
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/jobs">Back to all jobs</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Label */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Powered by <span className="font-semibold">Edjobster ATS</span>
          </p>
        </div>
      </div>

      {/* Sticky Mobile Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t lg:hidden z-50">
        <Button onClick={handleApply} className="w-full" size="lg">
          Apply Now
        </Button>
      </div>
    </div>
  );
}
