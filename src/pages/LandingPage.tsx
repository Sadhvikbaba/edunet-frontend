import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BriefcaseIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background w-full">
      <nav className="border-b">
        <div className=" flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 w-6" />
            <span className="text-xl font-bold">JobConnect</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </nav>
      
      <main className=" px-4 py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-5xl font-bold tracking-tighter">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Connect with top employers, discover exciting opportunities, and take the next step in your career journey.
          </p>
          <div className="flex space-x-4">
            <Link to="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline">Browse Jobs</Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Find Opportunities</h3>
            <p className="text-muted-foreground">
              Discover thousands of job opportunities from top companies.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Build Your Profile</h3>
            <p className="text-muted-foreground">
              Create a professional profile to showcase your skills and experience.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Connect & Grow</h3>
            <p className="text-muted-foreground">
              Network with professionals and grow your career.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}