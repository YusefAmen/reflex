"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  AlertCircle,
  MessageSquare,
  Users,
  Code,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ComplaintCluster {
  id: string;
  title: string;
  count: number;
  severity: "low" | "medium" | "high" | "critical";
  lastOccurred: string;
  source: string;
  details?: string;
  affectedUsers?: number;
  status?: "open" | "investigating" | "resolved";
}

interface ComplaintsViewerProps {
  projectId?: string;
}

const ComplaintsViewer = ({
  projectId = "default-project",
}: ComplaintsViewerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [expandedComplaints, setExpandedComplaints] = useState<
    Record<string, boolean>
  >({});

  // Mock data for UI scaffolding
  const mockComplaintClusters: ComplaintCluster[] = [
    {
      id: "c1",
      title: "Button click not registering",
      count: 4,
      severity: "medium",
      lastOccurred: "10 minutes ago",
      source: "user-feedback",
      details:
        "Users report that the save button in the profile editor doesn't respond to clicks sometimes.",
      affectedUsers: 4,
      status: "investigating",
    },
    {
      id: "c2",
      title: "Page load time exceeds threshold",
      count: 3,
      severity: "high",
      lastOccurred: "25 minutes ago",
      source: "monitoring",
      details:
        "Dashboard page consistently loads in >3s, exceeding the 1.5s threshold.",
      affectedUsers: 120,
      status: "open",
    },
    {
      id: "c3",
      title: "API rate limit exceeded",
      count: 8,
      severity: "critical",
      lastOccurred: "5 minutes ago",
      source: "system",
      details: "Multiple users hitting rate limits on the /api/data endpoint.",
      affectedUsers: 23,
      status: "investigating",
    },
    {
      id: "c4",
      title: "Slow response time on /users endpoint",
      count: 4,
      severity: "medium",
      lastOccurred: "15 minutes ago",
      source: "monitoring",
      details:
        "The /users endpoint is responding in >500ms, above the 200ms threshold.",
      affectedUsers: 85,
      status: "open",
    },
    {
      id: "c5",
      title: "ETL job timeout",
      count: 2,
      severity: "low",
      lastOccurred: "2 hours ago",
      source: "system",
      details: "The nightly data import job timed out after 30 minutes.",
      affectedUsers: 0,
      status: "resolved",
    },
    {
      id: "c6",
      title: "Failed login attempts",
      count: 15,
      severity: "critical",
      lastOccurred: "2 minutes ago",
      source: "security",
      details: "Multiple failed login attempts from the same IP addresses.",
      affectedUsers: 3,
      status: "investigating",
    },
  ];

  const toggleComplaintExpansion = (complaintId: string) => {
    setExpandedComplaints((prev) => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-4 border-l-red-500 bg-red-500/10";
      case "high":
        return "border-l-4 border-l-orange-500 bg-orange-500/10";
      case "medium":
        return "border-l-4 border-l-yellow-500 bg-yellow-500/10";
      case "low":
        return "border-l-4 border-l-blue-500 bg-blue-500/10";
      default:
        return "border-l-4 border-l-gray-500 bg-gray-500/10";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-700 border-red-300";
      case "high":
        return "bg-orange-500/20 text-orange-700 border-orange-300";
      case "medium":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-300";
      case "low":
        return "bg-blue-500/20 text-blue-700 border-blue-300";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-300";
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "user-feedback":
        return <Users className="h-3 w-3" />;
      case "monitoring":
        return <AlertCircle className="h-3 w-3" />;
      case "system":
        return <Code className="h-3 w-3" />;
      case "security":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/20 text-blue-700 border-blue-300";
      case "investigating":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-300";
      case "resolved":
        return "bg-green-500/20 text-green-700 border-green-300";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-300";
    }
  };

  const filteredComplaints = mockComplaintClusters.filter(
    (complaint) =>
      (selectedSeverity === "all" || complaint.severity === selectedSeverity) &&
      (searchQuery === "" ||
        complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.source.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="bg-background w-full h-full flex flex-col space-y-4">
      {/* Filter Controls */}
      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md border border-border sticky top-0 z-10">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>

        <Tabs defaultValue="all" className="h-8">
          <TabsList className="h-8 bg-muted/50">
            <TabsTrigger value="all" className="text-xs h-7 px-3">
              All
            </TabsTrigger>
            <TabsTrigger value="critical" className="text-xs h-7 px-3">
              Critical
            </TabsTrigger>
            <TabsTrigger value="high" className="text-xs h-7 px-3">
              High
            </TabsTrigger>
            <TabsTrigger value="medium" className="text-xs h-7 px-3">
              Medium
            </TabsTrigger>
            <TabsTrigger value="low" className="text-xs h-7 px-3">
              Low
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex ml-auto gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Filter className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Complaints Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredComplaints.map((complaint) => (
          <Card
            key={complaint.id}
            className={`overflow-hidden hover:shadow-md transition-all cursor-pointer ${getSeverityColor(complaint.severity)}`}
            onClick={() => toggleComplaintExpansion(complaint.id)}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-medium">
                  {complaint.title}
                </CardTitle>
                <Badge
                  className={`ml-2 text-xs ${getSeverityBadge(complaint.severity)}`}
                >
                  {complaint.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-xs py-0"
                  >
                    {getSourceIcon(complaint.source)}
                    <span>{complaint.source}</span>
                  </Badge>
                  <Badge variant="outline" className="text-xs py-0">
                    {complaint.count} occurrences
                  </Badge>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs py-0 text-muted-foreground"
                >
                  {complaint.lastOccurred}
                </Badge>
              </div>

              {expandedComplaints[complaint.id] && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-sm mb-3">{complaint.details}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs py-0">
                      {complaint.affectedUsers} affected users
                    </Badge>
                    {complaint.status && (
                      <Badge
                        className={`text-xs ${getStatusBadge(complaint.status)}`}
                      >
                        {complaint.status}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsViewer;
