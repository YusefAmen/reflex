"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Download,
  ChevronDown,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "debug";
  source: string;
  message: string;
  data: Record<string, any>;
}

interface LogsViewerProps {
  projectId?: string;
}

const LogsViewer = ({ projectId = "default-project" }: LogsViewerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState<Date | undefined>(new Date());
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});

  // Mock data for UI scaffolding
  const mockLogs: LogEntry[] = [
    {
      id: "1",
      timestamp: "2023-05-15T14:32:10Z",
      level: "info",
      source: "api",
      message: "User login successful",
      data: { userId: "user-123", ip: "192.168.1.1", userAgent: "Mozilla/5.0" },
    },
    {
      id: "2",
      timestamp: "2023-05-15T14:30:05Z",
      level: "error",
      source: "database",
      message: "Connection timeout",
      data: { attempt: 3, database: "users", error: "ETIMEDOUT" },
    },
    {
      id: "3",
      timestamp: "2023-05-15T14:28:30Z",
      level: "warning",
      source: "api",
      message: "Rate limit approaching",
      data: { endpoint: "/api/data", current: 950, limit: 1000 },
    },
    {
      id: "4",
      timestamp: "2023-05-15T14:25:12Z",
      level: "debug",
      source: "frontend",
      message: "Component rendered",
      data: { component: "UserDashboard", renderTime: "120ms" },
    },
    {
      id: "5",
      timestamp: "2023-05-15T14:20:45Z",
      level: "info",
      source: "system",
      message: "Scheduled task completed",
      data: { task: "database-backup", duration: "45s" },
    },
  ];

  const toggleLogExpansion = (logId: string) => {
    setExpandedLogs((prev) => ({
      ...prev,
      [logId]: !prev[logId],
    }));
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "MMM dd, yyyy HH:mm:ss");
    } catch (e) {
      return timestamp;
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "error":
        return "destructive";
      case "warning":
        return "warning";
      case "info":
        return "secondary";
      case "debug":
        return "outline";
      default:
        return "default";
    }
  };

  // Extract metadata tags from log data
  const getMetadataTags = (data: Record<string, any>) => {
    const tags = [];
    if (data.error) tags.push({ label: data.error, type: "error" });
    if (data.endpoint) tags.push({ label: data.endpoint, type: "endpoint" });
    if (data.component) tags.push({ label: data.component, type: "component" });
    if (data.task) tags.push({ label: data.task, type: "task" });
    return tags;
  };

  return (
    <div className="bg-background w-full h-full flex flex-col space-y-2">
      {/* Horizontal Filter Bar - Sentry Style */}
      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md border border-border sticky top-0 z-10">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>

        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="h-8 text-xs w-[100px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="debug">Debug</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSource} onValueChange={setSelectedSource}>
          <SelectTrigger className="h-8 text-xs w-[100px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="api">API</SelectItem>
            <SelectItem value="database">Database</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Calendar className="mr-1 h-3 w-3" />
              {timeRange ? format(timeRange, "MMM dd") : "Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={timeRange}
              onSelect={setTimeRange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="flex ml-auto gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Filter className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <RefreshCw className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Compact Logs Table */}
      <Card className="overflow-hidden border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[120px] py-2 text-xs font-medium">
                  Timestamp
                </TableHead>
                <TableHead className="w-[80px] py-2 text-xs font-medium">
                  Level
                </TableHead>
                <TableHead className="w-[100px] py-2 text-xs font-medium">
                  Source
                </TableHead>
                <TableHead className="py-2 text-xs font-medium">
                  Message
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-muted/30 border-b border-border/50"
                    onClick={() => toggleLogExpansion(log.id)}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground py-1.5 text-right">
                      {formatTimestamp(log.timestamp)}
                    </TableCell>
                    <TableCell className="py-1.5">
                      <Badge
                        variant={getLevelBadgeColor(log.level) as any}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {log.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-1.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 bg-muted/30"
                      >
                        {log.source}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-1.5 flex items-center gap-2">
                      {expandedLogs[log.id] ? (
                        <ChevronDown className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                      )}
                      <span className="text-sm">{log.message}</span>
                      {/* Pill-style metadata tags */}
                      {log.data && log.data.error && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 bg-destructive/10 text-destructive border-destructive/20"
                        >
                          {log.data.error}
                        </Badge>
                      )}
                      {log.data && log.data.endpoint && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 bg-muted/30"
                        >
                          {log.data.endpoint}
                        </Badge>
                      )}
                      {log.data && log.data.component && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 bg-muted/30"
                        >
                          {log.data.component}
                        </Badge>
                      )}
                      {log.data && log.data.task && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 bg-muted/30"
                        >
                          {log.data.task}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedLogs[log.id] && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="bg-muted/10 p-0 border-b border-border/50"
                      >
                        <div className="p-3">
                          <pre className="bg-muted/20 p-3 rounded-md overflow-auto text-xs font-mono">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogsViewer;
