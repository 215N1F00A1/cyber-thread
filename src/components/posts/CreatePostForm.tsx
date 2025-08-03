import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Image, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onSubmit: (content: string) => Promise<void>;
  className?: string;
}

export function CreatePostForm({ user, onSubmit, className }: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent("");
      toast({
        title: "Post created!",
        description: "Your post has been shared with your network.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto border border-border/50 shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">Create a post</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="w-12 h-12 border-2 border-primary/10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] resize-none border-border/50 focus:border-primary transition-colors"
                disabled={isSubmitting}
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                    disabled
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Photo
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                    disabled
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                    disabled
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Document
                  </Button>
                </div>
                
                <Button
                  type="submit"
                  variant="professional"
                  disabled={!content.trim() || isSubmitting}
                  className="min-w-[100px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Posting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Post</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}