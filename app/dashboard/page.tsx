"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Search,
  Home,
  BookOpen,
  Target,
  Award,
  Lightbulb,
  TrendingUp,
  Bot,
  Settings,
  Menu,
  X,
  Calendar,
  Clock,
  Star,
  ArrowUp,
  GraduationCap,
  CheckCircle,
  MapPin,
  Building,
  Code,
  Users,
  Languages,
} from "lucide-react"
import Link from "next/link"

interface StudentData {
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  college: string;
  college_name: string;
  college_type: string;
  program: string;
  current_year: number;
  current_semester: string;
  current_gpa: number;
  academic_interests: string[];
  career_quiz_answers: Record<string, string>;
  technical_skills: Record<string, number>;
  soft_skills: Record<string, number>;
  language_skills: Record<string, string>;
  primary_goal: string;
  secondary_goal: string;
  timeline: string;
  location_preference: string;
  industry_focus: string[];
  city: string;
  state: string;
  country: string;
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Get token and student ID from cookie
        const studentDataCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('studentData='));

        if (!studentDataCookie) {
          throw new Error('No student data found');
        }

        const cookieData = JSON.parse(studentDataCookie.split('=')[1]);
        const token = searchParams.get('token');

        const response = await fetch(
          `/api/student/data?studentId=${cookieData.student_id}&token=${token}`
        );
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch student data');
        }

        console.log('API Response:', data);
        console.log('Student Data:', data.student);
        
        setStudentData(data.student);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [searchParams]);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    { icon: BookOpen, label: "My Courses", href: "/courses" },
    { icon: Target, label: "Career Goals", href: "/goals" },
    { icon: Award, label: "Skills Tracker", href: "/skills" },
    { icon: Lightbulb, label: "Recommendations", href: "/recommendations" },
    { icon: TrendingUp, label: "Progress Reports", href: "/reports" },
    { icon: Bot, label: "AI Assistant", href: "/assistant" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  if (isLoading) {
    return (
      <DashboardLayout currentPage="dashboard">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!studentData) {
    return (
      <DashboardLayout currentPage="dashboard">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-destructive">
            Failed to load student data. Please refresh the page.
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      currentPage="dashboard"
      userData={studentData}
    >
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome, {studentData.first_name} {studentData.last_name}!
            </h1>
            <div className="flex items-center text-muted-foreground">
              <Building className="w-4 h-4 mr-2" />
              <span>{studentData.college_name} • </span>
              <MapPin className="w-4 h-4 mx-2" />
              <span>{`${studentData.city}, ${studentData.state}, ${studentData.country}`}</span>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Academic Progress */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Academic Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${(studentData.current_year / 4) * 100}, 100`}
                        className="text-primary"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-muted"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-foreground">{Math.round((studentData.current_year / 4) * 100)}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Year {studentData.current_year} - {studentData.current_semester}
                </p>
                <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                  View detailed progress
                </Button>
              </CardContent>
            </Card>

            {/* GPA Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">GPA Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">{Number(studentData.current_gpa).toFixed(2)}</div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(Number(studentData.current_gpa) / 10) * 100}%` }} 
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    Update grades
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Career Goal */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Career Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground mb-2">{studentData.primary_goal}</div>
                  <div className="text-sm text-muted-foreground mb-4">{studentData.timeline}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Goal aligned</span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    View career path
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Skills Overview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Skills Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Technical Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(studentData.technical_skills)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([skill, level]) => (
                          <Badge key={skill} variant="secondary">
                            {skill} - L{level}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Soft Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(studentData.soft_skills)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([skill, level]) => (
                          <Badge key={skill} variant="outline">
                            {skill} - L{level}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Academic Profile */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Academic Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Program</p>
                    <p className="font-medium">{studentData.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">College Type</p>
                    <p className="font-medium">{studentData.college_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Academic Interests</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {studentData.academic_interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(studentData.technical_skills)
                    .sort(([, a], [, b]) => b - a)
                    .map(([skill, level]) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-sm">{skill}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={level * 20} className="w-20" />
                          <span className="text-xs text-muted-foreground">{level}/5</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Focus */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Industry Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Industries of Interest</p>
                    <div className="flex flex-wrap gap-2">
                      {studentData.industry_focus.map((industry) => (
                        <Badge key={industry} variant="outline">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location Preference</p>
                    <p className="font-medium mt-1">{studentData.location_preference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <p className="font-medium mt-1">{studentData.timeline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Soft Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Soft Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(studentData.soft_skills)
                    .sort(([, a], [, b]) => b - a)
                    .map(([skill, level]) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-sm">{skill}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={level * 20} className="w-20" />
                          <span className="text-xs text-muted-foreground">{level}/5</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Language Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  Language Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(studentData.language_skills).map(([language, proficiency]) => (
                    <div key={language} className="flex items-center justify-between">
                      <span className="text-sm">{language}</span>
                      <Badge variant="outline">{proficiency}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
    </DashboardLayout>
  )
}
