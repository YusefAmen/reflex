import React from "react";
import ReactionsBuilder from "@/components/reactions/ReactionsBuilder";
import { Card, CardContent } from "@/components/ui/card";

export default function ReactionsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;

  // Mock initial rules
  const initialRules = [
    {
      id: "r1",
      event: "pageLoadFail",
      threshold: 5,
      timeWindow: "10m",
      action: "slack-alert",
      enabled: true,
    },
    {
      id: "r2",
      event: "apiError",
      threshold: 10,
      timeWindow: "5m",
      action: "pagerduty-alert",
      enabled: true,
    },
    {
      id: "r3",
      event: "loginFailure",
      threshold: 10,
      timeWindow: "5m",
      action: "slack-alert",
      enabled: true,
    },
  ];

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Reactions</h1>
          <p className="text-sm text-muted-foreground">
            Configure automated reactions to events
          </p>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-4">
          <ReactionsBuilder projectId={projectId} initialRules={initialRules} />
        </CardContent>
      </Card>
    </div>
  );
}
