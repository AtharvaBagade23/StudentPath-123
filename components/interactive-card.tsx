"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface InteractiveCardProps {
  title: string
  children: React.ReactNode
  expandable?: boolean
  className?: string
  icon?: React.ReactNode
  badge?: string
  onHover?: () => void
}

export default function InteractiveCard({
  title,
  children,
  expandable = false,
  className = "",
  icon,
  badge,
  onHover,
}: InteractiveCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`
        transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
        ${isHovered ? "ring-2 ring-primary/20 shadow-xl" : ""} 
        ${className}
      `}
      onMouseEnter={() => {
        setIsHovered(true)
        onHover?.()
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && (
              <div className={`transition-all duration-200 ${isHovered ? "scale-110 text-primary" : ""}`}>{icon}</div>
            )}
            <CardTitle className="text-lg">{title}</CardTitle>
            {badge && (
              <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full animate-pulse">{badge}</span>
            )}
          </div>
          {expandable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:bg-muted/80 transition-all duration-200 hover:scale-105"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`
          transition-all duration-300 overflow-hidden
          ${expandable && !isExpanded ? "max-h-20" : "max-h-none"}
        `}
        >
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
