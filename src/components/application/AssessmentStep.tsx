import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  type: "MULTIPLE_CHOICE_SINGLE" | "MULTIPLE_CHOICE_MULTI" | "OPEN_ENDED";
  question: string;
  options?: string[];
  required: boolean;
}

interface Props {
  initialData?: Record<string, any>;
  onNext: (data: any) => void;
  onBack: () => void;
}

// Mock assessment questions
const mockQuestions: Question[] = [
  {
    id: "q1",
    type: "MULTIPLE_CHOICE_SINGLE",
    question: "Do you have at least 3 years of experience in investment management?",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: "q2",
    type: "MULTIPLE_CHOICE_MULTI",
    question: "Which investment analysis tools or software are you proficient in?",
    options: ["Bloomberg Terminal", "FactSet", "Excel", "Python/R for Analysis", "Morningstar Direct"],
    required: true,
  },
  {
    id: "q3",
    type: "OPEN_ENDED",
    question: "Describe a specific investment strategy you developed for a high-net-worth client.",
    required: true,
  },
  {
    id: "q4",
    type: "MULTIPLE_CHOICE_SINGLE",
    question: "Are you willing to relocate if required?",
    options: ["Yes", "No", "Depends on location"],
    required: true,
  },
  {
    id: "q5",
    type: "OPEN_ENDED",
    question: "What is your expected joining date if you receive an offer?",
    required: false,
  },
];

export function AssessmentStep({ initialData, onNext, onBack }: Props) {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, any>>(initialData || {});

  const answeredCount = Object.keys(answers).filter(key => {
    const answer = answers[key];
    if (Array.isArray(answer)) return answer.length > 0;
    return answer && answer.toString().trim() !== "";
  }).length;

  const progressPercentage = (answeredCount / mockQuestions.length) * 100;

  const handleSingleChoice = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultiChoice = (questionId: string, option: string, checked: boolean) => {
    setAnswers(prev => {
      const current = prev[questionId] || [];
      if (checked) {
        return { ...prev, [questionId]: [...current, option] };
      } else {
        return { ...prev, [questionId]: current.filter((o: string) => o !== option) };
      }
    });
  };

  const handleOpenEnded = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const validateAnswers = () => {
    const requiredQuestions = mockQuestions.filter(q => q.required);
    const missingAnswers = requiredQuestions.filter(q => {
      const answer = answers[q.id];
      if (!answer) return true;
      if (Array.isArray(answer)) return answer.length === 0;
      return answer.toString().trim() === "";
    });

    if (missingAnswers.length > 0) {
      toast({
        title: "Required Questions",
        description: `Please answer all required questions (${missingAnswers.length} remaining)`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateAnswers()) {
      onNext(answers);
    }
  };

  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl">Assessment Questions</CardTitle>
          <Badge variant="secondary">
            {answeredCount} of {mockQuestions.length} answered
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Completion Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockQuestions.map((question, index) => (
          <div key={question.id} className="p-6 border rounded-lg bg-muted/20">
            <div className="flex items-start gap-2 mb-4">
              <Badge variant="outline">{index + 1}</Badge>
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {question.question}
                  {question.required && <span className="text-destructive ml-1">*</span>}
                </p>
              </div>
            </div>

            {question.type === "MULTIPLE_CHOICE_SINGLE" && question.options && (
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleSingleChoice(question.id, value)}
              >
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                      <Label
                        htmlFor={`${question.id}-${option}`}
                        className="font-normal cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {question.type === "MULTIPLE_CHOICE_MULTI" && question.options && (
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option}`}
                      checked={answers[question.id]?.includes(option) || false}
                      onCheckedChange={(checked) =>
                        handleMultiChoice(question.id, option, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`${question.id}-${option}`}
                      className="font-normal cursor-pointer flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {question.type === "OPEN_ENDED" && (
              <Textarea
                placeholder="Type your answer here..."
                value={answers[question.id] || ""}
                onChange={(e) => handleOpenEnded(question.id, e.target.value)}
                rows={4}
                className="resize-none"
              />
            )}
          </div>
        ))}

        <div className="flex justify-between pt-6 border-t">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleNext}>
            Next: Preview & Submit
          </Button>
        </div>
      </CardContent>
    </>
  );
}
