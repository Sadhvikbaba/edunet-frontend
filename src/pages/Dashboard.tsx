import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BriefcaseIcon } from "lucide-react";
import { toast } from "sonner";
import { createPost, getDashboard } from "@/connecting";
import Logout from "@/components/logout";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const role = useSelector((state: any) => state.auth.userData.role);
  const [jobPost, setJobPost] = useState({
    title: "",
    content: "",
    wantedLocation: "",
    wantedDate: "",
  });
  const [data , setData] = useState<{email : string , name : string , bio : string} | null>();

  useEffect(() => {
    const fetchDetails = async () => {
      await getDashboard().then((response) => {
        setData(response.data);
      }
      ).catch(() => {
        toast.error("Failed to fetch dashboard data.");
      }
      );
    }
    fetchDetails();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(jobPost).then(() => {
        toast.success("Job posted successfully!");
      }).catch(() => {
        toast.error("Failed to post job. Please try again.");
      });
      setJobPost({
        title: "",
        content: "",
        wantedLocation: "",
        wantedDate: "",
      });
    } catch (error) {
      toast.error("Failed to post job. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className=" flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 w-6" />
            <span className="text-xl font-bold">JobConnect</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link to="/jobs">
              <Button variant="ghost">Browse Jobs</Button>
            </Link>
            <Logout/>
          </div>
        </div>
      </nav>

      <main className=" px-4 py-8">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold">{data && data.name}</h2>
                  <p className="text-muted-foreground">{data && data.email}</p>
                  <p className="text-sm text-center mt-4">
                    {data && data.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {role != "worker" ?<Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Post a New Job</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={jobPost.title}
                      onChange={(e) =>
                        setJobPost({ ...jobPost, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Job Description</Label>
                    <Textarea
                      id="content"
                      value={jobPost.content}
                      onChange={(e) =>
                        setJobPost({ ...jobPost, content: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={jobPost.wantedLocation}
                      onChange={(e) =>
                        setJobPost({ ...jobPost, wantedLocation: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Application Deadline</Label>
                    <Input
                      id="date"
                      type="date"
                      value={jobPost.wantedDate}
                      onChange={(e) =>
                        setJobPost({ ...jobPost, wantedDate: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Post Job
                  </Button>
                </form>
              </CardContent>
            </Card> : <div></div>}
          </div>
        </div>
      </main>
    </div>
  );
}