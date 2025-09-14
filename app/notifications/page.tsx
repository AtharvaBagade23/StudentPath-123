"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle2, Clock, AlertTriangle, BookOpen, Target, Award, Settings, Trash2 } from "lucide-react"
import { useState } from "react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "assignment",
      title: "Assignment Due Tomorrow",
      message: "Data Structures Assignment #3 is due tomorrow at 11:59 PM",
      time: "2 hours ago",
      read: false,
      priority: "high",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      id: 2,
      type: "course",
      title: "New Course Material Available",
      message: "Week 12 materials for Advanced Algorithms have been uploaded",
      time: "4 hours ago",
      read: false,
      priority: "medium",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      id: 3,
      type: "achievement",
      title: "Goal Milestone Reached!",
      message: "You've completed 75% of your Data Structures learning goal",
      time: "6 hours ago",
      read: true,
      priority: "low",
      icon: Target,
      color: "text-green-500",
    },
    {
      id: 4,
      type: "recommendation",
      title: "New Course Recommendation",
      message: "Based on your progress, we recommend 'System Design Fundamentals'",
      time: "1 day ago",
      read: true,
      priority: "medium",
      icon: Award,
      color: "text-purple-500",
    },
    {
      id: 5,
      type: "system",
      title: "Weekly Progress Report Ready",
      message: "Your weekly learning progress report is now available",
      time: "2 days ago",
      read: true,
      priority: "low",
      icon: CheckCircle2,
      color: "text-gray-500",
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DashboardLayout currentPage="notifications">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">Stay updated with your academic progress</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notifications.filter((n) => n.priority === "high").length}</p>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                  <p className="text-sm text-muted-foreground">Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notifications.filter((n) => n.read).length}</p>
                  <p className="text-sm text-muted-foreground">Read</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          <Button variant="default" size="sm">
            All
          </Button>
          <Button variant="outline" size="sm">
            Unread
          </Button>
          <Button variant="outline" size="sm">
            High Priority
          </Button>
          <Button variant="outline" size="sm">
            Assignments
          </Button>
          <Button variant="outline" size="sm">
            Courses
          </Button>
          <Button variant="outline" size="sm">
            Achievements
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all duration-200 hover:shadow-md ${
                !notification.read ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${!notification.read ? "bg-primary/10" : "bg-muted/50"}`}>
                    <notification.icon className={`w-5 h-5 ${notification.color}`} />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {!notification.read && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </span>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
