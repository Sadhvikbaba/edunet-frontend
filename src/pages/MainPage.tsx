import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { applyForPost, getAllPosts } from "@/connecting";
import Logout from "@/components/logout";

interface JobPost {
  _id: string;
  title: string;
  content: string;
  wantedLocation: string;
  wantedDate: string;
}

export default function MainPage() {
  const [posts, setPosts] = useState<JobPost[]>([]);

  useEffect(() => {
    // Simulated data - replace with actual API call
    const fetchPosts = async () => {
      await getAllPosts().then((response) => {
        setPosts(response.data);
      }
      ).catch(() => {
        console.error("Failed to fetch posts.");
      });
    };
    fetchPosts();
  }, []);

  const apply = async (postId: string) => {
    try {
      await applyForPost(postId);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Failed to apply for post:", error);
      alert(error);
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
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
              <Logout/>
          </div>
        </div>
      </nav>

      <main className=" px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
        <div className="grid gap-6">
          {posts && posts.map((post) => (
            <Card key={post._id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {post.wantedLocation}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {new Date(post.wantedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-4 ">
                  <Button onClick={() => apply(post._id)}>
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}