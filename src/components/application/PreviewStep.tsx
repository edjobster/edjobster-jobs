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
                {candidateData.currentSalary && (
                  <InfoRow
                    label="Current Salary"
                    value={`${candidateData.currency} ${Number(candidateData.currentSalary).toLocaleString()}`}
                  />
                )}
                {candidateData.expectedSalary && (
                  <InfoRow
                    label="Expected Salary"
                    value={`${candidateData.currency} ${Number(candidateData.expectedSalary).toLocaleString()}`}
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
