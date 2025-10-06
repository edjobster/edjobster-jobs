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
        {/* Vertical Gradient Overlay - Dark blue at top/bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/80 via-transparent to-[#1e3a8a]/80 pointer-events-none z-[1]"></div>
        {/* Animated AI Waves Background */}
        <div className="absolute inset-0 overflow-hidden opacity-70">
          {/* Cyan Wave 1 - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,120 Q-400,80 0,120 T800,120 T1600,120 T2400,120 T3200,120"
              className="animate-wave-flow"
              fill="none"
              stroke="url(#gradient-cyan)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                <stop offset="30%" stopColor="rgba(34, 211, 238, 0.6)" />
                <stop offset="50%" stopColor="rgba(34, 211, 238, 0.9)" />
                <stop offset="70%" stopColor="rgba(34, 211, 238, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cyan Wave 2 - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,80 Q-400,50 0,80 T800,80 T1600,80 T2400,80 T3200,80"
              className="animate-wave-flow-delayed"
              fill="none"
              stroke="url(#gradient-cyan-2)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-cyan-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                <stop offset="30%" stopColor="rgba(34, 211, 238, 0.4)" />
                <stop offset="50%" stopColor="rgba(34, 211, 238, 0.7)" />
                <stop offset="70%" stopColor="rgba(34, 211, 238, 0.4)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Pink/Magenta Wave 1 - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,70 Q-400,40 0,70 T800,70 T1600,70 T2400,70 T3200,70"
              className="animate-wave-flow-reverse"
              fill="none"
              stroke="url(#gradient-pink)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-pink" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(236, 72, 153, 0)" />
                <stop offset="30%" stopColor="rgba(236, 72, 153, 0.6)" />
                <stop offset="50%" stopColor="rgba(236, 72, 153, 0.9)" />
                <stop offset="70%" stopColor="rgba(236, 72, 153, 0.6)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Pink/Magenta Wave 2 - BOTTOM */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,650 Q-400,620 0,650 T800,650 T1600,650 T2400,650 T3200,650"
              className="animate-wave-flow-reverse-delayed"
              fill="none"
              stroke="url(#gradient-pink-2)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-pink-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(236, 72, 153, 0)" />
                <stop offset="30%" stopColor="rgba(236, 72, 153, 0.4)" />
                <stop offset="50%" stopColor="rgba(236, 72, 153, 0.7)" />
                <stop offset="70%" stopColor="rgba(236, 72, 153, 0.4)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Additional Cyan Wave - BOTTOM */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,700 Q-400,670 0,700 T800,700 T1600,700 T2400,700 T3200,700"
              className="animate-wave-flow-slow"
              fill="none"
              stroke="url(#gradient-cyan-3)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-cyan-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                <stop offset="30%" stopColor="rgba(6, 182, 212, 0.5)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.8)" />
                <stop offset="70%" stopColor="rgba(6, 182, 212, 0.5)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Purple Wave - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,160 Q-400,130 0,160 T800,160 T1600,160 T2400,160 T3200,160"
              className="animate-wave-flow-fast"
              fill="none"
              stroke="url(#gradient-purple)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
                <stop offset="30%" stopColor="rgba(168, 85, 247, 0.4)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.7)" />
                <stop offset="70%" stopColor="rgba(168, 85, 247, 0.4)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Teal Wave - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,190 Q-400,160 0,190 T800,190 T1600,190 T2400,190 T3200,190"
              className="animate-wave-flow-medium"
              fill="none"
              stroke="url(#gradient-teal)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-teal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(20, 184, 166, 0)" />
                <stop offset="30%" stopColor="rgba(20, 184, 166, 0.5)" />
                <stop offset="50%" stopColor="rgba(20, 184, 166, 0.8)" />
                <stop offset="70%" stopColor="rgba(20, 184, 166, 0.5)" />
                <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cyan Wave 3 - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,100 Q-400,70 0,100 T800,100 T1600,100 T2400,100 T3200,100"
              className="animate-wave-flow-extra"
              fill="none"
              stroke="url(#gradient-cyan-4)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-cyan-4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                <stop offset="30%" stopColor="rgba(34, 211, 238, 0.5)" />
                <stop offset="50%" stopColor="rgba(34, 211, 238, 0.8)" />
                <stop offset="70%" stopColor="rgba(34, 211, 238, 0.5)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Pink Wave 3 - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,110 Q-400,80 0,110 T800,110 T1600,110 T2400,110 T3200,110"
              className="animate-wave-flow-reverse-extra"
              fill="none"
              stroke="url(#gradient-pink-3)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-pink-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(236, 72, 153, 0)" />
                <stop offset="30%" stopColor="rgba(236, 72, 153, 0.5)" />
                <stop offset="50%" stopColor="rgba(236, 72, 153, 0.8)" />
                <stop offset="70%" stopColor="rgba(236, 72, 153, 0.5)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Purple Wave 2 - BOTTOM */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,620 Q-400,590 0,620 T800,620 T1600,620 T2400,620 T3200,620"
              className="animate-wave-flow-ultra"
              fill="none"
              stroke="url(#gradient-purple-2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-purple-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
                <stop offset="30%" stopColor="rgba(168, 85, 247, 0.5)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
                <stop offset="70%" stopColor="rgba(168, 85, 247, 0.5)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Teal Wave 2 - BOTTOM */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,730 Q-400,700 0,730 T800,730 T1600,730 T2400,730 T3200,730"
              className="animate-wave-flow-mega"
              fill="none"
              stroke="url(#gradient-teal-2)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-teal-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(20, 184, 166, 0)" />
                <stop offset="30%" stopColor="rgba(20, 184, 166, 0.4)" />
                <stop offset="50%" stopColor="rgba(20, 184, 166, 0.7)" />
                <stop offset="70%" stopColor="rgba(20, 184, 166, 0.4)" />
                <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cyan Wave 4 - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,50 Q-400,30 0,50 T800,50 T1600,50 T2400,50 T3200,50"
              className="animate-wave-flow-hyper"
              fill="none"
              stroke="url(#gradient-cyan-5)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-cyan-5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                <stop offset="30%" stopColor="rgba(34, 211, 238, 0.4)" />
                <stop offset="50%" stopColor="rgba(34, 211, 238, 0.7)" />
                <stop offset="70%" stopColor="rgba(34, 211, 238, 0.4)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Pink Wave 4 - BOTTOM */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,680 Q-400,650 0,680 T800,680 T1600,680 T2400,680 T3200,680"
              className="animate-wave-flow-reverse-hyper"
              fill="none"
              stroke="url(#gradient-pink-4)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-pink-4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(236, 72, 153, 0)" />
                <stop offset="30%" stopColor="rgba(236, 72, 153, 0.4)" />
                <stop offset="50%" stopColor="rgba(236, 72, 153, 0.7)" />
                <stop offset="70%" stopColor="rgba(236, 72, 153, 0.4)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Purple-Yellow Wave 1 - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,140 Q-400,110 0,140 T800,140 T1600,140 T2400,140 T3200,140"
              className="animate-wave-flow-purple-yellow-1"
              fill="none"
              stroke="url(#gradient-purple-yellow-1)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-purple-yellow-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
                <stop offset="25%" stopColor="rgba(168, 85, 247, 0.6)" />
                <stop offset="50%" stopColor="rgba(234, 179, 8, 0.8)" />
                <stop offset="75%" stopColor="rgba(168, 85, 247, 0.6)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Purple-Yellow Wave 2 - BOTTOM */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,710 Q-400,680 0,710 T800,710 T1600,710 T2400,710 T3200,710"
              className="animate-wave-flow-purple-yellow-2"
              fill="none"
              stroke="url(#gradient-purple-yellow-2)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-purple-yellow-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(234, 179, 8, 0)" />
                <stop offset="30%" stopColor="rgba(234, 179, 8, 0.5)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.7)" />
                <stop offset="70%" stopColor="rgba(234, 179, 8, 0.5)" />
                <stop offset="100%" stopColor="rgba(234, 179, 8, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Purple-Yellow Wave 3 - BOTTOM */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,660 Q-400,630 0,660 T800,660 T1600,660 T2400,660 T3200,660"
              className="animate-wave-flow-purple-yellow-3"
              fill="none"
              stroke="url(#gradient-purple-yellow-3)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-purple-yellow-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
                <stop offset="20%" stopColor="rgba(234, 179, 8, 0.4)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
                <stop offset="80%" stopColor="rgba(234, 179, 8, 0.4)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Purple-Yellow Wave 4 - TOP */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,180 Q-400,150 0,180 T800,180 T1600,180 T2400,180 T3200,180"
              className="animate-wave-flow-purple-yellow-4"
              fill="none"
              stroke="url(#gradient-purple-yellow-4)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-purple-yellow-4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(234, 179, 8, 0)" />
                <stop offset="25%" stopColor="rgba(168, 85, 247, 0.5)" />
                <stop offset="50%" stopColor="rgba(234, 179, 8, 0.9)" />
                <stop offset="75%" stopColor="rgba(168, 85, 247, 0.5)" />
                <stop offset="100%" stopColor="rgba(234, 179, 8, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Purple-Yellow Wave 5 - BOTTOM */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 800">
            <path
              d="M-800,740 Q-400,710 0,740 T800,740 T1600,740 T2400,740 T3200,740"
              className="animate-wave-flow-purple-yellow-5"
              fill="none"
              stroke="url(#gradient-purple-yellow-5)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-purple-yellow-5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
                <stop offset="30%" stopColor="rgba(234, 179, 8, 0.6)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
                <stop offset="70%" stopColor="rgba(234, 179, 8, 0.6)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </linearGradient>
            </defs>
          </svg>
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
              <div className="relative p-[4px]">
                {/* Shooting star outline animation */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 rounded-full animate-[spin-border_2s_linear_infinite]" 
                       style={{
                         background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(96,165,250,1) 60%, rgba(147,197,253,1) 70%, rgba(255,255,255,1) 75%, rgba(147,197,253,1) 80%, rgba(96,165,250,1) 90%, transparent 100%)',
                         boxShadow: '0 0 20px rgba(96,165,250,0.8)',
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
                    <Wand2 className="h-5 w-5 opacity-90 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
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
              <Link
                key={job.id}
                to={job.id === 1 ? `/jobs/${job.id}` : "#"}
                className="block"
              >
                <Card className="hover:shadow-soft transition-smooth cursor-pointer h-full">
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
                        {job.id === 1 ? "View Details" : "Apply"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
