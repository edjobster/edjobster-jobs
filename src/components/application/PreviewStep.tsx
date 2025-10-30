import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, CheckCircle2, Send } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface Props {
  candidateData: any;
  assessmentData: any;
  onBack: () => void;
  onSubmit: () => void;
  onEdit: (step: number) => void;
}

export function PreviewStep({ candidateData, assessmentData, onBack, onSubmit, onEdit }: Props) {
  const [sectionsOpen, setSectionsOpen] = useState({
    personal: true,
    professional: true,
    address: true,
    skills: true,
    experience: true,
    education: true,
    attachments: true,
    assessment: true,
  });

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-right">{value || "Not provided"}</span>
    </div>
  );

  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Review Your Application</CardTitle>
          <Badge variant="secondary" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Ready to Submit
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Please review all the information below before submitting your application. You can edit any section if needed.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resume */}
        {candidateData.resume && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Resume Uploaded</p>
                <p className="text-sm text-muted-foreground">{candidateData.resume}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => onEdit(1)}>
                <Edit className="h-3 w-3 mr-1" />
                Change
              </Button>
            </div>
          </div>
        )}

        {/* Personal Details */}
        <Collapsible open={sectionsOpen.personal} onOpenChange={() => toggleSection("personal")}>
          <div className="border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
              <h3 className="text-lg font-semibold">Personal Details</h3>
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(1); }}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-1">
                <InfoRow label="Full Name" value={`${candidateData.firstName} ${candidateData.middleName || ""} ${candidateData.lastName}`.trim()} />
                <InfoRow label="Email" value={candidateData.email} />
                {candidateData.alternateEmail && <InfoRow label="Alternate Email" value={candidateData.alternateEmail} />}
                <InfoRow label="Phone" value={candidateData.phone} />
                {candidateData.alternatePhone && <InfoRow label="Alternate Phone" value={candidateData.alternatePhone} />}
                {candidateData.dateOfBirth && <InfoRow label="Date of Birth" value={candidateData.dateOfBirth} />}
                {candidateData.age && <InfoRow label="Age" value={`${candidateData.age} years`} />}
                {candidateData.gender && <InfoRow label="Gender" value={candidateData.gender} />}
                {candidateData.maritalStatus && <InfoRow label="Marital Status" value={candidateData.maritalStatus} />}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Professional Details */}
        <Collapsible open={sectionsOpen.professional} onOpenChange={() => toggleSection("professional")}>
          <div className="border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
              <h3 className="text-lg font-semibold">Professional Details</h3>
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(1); }}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-1">
                {candidateData.totalExperience && <InfoRow label="Total Experience" value={`${candidateData.totalExperience} years`} />}
                {candidateData.highestQualification && <InfoRow label="Highest Qualification" value={candidateData.highestQualification} />}
                {candidateData.currentEmployer && <InfoRow label="Current Employer" value={candidateData.currentEmployer} />}
                {candidateData.currentJobTitle && <InfoRow label="Current Job Title" value={candidateData.currentJobTitle} />}
                {candidateData.currentlyWorking !== undefined && (
                  <InfoRow label="Currently Working" value={candidateData.currentlyWorking ? "Yes" : "No"} />
                )}
                {candidateData.employmentStartDate && <InfoRow label="Employment Start Date" value={candidateData.employmentStartDate} />}
                {candidateData.employmentEndDate && <InfoRow label="Employment End Date" value={candidateData.employmentEndDate} />}
                {candidateData.professionalDegree && <InfoRow label="Professional Degree" value={candidateData.professionalDegree} />}
                {candidateData.professionalCertificate && <InfoRow label="Professional Certificate" value={candidateData.professionalCertificate} />}
                {candidateData.functionalArea && <InfoRow label="Functional Area" value={candidateData.functionalArea} />}
                {candidateData.currentSalary && (
                  <InfoRow
                    label="Current Salary"
                    value={`${candidateData.currency || 'INR'} ${Number(candidateData.currentSalary).toLocaleString()}`}
                  />
                )}
                {candidateData.expectedSalary && (
                  <InfoRow
                    label="Expected Salary"
                    value={`${candidateData.currency || 'INR'} ${Number(candidateData.expectedSalary).toLocaleString()}`}
                  />
                )}
                {candidateData.noticePeriod && <InfoRow label="Notice Period" value={candidateData.noticePeriod} />}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Address */}
        <Collapsible open={sectionsOpen.address} onOpenChange={() => toggleSection("address")}>
          <div className="border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
              <h3 className="text-lg font-semibold">Address</h3>
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(1); }}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-1">
                {candidateData.street && <InfoRow label="Street" value={candidateData.street} />}
                {candidateData.city && <InfoRow label="City" value={candidateData.city} />}
                {candidateData.state && <InfoRow label="State" value={candidateData.state} />}
                {candidateData.country && <InfoRow label="Country" value={candidateData.country} />}
                {candidateData.pincode && <InfoRow label="Pincode" value={candidateData.pincode} />}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Skills */}
        {candidateData.skills && candidateData.skills.length > 0 && (
          <Collapsible open={sectionsOpen.skills} onOpenChange={() => toggleSection("skills")}>
            <div className="border rounded-lg">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                <h3 className="text-lg font-semibold">Skills</h3>
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(1); }}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {candidateData.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* Experience */}
        {candidateData.experience && candidateData.experience.length > 0 && (
          <Collapsible open={sectionsOpen.experience} onOpenChange={() => toggleSection("experience")}>
            <div className="border rounded-lg">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                <h3 className="text-lg font-semibold">Experience</h3>
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(1); }}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 space-y-4">
                  {candidateData.experience.map((exp: any, index: number) => (
                    <div key={exp.id} className="space-y-2">
                      <h4 className="font-semibold text-sm">Experience {index + 1}</h4>
                      <div className="pl-4 space-y-1">
                        <InfoRow label="Company" value={exp.company} />
                        <InfoRow label="Designation" value={exp.designation} />
                        {exp.responsibilities && <InfoRow label="Responsibilities" value={exp.responsibilities} />}
                        {exp.fromDate && <InfoRow label="From" value={exp.fromDate} />}
                        {exp.toDate && <InfoRow label="To" value={exp.toDate} />}
                      </div>
                      {index < candidateData.experience.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* Education */}
        {candidateData.education && candidateData.education.length > 0 && (
          <Collapsible open={sectionsOpen.education} onOpenChange={() => toggleSection("education")}>
            <div className="border rounded-lg">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                <h3 className="text-lg font-semibold">Education</h3>
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(1); }}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 space-y-4">
                  {candidateData.education.map((edu: any, index: number) => (
                    <div key={edu.id} className="space-y-2">
                      <h4 className="font-semibold text-sm">Education {index + 1}</h4>
                      <div className="pl-4 space-y-1">
                        <InfoRow label="School/University" value={edu.schoolName} />
                        <InfoRow label="Degree" value={edu.degree} />
                        {edu.specialization && <InfoRow label="Specialization" value={edu.specialization} />}
                        {edu.startDate && <InfoRow label="Start Date" value={edu.startDate} />}
                        {edu.endDate && <InfoRow label="End Date" value={edu.endDate} />}
                      </div>
                      {index < candidateData.education.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* Attachments */}
        <Collapsible open={sectionsOpen.attachments} onOpenChange={() => toggleSection("attachments")}>
          <div className="border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
              <h3 className="text-lg font-semibold">Attachments</h3>
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(1); }}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-2">
                <InfoRow label="Resume" value={candidateData.resume || "Not uploaded"} />
                <InfoRow label="Cover Letter" value={candidateData.coverLetter || "Not uploaded"} />
                {candidateData.certificates && candidateData.certificates.length > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Certificates:</span>
                    <div className="text-right space-y-1">
                      {candidateData.certificates.map((cert: string, index: number) => (
                        <div key={index} className="text-sm">{cert}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Assessment Answers */}
        <Collapsible open={sectionsOpen.assessment} onOpenChange={() => toggleSection("assessment")}>
          <div className="border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
              <h3 className="text-lg font-semibold">Assessment Answers</h3>
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(2); }}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-4">
                {Object.entries(assessmentData).map(([key, value], index) => (
                  <div key={key} className="space-y-2">
                    <p className="font-medium text-sm">Question {index + 1}</p>
                    <div className="pl-4">
                      {Array.isArray(value) ? (
                        <div className="flex flex-wrap gap-2">
                          {value.map((v: string) => (
                            <Badge key={v} variant="outline">
                              {v}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">{value as string}</p>
                      )}
                    </div>
                    {index < Object.entries(assessmentData).length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Declaration */}
        <div className="p-4 bg-muted/50 border rounded-lg">
          <p className="text-sm text-muted-foreground">
            By submitting this application, I certify that all information provided is true and accurate to the best of my knowledge.
            I understand that any false information may result in disqualification from the selection process.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onSubmit} size="lg" className="gap-2">
            <Send className="h-4 w-4" />
            Submit Application
          </Button>
        </div>
      </CardContent>
    </>
  );
}
