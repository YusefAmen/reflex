import React from "react";
import ComplaintsViewer from "@/components/complaints/ComplaintsViewer";
import { Card, CardContent } from "@/components/ui/card";

export default function ComplaintsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Complaints</h1>
          <p className="text-sm text-muted-foreground">
            View and manage user complaints and system issues
          </p>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-4">
          <ComplaintsViewer projectId={projectId} />
        </CardContent>
      </Card>
    </div>
  );
}
