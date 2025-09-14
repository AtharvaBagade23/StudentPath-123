"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAccess = async () => {
      try {
        // Get token from URL
        const token = searchParams.get('token');
        if (!token) {
          throw new Error('No token provided');
        }

        // Get student data from cookie
        const studentDataCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('studentData='));

        if (!studentDataCookie) {
          throw new Error('No student data found');
        }

        const studentData = JSON.parse(studentDataCookie.split('=')[1]);

        // Validate the token matches the stored token
        if (studentData.collegeToken !== token) {
          throw new Error('Invalid token');
        }

        // Verify token is still valid with the server
        const response = await fetch(`/api/auth/validate-token?token=${token}`);
        const data = await response.json();

        if (!response.ok || !data.valid) {
          throw new Error('Token validation failed');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Access validation error:', error);
        // Clear cookies and redirect to login
        document.cookie = 'studentData=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/login';
      }
    };

    validateAccess();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}