"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminShell from "@/components/admin-shell";
import {
  Building, 
  Users, 
  GraduationCap, 
  Copy, 
  Check,
  BarChart3,
  Settings,
  UserPlus,
  BookOpen,
  TrendingUp
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data - in real app, this would come from API
const mockCollegeData = {
  id: 1,
  name: "Sample College",
  token: "jgsudyfuwebubivwni",
  totalStudents: 1250,
  activeStudents: 1180,
  programs: ["Computer Science", "Engineering", "Business"],
  recentRegistrations: [
    { name: "John Doe", program: "Computer Science", date: "2024-01-15" },
    { name: "Jane Smith", program: "Engineering", date: "2024-01-14" },
    { name: "Mike Johnson", program: "Business", date: "2024-01-13" },
  ]
};

export default function AdminDashboard() {
  const [copied, setCopied] = useState(false);
  const [collegeData, setCollegeData] = useState(mockCollegeData);
  const [tokenUsage, setTokenUsage] = useState({
    usageCount: 45,
    maxUsage: 1000,
    remaining: 955,
    isActive: true
  });
  const [recentRegistrations, setRecentRegistrations] = useState(mockCollegeData.recentRegistrations);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would get the college ID from authentication
    // For now, we'll use a mock approach
    fetchCollegeData();
  }, []);

  const fetchCollegeData = async () => {
    try {
      // Get college data from localStorage (set during login)
      const storedCollegeData = localStorage.getItem('collegeData');
      
      if (storedCollegeData) {
        const college = JSON.parse(storedCollegeData);
        setCollegeData({
          id: college.id,
          name: college.name,
          token: college.token,
          totalStudents: 1250, // Mock data
          activeStudents: 1180, // Mock data
          programs: ["Computer Science", "Engineering", "Business"], // Mock data
          recentRegistrations: mockCollegeData.recentRegistrations
        });
      }
      
      // In a real app, you would fetch real data from the API
      // const response = await fetch(`/api/admin/college-data?collegeId=${college.id}`);
      // const data = await response.json();
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching college data:', error);
      setIsLoading(false);
    }
  };

  const copyTokenToClipboard = async () => {
    const tokenUrl = `${window.location.origin}/register/student?token=${collegeData.token}`;
    try {
      await navigator.clipboard.writeText(tokenUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  const copyTokenOnly = async () => {
    try {
      await navigator.clipboard.writeText(collegeData.token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  if (isLoading) {
    return (
      <AdminShell title="Dashboard" description="Loading your college management system">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Building className="w-8 h-8 text-white" />
            </div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Dashboard" description="Overview of your college management system">
      {/* Token Display Section */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center gap-2">
              <Building className="w-5 h-5" />
              Student Registration Token
            </CardTitle>
            <CardDescription className="text-green-600 dark:text-green-300">
              Share this token or URL with your students for registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Token Only */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-green-800 dark:text-green-200 mb-2 block">
                    Registration Token
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 px-3 py-2 rounded text-green-800 dark:text-green-200 font-mono text-sm">
                      {collegeData.token}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyTokenOnly}
                      className="border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/20"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Full URL */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-green-800 dark:text-green-200 mb-2 block">
                    Registration URL
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 px-3 py-2 rounded text-green-800 dark:text-green-200 font-mono text-xs truncate">
                      {`${typeof window !== 'undefined' ? window.location.origin : 'localhost:3000'}/register/student?token=${collegeData.token}`}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyTokenToClipboard}
                      className="border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/20"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold">{collegeData.totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                  <p className="text-3xl font-bold">{collegeData.activeStudents}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Programs</p>
                  <p className="text-3xl font-bold">{collegeData.programs.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-3xl font-bold">+12%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Registrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Recent Student Registrations
              </CardTitle>
              <CardDescription>
                Latest students who registered using your token
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRegistrations.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.program}</p>
                    </div>
                    <Badge variant="outline" className="border-green-500/20 text-green-600 dark:text-green-400">
                      {student.date}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Token Usage Analytics
              </CardTitle>
              <CardDescription>
                Track how your registration token is being used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                  <div>
                    <p className="font-medium">Token Usage</p>
                    <p className="text-sm text-muted-foreground">Students registered this month</p>
                  </div>
                  <Badge variant="outline" className="border-blue-500/20 text-blue-600 dark:text-blue-400">
                    {tokenUsage.usageCount} students
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                  <div>
                    <p className="font-medium">Remaining Usage</p>
                    <p className="text-sm text-muted-foreground">Available registrations</p>
                  </div>
                  <Badge variant="outline" className="border-green-500/20 text-green-600 dark:text-green-400">
                    {tokenUsage.remaining} remaining
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                  <div>
                    <p className="font-medium">Token Status</p>
                    <p className="text-sm text-muted-foreground">Current token status</p>
                  </div>
                  <Badge className={`${tokenUsage.isActive ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20' : 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/20'}`}>
                    {tokenUsage.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <UserPlus className="w-6 h-6" />
                  <span>Add Student</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <BookOpen className="w-6 h-6" />
                  <span>Manage Programs</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <BarChart3 className="w-6 h-6" />
                  <span>View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}