"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import DashboardLayout from "@/components/dashboard-layout"
import {
  Search,
  Grid3X3,
  List,
  Calendar,
  Plus,
  Download,
  MoreHorizontal,
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  GraduationCap,
  Target,
  BarChart3,
} from "lucide-react"

// Mock data for courses
const mockCourses = [
  {
    id: "cs301",
    code: "CS301",
    name: "Data Structures and Algorithms",
    semester: 3,
    credits: 4,
    status: "in-progress",
    progress: 85,
    grade: "A",
    instructor: "Dr. Rajesh Kumar",
    schedule: "Mon, Wed, Fri 10:00-11:00",
    prerequisites: ["CS201", "MA201"],
    skills: ["Problem Solving", "Algorithms", "Data Structures"],
    description: "Comprehensive study of fundamental data structures and algorithms",
    difficulty: "medium",
    lastUpdated: "2 hours ago",
  },
  {
    id: "cs302",
    code: "CS302",
    name: "Database Management Systems",
    semester: 3,
    credits: 3,
    status: "in-progress",
    progress: 72,
    grade: "A-",
    instructor: "Prof. Anita Sharma",
    schedule: "Tue, Thu 2:00-3:30",
    prerequisites: ["CS201"],
    skills: ["SQL", "Database Design", "DBMS"],
    description: "Introduction to database concepts, design, and implementation",
    difficulty: "medium",
    lastUpdated: "1 day ago",
  },
  {
    id: "cs303",
    code: "CS303",
    name: "Computer Networks",
    semester: 3,
    credits: 4,
    status: "in-progress",
    progress: 60,
    grade: "B+",
    instructor: "Dr. Vikram Singh",
    schedule: "Mon, Wed 2:00-3:30",
    prerequisites: ["CS202"],
    skills: ["Networking", "Protocols", "Security"],
    description: "Study of computer network architectures and protocols",
    difficulty: "hard",
    lastUpdated: "3 days ago",
  },
  {
    id: "ma301",
    code: "MA301",
    name: "Discrete Mathematics",
    semester: 3,
    credits: 3,
    status: "in-progress",
    progress: 90,
    grade: "A+",
    instructor: "Dr. Priya Gupta",
    schedule: "Tue, Thu 10:00-11:30",
    prerequisites: ["MA201"],
    skills: ["Logic", "Set Theory", "Graph Theory"],
    description: "Mathematical foundations for computer science",
    difficulty: "medium",
    lastUpdated: "5 hours ago",
  },
  {
    id: "cs201",
    code: "CS201",
    name: "Programming Fundamentals",
    semester: 2,
    credits: 4,
    status: "completed",
    progress: 100,
    grade: "A",
    instructor: "Prof. Suresh Patel",
    schedule: "Completed",
    prerequisites: [],
    skills: ["Programming", "C++", "Problem Solving"],
    description: "Introduction to programming concepts and C++",
    difficulty: "easy",
    lastUpdated: "2 months ago",
  },
  {
    id: "cs401",
    code: "CS401",
    name: "Machine Learning",
    semester: 4,
    credits: 4,
    status: "not-started",
    progress: 0,
    grade: "-",
    instructor: "Dr. Amit Verma",
    schedule: "Not Started",
    prerequisites: ["CS301", "MA301"],
    skills: ["Machine Learning", "Python", "Statistics"],
    description: "Introduction to machine learning algorithms and applications",
    difficulty: "hard",
    lastUpdated: "Not started",
  },
]

