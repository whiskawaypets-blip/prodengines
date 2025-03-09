'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  const { user, isLoading, signOut, isConfigured } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleLogin = async () => {
    if (!isConfigured) {
      console.error("Supabase not configured");
      return;
    }
    
    setIsSigningIn(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) {
        console.error("Google login error:", error);
      }
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const getUserInitials = (user: User | null) => {
    if (!user || !user.email) return "PE";
    
    const email = user.email;
    const nameParts = email.split('@')[0].split('.');
    
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    } else {
      return email.substring(0, 2).toUpperCase();
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-light tracking-tight text-gray-900 dark:text-white">
            <span className="font-normal">Productivity</span> Engines
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about" 
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/why-now" 
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Why Now
            </Link>
            <Link 
              href="/case-studies" 
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Case Studies
            </Link>
            <Link 
              href="/dashboard-direct" 
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Agents Library
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/contact" className="hidden md:block">
              <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                Contact
              </Button>
            </Link>
            
            {isLoading ? (
              <Skeleton className="h-9 w-24 rounded-md" />
            ) : user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-md flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.user_metadata?.avatar_url || ''} alt={user.email || 'User'} />
                      <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <div className="p-2 border-b">
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-gray-500">Logged in with Google</p>
                  </div>
                  <div className="p-2">
                    <Link href="/dashboard-direct">
                      <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                        Agents Library
                      </Button>
                    </Link>
                    <Link href="/auth-debug">
                      <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                        Auth Debug
                      </Button>
                    </Link>
                    <Link href="/profile">
                      <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                        Profile Settings
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-left text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={signOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button 
                size="sm" 
                className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-md flex items-center gap-2"
                onClick={handleGoogleLogin}
                disabled={isSigningIn || !isConfigured}
              >
                {isSigningIn ? (
                  <>Loading...</>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg>
                    Login with Google
                  </>
                )}
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
} 