import { useState } from "react";
import { Search, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Companies() {
  const companies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "🏢",
      tagline: "Building the future of technology",
      industry: "Technology",
      size: "1000-5000",
      location: "Bangalore, Karnataka",
      jobs: 45,
    },
    {
      id: 2,
      name: "InnovateLabs",
      logo: "🚀",
      tagline: "Innovation at its best",
      industry: "Software",
      size: "500-1000",
      location: "Mumbai, Maharashtra",
      jobs: 32,
    },
    {
      id: 3,
      name: "DataMinds Inc",
      logo: "📊",
      tagline: "Data-driven solutions",
      industry: "Analytics",
      size: "200-500",
      location: "Hyderabad, Telangana",
      jobs: 28,
    },
    {
      id: 4,
      name: "DesignHub",
      logo: "🎨",
      tagline: "Creative excellence",
      industry: "Design",
      size: "100-200",
      location: "Pune, Maharashtra",
      jobs: 19,
    },
    {
      id: 5,
      name: "EduTech Pro",
      logo: "📚",
      tagline: "Transforming education",
      industry: "Education",
      size: "500-1000",
      location: "Delhi NCR",
      jobs: 25,
    },
    {
      id: 6,
      name: "FinanceFlow",
      logo: "💰",
      tagline: "Financial technology leaders",
      industry: "FinTech",
      size: "1000-5000",
      location: "Bangalore, Karnataka",
      jobs: 38,
    },
    {
      id: 7,
      name: "HealthCare Plus",
      logo: "🏥",
      tagline: "Healthcare innovation",
      industry: "Healthcare",
      size: "500-1000",
      location: "Chennai, Tamil Nadu",
      jobs: 22,
    },
    {
      id: 8,
      name: "GreenEnergy Co",
      logo: "🌱",
      tagline: "Sustainable future",
      industry: "Energy",
      size: "200-500",
      location: "Pune, Maharashtra",
      jobs: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-accent">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Top Companies</h1>
          <p className="text-muted-foreground">
            Discover leading companies hiring talented professionals
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center px-3 border rounded-lg">
                <Search className="h-5 w-5 text-muted-foreground mr-2" />
                <Input
                  type="text"
                  placeholder="Search companies by name, industry, or location..."
                  className="border-0 focus-visible:ring-0"
                />
              </div>
              <Button className="bg-primary hover:bg-primary-hover">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-4">
            <Card className="shadow-soft">
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label className="font-semibold mb-2 block">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-semibold mb-2 block">Company Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Size</SelectItem>
                      <SelectItem value="small">1-100</SelectItem>
                      <SelectItem value="medium">100-500</SelectItem>
                      <SelectItem value="large">500-1000</SelectItem>
                      <SelectItem value="enterprise">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-semibold mb-2 block">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi NCR</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Companies Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {companies.length} companies
              </p>
              <Select defaultValue="name">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Company Name</SelectItem>
                  <SelectItem value="jobs">Most Jobs</SelectItem>
                  <SelectItem value="size">Company Size</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card
                  key={company.id}
                  className="hover:shadow-soft transition-smooth cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{company.logo}</div>
                      <Badge variant="secondary">{company.jobs} jobs</Badge>
                    </div>

                    <h3 className="font-semibold text-xl mb-2 line-clamp-1">
                      {company.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {company.tagline}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4 mr-2" />
                        {company.industry} • {company.size} employees
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {company.location}
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary-hover">
                      View Jobs
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