const semesterPlan = {
  1: ["CS101", "MA101", "PH101", "CH101", "EN101"],
  2: ["CS201", "CS202", "MA201", "PH201", "EN201"],
  3: ["CS301", "CS302", "CS303", "MA301", "HU301"],
  4: ["CS401", "CS402", "CS403", "CS404", "HU401"],
  5: ["CS501", "CS502", "CS503", "EL501", "MG501"],
  6: ["CS601", "CS602", "CS603", "EL601", "MG601"],
  7: ["CS701", "CS702", "PR701", "EL701", "MG701"],
  8: ["CS801", "PR801", "PR802", "EL801", "MG801"],
}

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "timeline">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [sortBy, setSortBy] = useState("alphabetical")
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [showCourseDetail, setShowCourseDetail] = useState(false)
  const [showPlanningView, setShowPlanningView] = useState(false)

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    const matchesSemester = semesterFilter === "all" || course.semester.toString() === semesterFilter
    const matchesDifficulty = difficultyFilter === "all" || course.difficulty === difficultyFilter

    return matchesSearch && matchesStatus && matchesSemester && matchesDifficulty
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.name.localeCompare(b.name)
      case "semester":
        return a.semester - b.semester
      case "credits":
        return b.credits - a.credits
      case "grade":
        return a.grade.localeCompare(b.grade)
      case "progress":
        return b.progress - a.progress
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "not-started":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "not-started":
        return <AlertCircle className="w-4 h-4" />
      case "failed":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "hard":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  const handleSelectAll = () => {
    if (selectedCourses.length === sortedCourses.length) {
      setSelectedCourses([])
    } else {
      setSelectedCourses(sortedCourses.map((course) => course.id))
    }
  }

  const openCourseDetail = (courseId: string) => {
    setSelectedCourse(courseId)
    setShowCourseDetail(true)
  }

  const selectedCourseData = mockCourses.find((course) => course.id === selectedCourse)

  return (
    <DashboardLayout currentPage="courses">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
            <p className="text-muted-foreground">
              {mockCourses.length} courses • {mockCourses.filter((c) => c.status === "completed").length} completed
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setShowPlanningView(true)}>
              <Calendar className="w-4 h-4 mr-2" />
              Plan Semester
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Grade
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulty</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="semester">Semester</SelectItem>
                    <SelectItem value="credits">Credits</SelectItem>
                    <SelectItem value="grade">Grade</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "timeline" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("timeline")}
                >
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedCourses.length > 0 && (
              <div className="flex items-center justify-between mt-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedCourses.length === sortedCourses.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm font-medium">
                    {selectedCourses.length} course{selectedCourses.length !== 1 ? "s" : ""} selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Mark Complete
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Grades
                  </Button>
                  <Button variant="outline" size="sm">
                    Export Selected
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Course Content */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedCourses.includes(course.id)}
                        onCheckedChange={() => handleCourseSelect(course.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Badge variant="secondary">{course.code}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge className={getStatusColor(course.status)}>
                        {getStatusIcon(course.status)}
                        <span className="ml-1 capitalize">{course.status.replace("-", " ")}</span>
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription>
                    Semester {course.semester} • {course.credits} Credits • {course.instructor}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{course.grade}</span>
                      </div>
                      <span className={`text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">Updated {course.lastUpdated}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            openCourseDetail(course.id)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">
                        <Checkbox
                          checked={selectedCourses.length === sortedCourses.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-4">Course</th>
                      <th className="text-left p-4">Semester</th>
                      <th className="text-left p-4">Credits</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Grade</th>
                      <th className="text-left p-4">Progress</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCourses.map((course) => (
                      <tr key={course.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <Checkbox
                            checked={selectedCourses.includes(course.id)}
                            onCheckedChange={() => handleCourseSelect(course.id)}
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{course.code}</Badge>
                              <span className="font-medium">{course.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
                          </div>
                        </td>
                        <td className="p-4">{course.semester}</td>
                        <td className="p-4">{course.credits}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(course.status)}>
                            {getStatusIcon(course.status)}
                            <span className="ml-1 capitalize">{course.status.replace("-", " ")}</span>
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">{course.grade}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Progress value={course.progress} className="w-20" />
                            <span className="text-sm">{course.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => openCourseDetail(course.id)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {viewMode === "timeline" && (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => {
              const semesterCourses = sortedCourses.filter((course) => course.semester === semester)
              if (semesterCourses.length === 0) return null

              return (
                <Card key={semester}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Semester {semester}
                    </CardTitle>
                    <CardDescription>
                      {semesterCourses.length} courses •{" "}
                      {semesterCourses.reduce((acc, course) => acc + course.credits, 0)} credits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {semesterCourses.map((course) => (
                        <div key={course.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{course.code}</Badge>
                            <Badge className={getStatusColor(course.status)}>{getStatusIcon(course.status)}</Badge>
                          </div>
                          <h4 className="font-medium mb-2">{course.name}</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} />
                            <div className="flex items-center justify-between text-sm">
                              <span>Grade</span>
                              <span className="font-medium">{course.grade}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall GPA</span>
                  <span className="text-2xl font-bold text-primary">8.2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Courses Completed</span>
                  <span className="text-lg font-semibold">
                    {mockCourses.filter((c) => c.status === "completed").length}/{mockCourses.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Credits Earned</span>
                  <span className="text-lg font-semibold">
                    {mockCourses
                      .filter((c) => c.status === "completed")
                      .reduce((acc, course) => acc + course.credits, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Progress</span>
                  <span className="text-lg font-semibold">
                    {Math.round(mockCourses.reduce((acc, course) => acc + course.progress, 0) / mockCourses.length)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Goal Alignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Software Engineering Path</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Technical Skills</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Industry Readiness</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  View Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Detail Modal */}
      <Dialog open={showCourseDetail} onOpenChange={setShowCourseDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCourseData && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="flex items-center gap-2">
                      <Badge variant="secondary">{selectedCourseData.code}</Badge>
                      {selectedCourseData.name}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedCourseData.instructor} • Semester {selectedCourseData.semester} •{" "}
                      {selectedCourseData.credits} Credits
                    </DialogDescription>
                  </div>
                  <Badge className={getStatusColor(selectedCourseData.status)}>
                    {getStatusIcon(selectedCourseData.status)}
                    <span className="ml-1 capitalize">{selectedCourseData.status.replace("-", " ")}</span>
                  </Badge>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="skills">Skills & Goals</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">Course Description</h3>
                      <p className="text-muted-foreground mb-4">{selectedCourseData.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Course Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Schedule:</span>
                              <span>{selectedCourseData.schedule}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Difficulty:</span>
                              <span className={getDifficultyColor(selectedCourseData.difficulty)}>
                                {selectedCourseData.difficulty}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Current Grade:</span>
                              <span className="font-medium">{selectedCourseData.grade}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Prerequisites</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedCourseData.prerequisites.map((prereq, index) => (
                              <Badge key={index} variant="outline">
                                {prereq}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">Overall Progress</h3>
                            <span className="text-2xl font-bold text-primary">{selectedCourseData.progress}%</span>
                          </div>
                          <Progress value={selectedCourseData.progress} className="h-3" />
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Assessment Breakdown</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded">
                              <div>
                                <span className="font-medium">Assignment 1</span>
                                <p className="text-sm text-muted-foreground">Data Structures Implementation</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline">A</Badge>
                                <p className="text-sm text-muted-foreground">Due: Oct 15</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded">
                              <div>
                                <span className="font-medium">Mid-term Exam</span>
                                <p className="text-sm text-muted-foreground">Algorithms and Complexity</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline">A-</Badge>
                                <p className="text-sm text-muted-foreground">Completed</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded">
                              <div>
                                <span className="font-medium">Final Project</span>
                                <p className="text-sm text-muted-foreground">Algorithm Visualization Tool</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary">In Progress</Badge>
                                <p className="text-sm text-muted-foreground">Due: Dec 20</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold mb-3">Skills Developed</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedCourseData.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Career Goal Alignment</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">Software Engineer Path</span>
                                <span className="text-sm font-medium">92%</span>
                              </div>
                              <Progress value={92} />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">Algorithm Specialist</span>
                                <span className="text-sm font-medium">88%</span>
                              </div>
                              <Progress value={88} />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Related Learning Paths</h4>
                          <div className="space-y-2">
                            <div className="p-3 border rounded">
                              <span className="font-medium">Advanced Algorithms</span>
                              <p className="text-sm text-muted-foreground">Next recommended course</p>
                            </div>
                            <div className="p-3 border rounded">
                              <span className="font-medium">System Design</span>
                              <p className="text-sm text-muted-foreground">Complementary skill</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold mb-3">Course Materials</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 border rounded">
                              <div className="flex items-center gap-3">
                                <BookOpen className="w-4 h-4" />
                                <span>Introduction to Algorithms (CLRS)</span>
                              </div>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded">
                              <div className="flex items-center gap-3">
                                <BookOpen className="w-4 h-4" />
                                <span>Lecture Slides - Week 1-8</span>
                              </div>
                              <Button variant="outline" size="sm">
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Recommended Resources</h4>
                          <div className="space-y-2">
                            <div className="p-3 border rounded">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium">LeetCode Algorithm Practice</span>
                                  <p className="text-sm text-muted-foreground">External platform</p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Visit
                                </Button>
                              </div>
                            </div>
                            <div className="p-3 border rounded">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium">Visualgo - Algorithm Visualizations</span>
                                  <p className="text-sm text-muted-foreground">Interactive learning</p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Visit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="study-plan" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold mb-3">Personal Study Schedule</h3>
                          <div className="space-y-3">
                            <div className="p-3 border rounded">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Weekly Study Goal</span>
                                <span className="text-sm">8 hours</span>
                              </div>
                              <Progress value={75} className="mt-2" />
                              <p className="text-xs text-muted-foreground mt-1">6/8 hours completed this week</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Study Milestones</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 border rounded">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <div className="flex-1">
                                <span className="font-medium">Complete Chapter 1-4</span>
                                <p className="text-sm text-muted-foreground">Basic data structures</p>
                              </div>
                              <span className="text-sm text-green-600">Completed</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <div className="flex-1">
                                <span className="font-medium">Master Sorting Algorithms</span>
                                <p className="text-sm text-muted-foreground">Chapter 5-7</p>
                              </div>
                              <span className="text-sm text-blue-600">In Progress</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded">
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                              <div className="flex-1">
                                <span className="font-medium">Graph Algorithms</span>
                                <p className="text-sm text-muted-foreground">Chapter 8-10</p>
                              </div>
                              <span className="text-sm text-gray-600">Upcoming</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Add Study Goal</h4>
                          <div className="space-y-3">
                            <Input placeholder="Goal title" />
                            <Textarea placeholder="Description" />
                            <div className="flex gap-2">
                              <Button size="sm">Add Goal</Button>
                              <Button variant="outline" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Semester Planning Modal */}
      <Dialog open={showPlanningView} onOpenChange={setShowPlanningView}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>4-Year Degree Planning</DialogTitle>
            <DialogDescription>Plan your course schedule across all semesters</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(semesterPlan).map(([semester, courses]) => (
              <Card key={semester}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Semester {semester}</CardTitle>
                  <CardDescription>
                    {courses.length} courses • {courses.length * 3} credits (avg)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {courses.map((courseCode, index) => {
                      const courseData = mockCourses.find((c) => c.code === courseCode)
                      return (
                        <div
                          key={index}
                          className={`p-2 border rounded text-sm ${
                            courseData
                              ? courseData.status === "completed"
                                ? "bg-green-50 border-green-200"
                                : courseData.status === "in-progress"
                                  ? "bg-blue-50 border-blue-200"
                                  : "bg-gray-50 border-gray-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="font-medium">{courseCode}</div>
                          {courseData && (
                            <div className="text-xs text-muted-foreground truncate">{courseData.name}</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-200 rounded"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <span>Planned</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Reset Plan</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
