import { Target, Users, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To connect talented individuals with meaningful career opportunities using cutting-edge AI technology.",
    },
    {
      icon: Users,
      title: "Candidate First",
      description: "We prioritize candidate experience, making job search intuitive, efficient, and successful.",
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Leveraging artificial intelligence to match candidates with the perfect roles based on skills and aspirations.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your data is secure with us. We maintain the highest standards of privacy and security.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Edjobster
            </h1>
            <p className="text-lg opacity-95">
              We're on a mission to revolutionize how people find their dream careers
              through intelligent technology and human-centric design.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg">
              <p className="text-muted-foreground mb-4">
                Edjobster was founded with a simple yet powerful vision: to make job searching
                smarter, faster, and more effective for everyone. We recognized that traditional
                job portals often create barriers between talented candidates and their ideal roles.
              </p>
              <p className="text-muted-foreground mb-4">
                By combining advanced AI technology with deep understanding of recruitment processes,
                we've built a platform that truly understands what candidates are looking for and
                matches them with opportunities that align with their skills, experience, and career goals.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to serve thousands of candidates and partner with leading companies
                across industries, helping create meaningful connections that drive careers forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">250K+</div>
              <div className="text-muted-foreground">Active Candidates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15K+</div>
              <div className="text-muted-foreground">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <div className="text-muted-foreground">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
