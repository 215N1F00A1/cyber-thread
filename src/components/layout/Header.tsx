import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Users, PlusSquare, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onLogout?: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/network", icon: Users, label: "Network" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">CyberConnect</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-6">
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-accent",
                        isActive && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Create Post Button */}
              <Link to="/create-post">
                <Button variant="professional" size="sm" className="hidden sm:flex">
                  <PlusSquare className="w-4 h-4" />
                  Create Post
                </Button>
              </Link>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="professional">Join Now</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}