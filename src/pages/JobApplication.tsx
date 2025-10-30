import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { CandidateDetailsStep } from "@/components/application/CandidateDetailsStep";
import { AssessmentStep } from "@/components/application/AssessmentStep";
import { PreviewStep } from "@/components/application/PreviewStep";
import { useToast } from "@/hooks/use-toast";

export default function JobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [candidateData, setCandidateData] = useState<any>({});
  const [assessmentData, setAssessmentData] = useState<any>({});

  const steps = [
    { number: 1, title: "Candidate Details", subtitle: "Personal & Professional Info" },
    { number: 2, title: "Assessments", subtitle: "Screening Questions" },
    { number: 3, title: "Preview & Submit", subtitle: "Review Your Application" },
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  const handleNext = (data?: any) => {
    if (currentStep === 1) {
      setCandidateData(data);
    } else if (currentStep === 2) {
      setAssessmentData(data);
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/jobs/${id}`);
    }
  };

  const handleSave = () => {
    localStorage.setItem(`job-application-${id}`, JSON.stringify({
      step: currentStep,
      candidateData,
      assessmentData,
    }));
    toast({
      title: "Progress Saved",
      description: "Your application has been saved. You can continue later.",
    });
  };

  const handleSubmit = async () => {
    toast({
      title: "Application Submitted!",
      description: "Your application has been successfully submitted.",
    });
    setTimeout(() => {
      navigate("/applications");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentStep === 1 ? "Back to Job" : "Previous"}
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save & Continue Later
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">Step {currentStep} of {steps.length}</span>
              <span className="text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all ${
                      currentStep === step.number
                        ? "border-primary bg-primary text-primary-foreground"
                        : currentStep > step.number
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1 hidden md:block">
                    <p className={`font-semibold text-sm ${currentStep >= step.number ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-full mx-4 ${currentStep > step.number ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-5xl mx-auto">
          {currentStep === 1 && (
            <CandidateDetailsStep
              initialData={candidateData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <AssessmentStep
              initialData={assessmentData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <PreviewStep
              candidateData={candidateData}
              assessmentData={assessmentData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              onEdit={(step) => setCurrentStep(step)}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
