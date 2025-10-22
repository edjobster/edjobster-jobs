import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

const CVTuner = () => {
  const [cvScore, setCvScore] = useState(72);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Simulate upload and analysis
    setTimeout(() => {
      setUploading(false);
      toast.success("Resume uploaded and analyzed!");
    }, 2000);
  };

  const suggestions = [
    { category: "Keywords", issue: "Missing important keywords for your target role", priority: "high" },
    { category: "Achievements", issue: "Add measurable outcomes to showcase impact", priority: "high" },
    { category: "Grammar", issue: "2 grammar improvements suggested", priority: "medium" },
    { category: "Formatting", issue: "Inconsistent date formatting", priority: "low" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          CV Tuner
        </h1>
        <p className="text-muted-foreground">AI-powered resume enhancement tool</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription>Upload your CV for AI-powered analysis and improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Drop your resume here or click to browse
              </p>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="cv-upload"
              />
              <Button asChild disabled={uploading}>
                <label htmlFor="cv-upload" className="cursor-pointer">
                  {uploading ? "Analyzing..." : "Select File"}
                </label>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Supports PDF and DOCX up to 5MB
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CV Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{cvScore}/100</div>
              <Progress value={cvScore} className="mb-4" />
              <p className="text-sm text-muted-foreground">
                Your CV score is above average. Add measurable achievements to improve impact.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Improvement Suggestions</CardTitle>
          <CardDescription>AI-generated recommendations to enhance your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{suggestion.category}</h4>
                    <Badge 
                      variant={suggestion.priority === "high" ? "destructive" : suggestion.priority === "medium" ? "default" : "secondary"}
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.issue}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enhanced Resume</CardTitle>
          <CardDescription>Download your AI-enhanced resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium">Resume_Enhanced.pdf</p>
                <p className="text-sm text-muted-foreground">Ready to download</p>
              </div>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVTuner;
