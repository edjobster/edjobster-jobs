import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div>
            <img src={logo} alt="Edjobster" className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm opacity-90">
              AI-powered career platform connecting talented candidates with leading companies worldwide.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="hover:opacity-80 transition-base">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-base">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-base">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-base">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link to="/jobs" className="hover:opacity-80 transition-base">Browse Jobs</Link></li>
              <li><Link to="/companies" className="hover:opacity-80 transition-base">Companies</Link></li>
              <li><a href="#" className="hover:opacity-80 transition-base">Career Advice</a></li>
              <li><a href="#" className="hover:opacity-80 transition-base">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link to="/contact" className="hover:opacity-80 transition-base">Contact Us</Link></li>
              <li><a href="#" className="hover:opacity-80 transition-base">FAQ</a></li>
              <li><a href="#" className="hover:opacity-80 transition-base">Help Center</a></li>
              <li><a href="#" className="hover:opacity-80 transition-base">Report Issue</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-80 transition-base">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-80 transition-base">Terms of Service</a></li>
              <li><a href="#" className="hover:opacity-80 transition-base">Cookie Policy</a></li>
              <li><a href="#" className="hover:opacity-80 transition-base">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center text-sm opacity-90">
          <p>&copy; {currentYear} Edjobster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
