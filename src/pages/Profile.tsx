import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/posts/PostCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Edit, 
  Plus, 
  Users, 
  Eye,
  MessageSquare,
  Heart
} from "lucide-react";

// Mock data - will be replaced with Supabase data
const mockUser = {
  id: "1",
  name: "John Developer",
  email: "john@example.com",
  bio: "Full Stack Developer passionate about creating amazing user experiences. Specialized in React, TypeScript, and modern web technologies. Always learning and sharing knowledge with the community.",
  location: "San Francisco, CA",
  joinDate: "2023-01-15",
  connections: 342,
  profileViews: 1240,
  postViews: 5680,
  avatar: undefined
};

const mockUserPosts = [
  {
    id: "user-1",
    content: "Just finished building an amazing React application! The component architecture is clean and scalable. Excited to share it with the community! 🚀\n\nTech stack: React, TypeScript, Tailwind CSS, and Supabase for the backend.",
    author: mockUser,
    createdAt: "2024-01-15T10:30:00Z",
    likesCount: 24,
    commentsCount: 8,
    isLiked: false
  },
  {
    id: "user-2",
    content: "Just attended an amazing workshop on modern web development patterns. Key takeaways:\n\n1. Component composition over inheritance\n2. Custom hooks for reusable logic\n3. State management best practices\n\nAlways learning and growing! 📚",
    author: mockUser,
    createdAt: "2024-01-14T16:45:00Z",
    likesCount: 18,
    commentsCount: 5,
    isLiked: false
  },
  {
    id: "user-3",
    content: "Working on an exciting new project that combines AI with web development. The possibilities are endless when you merge cutting-edge technology with creative problem-solving.\n\nWhat emerging technologies are you most excited about? Drop your thoughts below! 💭",
    author: mockUser,
    createdAt: "2024-01-13T14:20:00Z",
    likesCount: 31,
    commentsCount: 12,
    isLiked: true
  }
];

export default function Profile() {
  const [user] = useState(mockUser);
  const [posts, setPosts] = useState(mockUserPosts);
  const [activeTab, setActiveTab] = useState("posts");

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
    console.log("Logout clicked");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-border/50 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div>
                    <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
                    <p className="text-sm text-muted-foreground mt-2">{user.bio}</p>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    {user.location && (
                      <div className="flex items-center justify-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDate(user.joinDate)}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{user.connections}</div>
                      <div className="text-xs text-muted-foreground">Connections</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{user.profileViews}</div>
                      <div className="text-xs text-muted-foreground">Profile Views</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{user.postViews}</div>
                      <div className="text-xs text-muted-foreground">Post Views</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="professional" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "JavaScript", "Node.js", "Python", "AWS", "Docker", "GraphQL"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Activity Summary */}
            <Card className="border border-border/50 shadow-sm">
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-primary mr-2" />
                      <span className="text-2xl font-bold text-foreground">{posts.length}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Posts</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-2xl font-bold text-foreground">
                        {posts.reduce((acc, post) => acc + (post.likesCount || 0), 0)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-2xl font-bold text-foreground">{user.postViews}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Post Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader>
                <div className="flex space-x-4 border-b border-border">
                  {[
                    { id: "posts", label: "Posts", count: posts.length },
                    { id: "about", label: "About", count: null },
                    { id: "activity", label: "Activity", count: null }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-2 px-1 text-sm font-medium transition-colors border-b-2 ${
                        activeTab === tab.id
                          ? "text-primary border-primary"
                          : "text-muted-foreground border-transparent hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                      {tab.count && (
                        <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </CardHeader>
            </Card>

            {/* Tab Content */}
            {activeTab === "posts" && (
              <div className="space-y-6">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={handleLike}
                      onComment={(postId) => console.log('Comment on', postId)}
                      onShare={(postId) => console.log('Share', postId)}
                    />
                  ))
                ) : (
                  <Card className="border border-border/50 shadow-sm">
                    <CardContent className="pt-6 text-center space-y-4">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
                        <p className="text-muted-foreground">Start sharing your thoughts with the community!</p>
                      </div>
                      <Button variant="professional">Create Your First Post</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "about" && (
              <Card className="border border-border/50 shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">About</h3>
                      <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Experience</h3>
                      <div className="space-y-4">
                        <div className="border-l-2 border-primary pl-4">
                          <h4 className="font-semibold text-foreground">Senior Full Stack Developer</h4>
                          <p className="text-sm text-muted-foreground">TechCorp Inc. • 2022 - Present</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Leading development of modern web applications using React, TypeScript, and cloud technologies.
                          </p>
                        </div>
                        <div className="border-l-2 border-muted pl-4">
                          <h4 className="font-semibold text-foreground">Frontend Developer</h4>
                          <p className="text-sm text-muted-foreground">StartupXYZ • 2020 - 2022</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Built responsive web applications and improved user experience across multiple products.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "activity" && (
              <Card className="border border-border/50 shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                    <div className="space-y-3">
                      {[
                        { action: "Posted a new article", time: "2 hours ago" },
                        { action: "Liked 3 posts", time: "5 hours ago" },
                        { action: "Connected with Sarah Tech", time: "1 day ago" },
                        { action: "Commented on Mike's post", time: "2 days ago" },
                        { action: "Updated profile information", time: "1 week ago" }
                      ].map((activity, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                          <span className="text-foreground">{activity.action}</span>
                          <span className="text-sm text-muted-foreground">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}