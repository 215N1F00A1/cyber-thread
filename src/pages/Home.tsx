import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/posts/PostCard";
import { CreatePostForm } from "@/components/posts/CreatePostForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Users, Briefcase } from "lucide-react";

// Mock data - will be replaced with Supabase data
const mockUser = {
  id: "1",
  name: "John Developer",
  email: "john@example.com",
  bio: "Full Stack Developer | React Enthusiast",
  avatar: undefined
};

const mockPosts = [
  {
    id: "1",
    content: "Just finished building an amazing React application! The component architecture is clean and scalable. Excited to share it with the community! 🚀\n\nTech stack: React, TypeScript, Tailwind CSS, and Supabase for the backend.",
    author: {
      id: "2",
      name: "Sarah Tech",
      email: "sarah@techcorp.com",
      bio: "Senior Software Engineer at TechCorp",
      avatar: undefined
    },
    createdAt: "2024-01-15T10:30:00Z",
    likesCount: 24,
    commentsCount: 8,
    isLiked: false
  },
  {
    id: "2",
    content: "Looking for talented developers to join our growing team! We're building the next generation of web applications.\n\nRequirements:\n- 3+ years experience with React\n- Strong TypeScript skills\n- Experience with modern tooling\n\nDM me if interested! 💼",
    author: {
      id: "3",
      name: "Mike Recruiter",
      email: "mike@startupinc.com",
      bio: "Tech Recruiter | Connecting talent with opportunities",
      avatar: undefined
    },
    createdAt: "2024-01-15T08:15:00Z",
    likesCount: 45,
    commentsCount: 12,
    isLiked: true
  },
  {
    id: "3",
    content: "Just attended an amazing workshop on modern web development patterns. Key takeaways:\n\n1. Component composition over inheritance\n2. Custom hooks for reusable logic\n3. State management best practices\n\nAlways learning and growing! 📚",
    author: mockUser,
    createdAt: "2024-01-14T16:45:00Z",
    likesCount: 18,
    commentsCount: 5,
    isLiked: false
  }
];

export default function Home() {
  const [posts, setPosts] = useState(mockPosts);
  const [user] = useState(mockUser);

  const handleCreatePost = async (content: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPost = {
      id: Date.now().toString(),
      content,
      author: user,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0,
      isLiked: false
    };
    
    setPosts(prev => [newPost, ...prev]);
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likesCount: post.isLiked 
            ? (post.likesCount || 0) - 1 
            : (post.likesCount || 0) + 1
        };
      }
      return post;
    }));
  };

  const handleLogout = () => {
    // Will implement with Supabase
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="hidden lg:block space-y-6">
            <Card className="p-6 border border-border/50">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-hover rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile views</span>
                    <span className="font-medium text-primary">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Post impressions</span>
                    <span className="font-medium text-primary">1,240</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                Trending Topics
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">#ReactJS</p>
                  <p className="text-muted-foreground">15,420 posts</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">#WebDevelopment</p>
                  <p className="text-muted-foreground">8,890 posts</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">#TypeScript</p>
                  <p className="text-muted-foreground">6,234 posts</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CreatePostForm user={user} onSubmit={handleCreatePost} />
            
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={(postId) => console.log('Comment on', postId)}
                  onShare={(postId) => console.log('Share', postId)}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block space-y-6">
            <Card className="p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Users className="w-4 h-4 mr-2 text-primary" />
                Suggested Connections
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Alex Smith", title: "Frontend Developer", mutual: 5 },
                  { name: "Emma Johnson", title: "UI/UX Designer", mutual: 3 },
                  { name: "David Brown", title: "Backend Engineer", mutual: 8 }
                ].map((person, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{person.name}</p>
                        <p className="text-xs text-muted-foreground">{person.title}</p>
                        <p className="text-xs text-muted-foreground">{person.mutual} mutual connections</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-primary" />
                Recent Jobs
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Senior React Developer", company: "TechCorp Inc.", location: "Remote" },
                  { title: "Full Stack Engineer", company: "StartupXYZ", location: "San Francisco" },
                  { title: "Frontend Architect", company: "BigTech Co.", location: "New York" }
                ].map((job, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                    <p className="text-xs text-muted-foreground">{job.location}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}