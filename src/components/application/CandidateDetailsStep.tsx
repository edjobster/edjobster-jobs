import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Upload, FileText, Loader2, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import logoImage from "@/assets/logo.png";

const candidateSchema = z.object({
  // Personal Details
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  alternateEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  alternatePhone: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  age: z.string().optional(),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  
  // Professional Details
  totalExperience: z.string().min(1, "Total experience is required"),
  highestQualification: z.string().min(1, "Highest qualification is required"),
  currentEmployer: z.string().optional(),
  currentJobTitle: z.string().min(1, "Current job title is required"),
  currentlyWorking: z.boolean().default(false),
  employmentStartDate: z.string().optional(),
  employmentEndDate: z.string().optional(),
  professionalDegree: z.string().min(1, "Professional degree is required"),
  professionalCertificate: z.string().optional(),
  functionalArea: z.string().min(1, "Functional area is required"),
  currentSalary: z.string().optional(),
  expectedSalary: z.string().optional(),
  currency: z.string().optional(),
  noticePeriod: z.string().optional(),
  
  // Address
  street: z.string().min(1, "Street is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(1, "Pincode is required"),
});

type CandidateFormData = z.infer<typeof candidateSchema>;

interface Props {
  initialData?: Partial<CandidateFormData>;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function CandidateDetailsStep({ initialData, onNext, onBack }: Props) {
  const { toast } = useToast();
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<File[]>([]);
  const [parsing, setParsing] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  
  const [sectionsOpen, setSectionsOpen] = useState({
    personal: true,
    professional: true,
    address: true,
    skills: true,
    experience: true,
    education: true,
    attachments: true,
  });

  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: initialData || {},
  });

  const calculateAge = (dob: string) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "dateOfBirth" && value.dateOfBirth) {
        form.setValue("age", calculateAge(value.dateOfBirth));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(pdf|docx?)$/i)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF or DOC/DOCX file",
        variant: "destructive",
      });
      return;
    }

    setResume(file);
    setParsing(true);

    // Simulate resume parsing with realistic data
    setTimeout(() => {
      form.setValue("firstName", "John");
      form.setValue("lastName", "Doe");
      form.setValue("email", "john.doe@example.com");
      form.setValue("phone", "+919876543210");
      form.setValue("dateOfBirth", "1990-01-15");
      form.setValue("gender", "Male");
      form.setValue("maritalStatus", "Single");
      form.setValue("totalExperience", "5");
      form.setValue("highestQualification", "Bachelors");
      form.setValue("currentEmployer", "Tech Solutions Inc");
      form.setValue("currentJobTitle", "Software Engineer");
      form.setValue("professionalDegree", "Bachelor of Science (BSc)");
      form.setValue("functionalArea", "Software Development");
      setSkills(["React", "Node.js", "TypeScript", "AWS"]);
      
      // Add sample experience
      setExperience([
        {
          id: Date.now(),
          company: "Tech Solutions Inc",
          designation: "Software Engineer",
          responsibilities: "Developed web applications using React and Node.js",
          fromDate: "2020-01-15",
          toDate: "2025-10-30",
        }
      ]);
      
      // Add sample education
      setEducation([
        {
          id: Date.now() + 1,
          schoolName: "ABC University",
          degree: "Bachelor of Science",
          specialization: "Computer Science",
          startDate: "2015-08-01",
          endDate: "2019-05-30",
        }
      ]);
      
      setParsing(false);
      toast({
        title: "Resume Parsed Successfully",
        description: "Your details have been auto-filled. Please review and update as needed.",
      });
    }, 2000);
  };

  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverLetter(file);
  };

  const handleCertificatesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setCertificates(prev => [...prev, ...files]);
  };

  const removeCertificate = (index: number) => {
    setCertificates(prev => prev.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addExperience = () => {
    setExperience([...experience, {
      id: Date.now(),
      company: "",
      designation: "",
      responsibilities: "",
      fromDate: "",
      toDate: "",
    }]);
  };

  const removeExperience = (id: number) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: number, field: string, value: string) => {
    setExperience(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now(),
      schoolName: "",
      degree: "",
      specialization: "",
      startDate: "",
      endDate: "",
    }]);
  };

  const removeEducation = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: number, field: string, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const onSubmit = (data: CandidateFormData) => {
    onNext({ ...data, skills, experience, education, resume: resume?.name });
  };

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-2xl">Candidate Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resume Upload */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleResumeUpload}
              disabled={parsing}
            />
            <label htmlFor="resume" className="cursor-pointer">
              {parsing ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-sm font-medium">Parsing your resume...</p>
                </div>
              ) : resume ? (
                <div className="flex flex-col items-center">
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <p className="text-sm font-medium mb-2">{resume.name}</p>
                  <Button type="button" variant="outline" size="sm">
                    Change Resume
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm font-medium mb-2">Upload Your Resume</p>
                  <p className="text-xs text-muted-foreground">PDF or DOC/DOCX (Max 5MB)</p>
                  <Button type="button" variant="outline" size="sm" className="mt-4">
                    Browse Files
                  </Button>
                </div>
              )}
            </label>
          </div>

          {/* Personal Details */}
          <Collapsible open={sectionsOpen.personal} onOpenChange={() => toggleSection("personal")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors border-l-4 border-primary">
              <h3 className="text-lg font-bold text-primary">Personal Details</h3>
              {sectionsOpen.personal ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Michael" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alternateEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.personal@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alternatePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+91 98765 43211" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="bg-muted" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marital Status *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Widow">Widow</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Professional Details */}
          <Collapsible open={sectionsOpen.professional} onOpenChange={() => toggleSection("professional")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors border-l-4 border-primary">
              <h3 className="text-lg font-bold text-primary">Professional Details</h3>
              {sectionsOpen.professional ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Experience (Years) *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="highestQualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Highest Qualification *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select qualification" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Secondary School">Secondary School</SelectItem>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="Post Graduate Diploma">Post Graduate Diploma</SelectItem>
                          <SelectItem value="Bachelors">Bachelors</SelectItem>
                          <SelectItem value="Masters">Masters</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentEmployer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Employer</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentJobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Job Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentlyWorking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 md:col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Currently Working</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employmentStartDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employmentEndDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment End Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          disabled={form.watch("currentlyWorking")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="professionalDegree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Degree *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select degree" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Master">Master</SelectItem>
                          <SelectItem value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</SelectItem>
                          <SelectItem value="Bachelor of Science (BSc)">Bachelor of Science (BSc)</SelectItem>
                          <SelectItem value="Bachelor of Engineering (BE)">Bachelor of Engineering (BE)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="professionalCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Certificate</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., PMP, AWS Certified" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="functionalArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Functional Area *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select functional area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Teaching">Teaching</SelectItem>
                          <SelectItem value="Administer">Administer</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Head of Department">Head of Department</SelectItem>
                          <SelectItem value="Coordinator">Coordinator</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Business Development">Business Development</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Software Development">Software Development</SelectItem>
                          <SelectItem value="Product Manager">Product Manager</SelectItem>
                          <SelectItem value="Project Manager">Project Manager</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Salary (Annual)</FormLabel>
                      <FormControl>
                        <Input placeholder="1200000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expectedSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Salary (Annual)</FormLabel>
                      <FormControl>
                        <Input placeholder="1500000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="noticePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notice Period</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select notice period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="15 days">15 days</SelectItem>
                          <SelectItem value="1 month">1 month</SelectItem>
                          <SelectItem value="2 months">2 months</SelectItem>
                          <SelectItem value="3 months">3 months</SelectItem>
                          <SelectItem value="4 months">4 months</SelectItem>
                          <SelectItem value="5 months">5 months</SelectItem>
                          <SelectItem value="6 months">6 months</SelectItem>
                          <SelectItem value="7 months">7 months</SelectItem>
                          <SelectItem value="8 months">8 months</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Address */}
          <Collapsible open={sectionsOpen.address} onOpenChange={() => toggleSection("address")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors border-l-4 border-primary">
              <h3 className="text-lg font-bold text-primary">Address</h3>
              {sectionsOpen.address ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <FormControl>
                        <Input placeholder="India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <FormControl>
                        <Input placeholder="Karnataka" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="Bangalore" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode *</FormLabel>
                      <FormControl>
                        <Input placeholder="560001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Skills */}
          <Collapsible open={sectionsOpen.skills} onOpenChange={() => toggleSection("skills")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors border-l-4 border-primary">
              <h3 className="text-lg font-bold text-primary">Skills</h3>
              {sectionsOpen.skills ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill (e.g., React, Python)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="ml-1">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Experience */}
          <Collapsible open={sectionsOpen.experience} onOpenChange={() => toggleSection("experience")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors border-l-4 border-primary">
              <h3 className="text-lg font-bold text-primary">Experience</h3>
              {sectionsOpen.experience ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Company Name</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <Label>Designation</Label>
                        <Input
                          value={exp.designation}
                          onChange={(e) => updateExperience(exp.id, "designation", e.target.value)}
                          placeholder="Enter designation"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Job Responsibilities</Label>
                        <Textarea
                          value={exp.responsibilities}
                          onChange={(e) => updateExperience(exp.id, "responsibilities", e.target.value)}
                          placeholder="Describe your responsibilities"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>From Date</Label>
                        <Input
                          type="date"
                          value={exp.fromDate}
                          onChange={(e) => updateExperience(exp.id, "fromDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>To Date</Label>
                        <Input
                          type="date"
                          value={exp.toDate}
                          onChange={(e) => updateExperience(exp.id, "toDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addExperience} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Education */}
          <Collapsible open={sectionsOpen.education} onOpenChange={() => toggleSection("education")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors border-l-4 border-primary">
              <h3 className="text-lg font-bold text-primary">Education</h3>
              {sectionsOpen.education ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>School Name</Label>
                        <Input
                          value={edu.schoolName}
                          onChange={(e) => updateEducation(edu.id, "schoolName", e.target.value)}
                          placeholder="Enter school/university name"
                        />
                      </div>
                      <div>
                        <Label>Education Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          placeholder="Enter degree"
                        />
                      </div>
                      <div>
                        <Label>Specialization</Label>
                        <Input
                          value={edu.specialization}
                          onChange={(e) => updateEducation(edu.id, "specialization", e.target.value)}
                          placeholder="Enter specialization"
                        />
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addEducation} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Attachments */}
          <Collapsible open={sectionsOpen.attachments} onOpenChange={() => toggleSection("attachments")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors border-l-4 border-primary">
              <h3 className="text-lg font-bold text-primary">Attachments</h3>
              {sectionsOpen.attachments ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cover Letter */}
                <div>
                  <Label>Cover Letter (Optional)</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="coverLetter"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleCoverLetterUpload}
                    />
                    <label htmlFor="coverLetter" className="cursor-pointer">
                      {coverLetter ? (
                        <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="text-sm flex-1">{coverLetter.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setCoverLetter(null);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium">Upload Cover Letter</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF or DOC/DOCX</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Certificates */}
                <div>
                  <Label>Certificates (Optional, Multiple)</Label>
                  <div className="mt-2 space-y-3">
                    {certificates.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-sm flex-1">{cert.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCertificate(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <input
                      type="file"
                      id="certificates"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                      multiple
                      onChange={handleCertificatesUpload}
                    />
                    <label htmlFor="certificates" className="cursor-pointer block">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">Upload Certificates</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOC/DOCX, or Images</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">
              Next: Assessments
            </Button>
          </div>

          {/* Support Section */}
          <div className="text-center text-sm text-muted-foreground mt-4 pb-4">
            Facing issues while applying for this job?{" "}
            <a href="mailto:info@edjobster.com" className="text-primary hover:underline">
              Email us at: info@edjobster.com
            </a>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 py-4 border-t">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <img src={logoImage} alt="Edjobster" className="h-6" />
          </div>
        </CardContent>
      </form>
    </Form>
  );
}
