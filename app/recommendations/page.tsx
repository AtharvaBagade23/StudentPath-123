"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, BookOpen, Users, Briefcase, Star, Clock, ArrowRight, Heart } from "lucide-react"

export default function RecommendationsPage() {
  const recommendations = [
    {
      id: 1,
      type: "course",
      title: "Advanced React Patterns",
      description: "Master advanced React concepts including hooks, context, and performance optimization",
      provider: "Tech Academy",
      rating: 4.8,
      duration: "6 weeks",
      difficulty: "Intermediate",
      reason: "Based on your JavaScript and React skills",
      category: "Web Development",
      icon: BookOpen,
    },
    {
      id: 2,
      type: "project",
      title: "E-commerce Platform Build",
      description: "Build a full-stack e-commerce application with payment integration",
      provider: "Project Hub",
      rating: 4.6,
      duration: "8 weeks",
      difficulty: "Advanced",
      reason: "Perfect for your portfolio development goal",
      category: "Full-Stack",
      icon: Briefcase,
    },
    {
      id: 3,
      type: "networking",
      title: "Tech Meetup: AI in Web Development",
      description: "Connect with industry professionals and learn about AI integration",
      provider: "TechConnect Delhi",
      rating: 4.7,
      duration: "3 hours",
      difficulty: "All Levels",
      reason: "Expand your professional network",
      category: "Networking",
      icon: Users,
    },
    {
      id: 4,
      type: "course",
      title: "System Design Fundamentals",
      description: "Learn to design scalable systems for technical interviews",
      provider: "Interview Prep Pro",
      rating: 4.9,
      duration: "4 weeks",
      difficulty: "Intermediate",
      reason: "Essential for your internship applications",
      category: "Computer Science",
      icon: BookOpen,
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "project":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "networking":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <DashboardLayout currentPage="recommendations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Recommendations</h1>
            <p className="text-muted-foreground">Personalized suggestions to accelerate your learning</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Heart className="w-4 h-4" />
            Saved Items
          </Button>
        </div>

        {/* AI Insight Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              AI Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Based on your current progress and goals, focusing on <strong>system design</strong> and
              <strong> advanced React patterns</strong> will significantly boost your internship prospects. Your
              JavaScript skills are strong - time to level up!
            </p>
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          <Button variant="default" size="sm">
            All
          </Button>
          <Button variant="outline" size="sm">
            Courses
          </Button>
          <Button variant="outline" size="sm">
            Projects
          </Button>
          <Button variant="outline" size="sm">
            Networking
          </Button>
          <Button variant="outline" size="sm">
            High Priority
          </Button>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <rec.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">{rec.provider}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getTypeColor(rec.type)}>{rec.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{rec.description}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{rec.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{rec.duration}</span>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(rec.difficulty)}>
                      {rec.difficulty}
                    </Badge>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">
                      <strong>Why recommended:</strong> {rec.reason}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{rec.category}</Badge>
                    <Button size="sm" className="flex items-center gap-2">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
