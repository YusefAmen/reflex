"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  BarChart2,
  MessageSquare,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface ProjectMetrics {
  logs: number;
  complaints: number;
  reactions: number;
  status: "healthy" | "warning" | "critical";
  lastActivity: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  metrics: ProjectMetrics;
}

interface ProjectGridProps {
  projects?: Project[];
  onProjectSelect?: (projectId: string) => void;
  onCreateProject?: () => void;
}

export default function ProjectGrid({
  projects = [
    {
      id: "1",
      name: "Frontend App",
      description: "Main customer-facing web application",
      metrics: {
        logs: 1243,
        complaints: 7,
        reactions: 3,
        status: "healthy",
        lastActivity: "5 minutes ago",
      },
    },
    {
      id: "2",
      name: "API Service",
      description: "Core backend API services",
      metrics: {
        logs: 5621,
        complaints: 12,
        reactions: 5,
        status: "warning",
        lastActivity: "2 minutes ago",
      },
    },
    {
      id: "3",
      name: "Data Pipeline",
      description: "ETL and data processing workflows",
      metrics: {
        logs: 892,
        complaints: 2,
        reactions: 1,
        status: "healthy",
        lastActivity: "1 hour ago",
      },
    },
    {
      id: "4",
      name: "Auth Service",
      description: "Authentication and authorization service",
      metrics: {
        logs: 421,
        complaints: 23,
        reactions: 8,
        status: "critical",
        lastActivity: "1 minute ago",
      },
    },
  ],
  onProjectSelect = () => {},
  onCreateProject = () => {},
}: ProjectGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Create New Project Card - First position */}
        <Card className="border border-dashed border-border hover:border-primary/20 hover:bg-primary/5 transition-all flex flex-col justify-center items-center p-6 group shadow-sm hover:shadow-md">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <PlusCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">New Project</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Create a new monitoring project
              </p>
            </div>
            <Button onClick={onCreateProject} className="mt-2 w-full">
              <span>Create Project</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Project Cards */}
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden border border-border bg-card hover:border-primary/20 hover:shadow-md transition-all shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-medium">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs line-clamp-1">
                    {project.description}
                  </CardDescription>
                </div>
                <div
                  className={`w-2.5 h-2.5 rounded-full ${getStatusColor(project.metrics.status)}`}
                />
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              {/* Log volume indicator */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-muted-foreground">
                    Log Volume
                  </span>
                  <span className="text-xs font-medium">
                    {project.metrics.logs}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${Math.min(100, (project.metrics.logs / 1000) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Badge variant="outline" className="text-[10px] h-5 px-1.5">
                    Created {project.metrics.lastActivity}
                  </Badge>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] h-5 px-1.5 ${project.metrics.status === "critical" ? "border-red-500/50 text-red-500" : project.metrics.status === "warning" ? "border-yellow-500/50 text-yellow-500" : "border-green-500/50 text-green-500"}`}
                >
                  {project.metrics.status.charAt(0).toUpperCase() +
                    project.metrics.status.slice(1)}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-4">
              <Button
                className="w-full"
                variant="default"
                size="sm"
                onClick={() => onProjectSelect(project.id)}
              >
                Open Dashboard
                <ExternalLink className="ml-2 h-3.5 w-3.5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
