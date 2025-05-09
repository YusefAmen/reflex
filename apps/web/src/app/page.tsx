"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, AlertCircle, Bell, LineChart, Plus } from "lucide-react";
import ProjectGrid from "@/components/projects/ProjectGrid";

export default function Home() {
  // Mock data for projects
  const projects = [
    {
      id: "project-1",
      name: "Frontend App",
      status: "Healthy",
      activity: {
        logs: 128,
        complaints: 3,
        reactions: 2,
      },
      lastActive: "2 minutes ago",
    },
    {
      id: "project-2",
      name: "Backend API",
      status: "Warning",
      activity: {
        logs: 256,
        complaints: 12,
        reactions: 5,
      },
      lastActive: "5 minutes ago",
    },
    {
      id: "project-3",
      name: "Mobile App",
      status: "Critical",
      activity: {
        logs: 512,
        complaints: 24,
        reactions: 8,
      },
      lastActive: "1 minute ago",
    },
    {
      id: "project-4",
      name: "Data Pipeline",
      status: "Healthy",
      activity: {
        logs: 64,
        complaints: 0,
        reactions: 1,
      },
      lastActive: "1 hour ago",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-10 w-64 border-r border-border bg-background p-4 hidden md:block">
        <div className="flex h-16 items-center">
          <h1 className="text-2xl font-bold text-foreground">Reflex</h1>
        </div>
        <nav className="mt-8 space-y-1">
          <Link
            href="/"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground"
          >
            <LineChart className="mr-3 h-5 w-5" />
            Projects
          </Link>
          <Link
            href="/logs"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Activity className="mr-3 h-5 w-5" />
            Logs
          </Link>
          <Link
            href="/complaints"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <AlertCircle className="mr-3 h-5 w-5" />
            Complaints
          </Link>
          <Link
            href="/reactions"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="mr-3 h-5 w-5" />
            Reactions
          </Link>
          <Link
            href="/billing"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <LineChart className="mr-3 h-5 w-5" />
            Billing
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-4 md:px-6">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="mr-4 md:hidden"
              onClick={() => {}}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {}}
              >
                <span>All Projects</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
            <Button onClick={() => {}}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <Tabs defaultValue="all" className="mt-6">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <ProjectGrid
                onProjectSelect={(id) => (window.location.href = `/${id}/logs`)}
                onCreateProject={() => {}}
              />
            </TabsContent>
            <TabsContent value="active">
              <ProjectGrid
                projects={projects
                  .filter((p) => p.status !== "Archived")
                  .map((p) => ({
                    id: p.id,
                    name: p.name,
                    description: `Project ${p.name}`,
                    metrics: {
                      logs: p.activity.logs,
                      complaints: p.activity.complaints,
                      reactions: p.activity.reactions,
                      status: p.status.toLowerCase() as
                        | "healthy"
                        | "warning"
                        | "critical",
                      lastActivity: p.lastActive,
                    },
                  }))}
                onProjectSelect={(id) => (window.location.href = `/${id}/logs`)}
                onCreateProject={() => {}}
              />
            </TabsContent>
            <TabsContent value="archived">
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No archived projects</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  You don't have any archived projects yet.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
