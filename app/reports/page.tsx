"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Download, Calendar, BarChart3, PieChart, Target, Award, Clock } from "lucide-react"

export default function ProgressReportsPage() {
  const semesterProgress = {
    current: 3,
    total: 8,
    cgpa: 8.2,
    credits: 18,
    totalCredits: 24,
  }

  const monthlyProgress = [
    { month: "Aug", courses: 85, skills: 78, goals: 60 },
    { month: "Sep", courses: 88, skills: 82, goals: 70 },
    { month: "Oct", courses: 92, skills: 85, goals: 75 },
    { month: "Nov", courses: 90, skills: 88, goals: 80 },
  ]

  const achievements = [
    {
      title: "Dean's List",
      description: "Achieved CGPA above 8.0 for consecutive semesters",
      date: "Nov 2024",
      type: "Academic",
    },
    {
      title: "React Certification",
      description: "Completed advanced React development course",
      date: "Oct 2024",
      type: "Skill",
    },
    {
      title: "Hackathon Winner",
      description: "First place in college coding competition",
      date: "Sep 2024",
      type: "Competition",
    },
  ]

  return (
    <DashboardLayout currentPage="reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Progress Reports</h1>
            <p className="text-muted-foreground">Comprehensive analysis of your academic journey</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              Custom Range
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{semesterProgress.cgpa}</p>
                  <p className="text-sm text-muted-foreground">Current CGPA</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {semesterProgress.credits}/{semesterProgress.totalCredits}
                  </p>
                  <p className="text-sm text-muted-foreground">Credits</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">+12%</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Semester Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Semester Progress
              </CardTitle>
              <CardDescription>Current semester completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Course Completion</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assignment Submission</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Skill Development</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Recent Achievements
              </CardTitle>
              <CardDescription>Your latest accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="p-1 bg-primary/10 rounded">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{achievement.type}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {achievement.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Performance Trends
            </CardTitle>
            <CardDescription>Track your progress over the past 4 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {monthlyProgress.map((month, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium">{month.month} 2024</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Courses</span>
                        <span className="font-medium">{month.courses}%</span>
                      </div>
                      <Progress value={month.courses} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Skills</span>
                        <span className="font-medium">{month.skills}%</span>
                      </div>
                      <Progress value={month.skills} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Goals</span>
                        <span className="font-medium">{month.goals}%</span>
                      </div>
                      <Progress value={month.goals} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
