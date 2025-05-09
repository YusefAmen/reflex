import React from "react";
import LogsViewer from "@/components/logs/LogsViewer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LogsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Logs</h1>
          <p className="text-sm text-muted-foreground">
            View and filter logs for your project
          </p>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b border-border/50 px-4 py-2">
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="all"
                  className="text-xs data-[state=active]:bg-muted/50"
                >
                  All Logs
                </TabsTrigger>
                <TabsTrigger
                  value="errors"
                  className="text-xs data-[state=active]:bg-muted/50"
                >
                  Errors
                </TabsTrigger>
                <TabsTrigger
                  value="warnings"
                  className="text-xs data-[state=active]:bg-muted/50"
                >
                  Warnings
                </TabsTrigger>
                <TabsTrigger
                  value="info"
                  className="text-xs data-[state=active]:bg-muted/50"
                >
                  Info
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0 p-0">
              <LogsViewer projectId={projectId} logLevel="all" />
            </TabsContent>

            <TabsContent value="errors" className="mt-0 p-0">
              <LogsViewer projectId={projectId} logLevel="error" />
            </TabsContent>

            <TabsContent value="warnings" className="mt-0 p-0">
              <LogsViewer projectId={projectId} logLevel="warning" />
            </TabsContent>

            <TabsContent value="info" className="mt-0 p-0">
              <LogsViewer projectId={projectId} logLevel="info" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
