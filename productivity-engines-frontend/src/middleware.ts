import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  try {
    // Create a Supabase client for the middleware with explicit URL and key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Only proceed with auth checks if we have the required credentials
    if (supabaseUrl && supabaseKey) {
      const supabase = createMiddlewareClient({ req, res });
      
      // Get the user's session
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      
      const { pathname } = req.nextUrl;
      
      // Protected routes that require authentication
      const protectedRoutes = ['/dashboard'];
      const isProtectedRoute = protectedRoutes.some(route => 
        pathname === route || pathname.startsWith(`${route}/`)
      );
      
      // Auth routes that should redirect to dashboard if already logged in
      const authRoutes = ['/login', '/signup'];
      const isAuthRoute = authRoutes.some(route => 
        pathname === route || pathname.startsWith(`${route}/`)
      );
      
      // If the user is not logged in and trying to access a protected route, redirect to login
      if (isProtectedRoute && !session) {
        const redirectUrl = new URL('/login', req.url);
        return NextResponse.redirect(redirectUrl);
      }
      
      // If the user is logged in and trying to access an auth route, redirect to dashboard
      if (isAuthRoute && session) {
        const redirectUrl = new URL('/dashboard', req.url);
        return NextResponse.redirect(redirectUrl);
      }
    }
  } catch (error) {
    console.error('Middleware error:', error);
    // If there's an error, just continue without auth checks
  }
  
  return res;
}

// Specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
}; 