import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.nextUrl.searchParams.get('token');
  const isPublicPath = path === '/login' || path === '/register' || path === '/register/student';
  const isCollegeLoginPath = path === '/college-login';
  
  const studentData = request.cookies.get('studentData')?.value;
  const collegeData = request.cookies.get('collegeData')?.value;

  // Handle admin routes
  if (path.startsWith('/admin')) {
    // If no college data, redirect to college login
    if (!collegeData) {
      return NextResponse.redirect(new URL('/college-login', request.url));
    }
    
    // Verify college data
    try {
      const college = JSON.parse(collegeData);
      if (!college.token || college.type !== 'college') {
        return NextResponse.redirect(new URL('/college-login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/college-login', request.url));
    }
  }

  // Handle student dashboard routes
  if (path.startsWith('/dashboard')) {
    if (!studentData) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Parse student data to check college token
    try {
      const student = JSON.parse(studentData);
      if (!student.college_id) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect to appropriate dashboard if already logged in and trying to access public paths
  if (isPublicPath && studentData) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isCollegeLoginPath && collegeData) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Configure the paths that need to be protected
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
    '/register/student',
    '/college-login'
  ]
}