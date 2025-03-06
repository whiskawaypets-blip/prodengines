import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // For now, let's simplify by removing Supabase middleware client
  // and just checking URL paths
  const { pathname } = req.nextUrl;
  
  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  // For now, we'll use a basic check - in production you'd use Supabase Auth
  // When we set up a real Supabase project, we'll re-implement this properly
  if (isProtectedRoute) {
    // If trying to access dashboard, redirect to login
    // This is just for demonstration
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
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
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 