"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, Code, Database, Palette, Users, Plus, Star } from "lucide-react"

export default function SkillsTrackerPage() {
  const skillCategories = [
    {
      name: "Programming Languages",
      icon: Code,
      skills: [
        { name: "JavaScript", level: 85, trend: "up" },
        { name: "Python", level: 78, trend: "up" },
        { name: "Java", level: 72, trend: "stable" },
        { name: "C++", level: 65, trend: "down" },
      ],
    },
    {
      name: "Web Development",
      icon: Palette,
      skills: [
        { name: "React", level: 80, trend: "up" },
        { name: "Node.js", level: 75, trend: "up" },
        { name: "HTML/CSS", level: 90, trend: "stable" },
        { name: "TypeScript", level: 70, trend: "up" },
      ],
    },
    {
      name: "Database & Backend",
      icon: Database,
      skills: [
        { name: "SQL", level: 75, trend: "up" },
        { name: "MongoDB", level: 68, trend: "up" },
        { name: "REST APIs", level: 82, trend: "stable" },
        { name: "GraphQL", level: 45, trend: "up" },
      ],
    },
    {
      name: "Soft Skills",
      icon: Users,
      skills: [
        { name: "Communication", level: 85, trend: "up" },
        { name: "Leadership", level: 70, trend: "up" },
        { name: "Problem Solving", level: 88, trend: "stable" },
        { name: "Time Management", level: 75, trend: "up" },
      ],
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-500" />
      case "down":
        return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />
    }
  }

  const getSkillColor = (level: number) => {
    if (level >= 80) return "bg-green-500"
    if (level >= 60) return "bg-blue-500"
    if (level >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <DashboardLayout currentPage="skills">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Skills Tracker</h1>
            <p className="text-muted-foreground">Monitor your skill development and progress</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">16</p>
                  <p className="text-sm text-muted-foreground">Total Skills</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Expert Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Improving</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </CardTitle>
                <CardDescription>Track your progress in {category.name.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          {getTrendIcon(skill.trend)}
                        </div>
                        <Badge variant="outline">{skill.level}%</Badge>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
