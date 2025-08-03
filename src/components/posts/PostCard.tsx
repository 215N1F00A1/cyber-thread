import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      email: string;
      bio?: string;
      avatar?: string;
    };
    createdAt: string;
    likesCount?: number;
    commentsCount?: number;
    isLiked?: boolean;
  };
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <Card className="w-full max-w-2xl mx-auto hover:shadow-md transition-all duration-300 border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 border-2 border-primary/10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                {post.author.name}
              </h3>
              <p className="text-sm text-muted-foreground">{post.author.bio || post.author.email}</p>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-4">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Engagement Stats */}
        {(post.likesCount || post.commentsCount) && (
          <div className="flex items-center justify-between py-2 border-b border-border/30 mb-3">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              {post.likesCount && post.likesCount > 0 && (
                <span>{post.likesCount} like{post.likesCount !== 1 ? 's' : ''}</span>
              )}
              {post.commentsCount && post.commentsCount > 0 && (
                <span>{post.commentsCount} comment{post.commentsCount !== 1 ? 's' : ''}</span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 transition-colors ${
              post.isLiked ? 'text-red-600' : 'text-muted-foreground'
            }`}
            onClick={() => onLike?.(post.id)}
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>Like</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 transition-colors text-muted-foreground"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 hover:bg-green-50 hover:text-green-600 transition-colors text-muted-foreground"
            onClick={() => onShare?.(post.id)}
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}