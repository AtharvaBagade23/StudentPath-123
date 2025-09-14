"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Lightbulb, BookOpen, Target, MessageCircle, Sparkles, Clock } from "lucide-react"
import { useState } from "react"

export default function AIAssistantPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hi Priya! I'm your AI learning assistant. I can help you with course recommendations, study planning, career guidance, and answering academic questions. What would you like to know?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      type: "user",
      content: "Can you help me prepare for my upcoming data structures exam?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      type: "assistant",
      content:
        "Based on your current progress, I recommend focusing on these key areas: 1) Trees and Graph algorithms (you're at 65%), 2) Dynamic Programming concepts, and 3) Time complexity analysis. Would you like me to create a personalized study schedule?",
      timestamp: "10:33 AM",
    },
  ])

  const quickActions = [
    {
      icon: BookOpen,
      title: "Study Plan",
      description: "Create a personalized study schedule",
      action: "Create study plan for my current courses",
    },
    {
      icon: Target,
      title: "Career Guidance",
      description: "Get advice on career paths",
      action: "What career paths suit my current skills?",
    },
    {
      icon: Lightbulb,
      title: "Course Recommendations",
      description: "Find relevant courses to take",
      action: "Recommend courses for next semester",
    },
    {
      icon: Sparkles,
      title: "Skill Assessment",
      description: "Evaluate your current abilities",
      action: "Assess my programming skills and suggest improvements",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "assistant" as const,
          content:
            "I understand your question. Let me analyze your current progress and provide personalized recommendations...",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleQuickAction = (action: string) => {
    setMessage(action)
  }

  return (
    <DashboardLayout currentPage="assistant">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
            <p className="text-muted-foreground">Your personal learning companion powered by AI</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Online
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Chat with AI Assistant
                </CardTitle>
                <CardDescription>
                  Ask questions about your studies, career, or get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your studies..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks I can help you with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-3 bg-transparent"
                      onClick={() => handleQuickAction(action.action)}
                    >
                      <div className="flex items-start gap-3">
                        <action.icon className="w-5 h-5 text-primary mt-0.5" />
                        <div className="text-left">
                          <p className="font-medium">{action.title}</p>
                          <p className="text-xs text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  What I Can Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Personalized study recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Career path guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Course selection advice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Skill gap analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Academic question answering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Progress tracking insights</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-2 bg-muted/50 rounded">
                    <p className="font-medium">Study Schedule Creation</p>
                    <p className="text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <p className="font-medium">React vs Vue Comparison</p>
                    <p className="text-muted-foreground">Yesterday</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <p className="font-medium">Internship Preparation</p>
                    <p className="text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
