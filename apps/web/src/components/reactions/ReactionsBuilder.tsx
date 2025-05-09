"use client";

import React, { useState } from "react";
import { Plus, Trash2, Play, Save, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ReactionRule {
  id: string;
  event: string;
  threshold: number;
  timeWindow: string;
  action: string;
  enabled: boolean;
}

interface ReactionsBuilderProps {
  projectId?: string;
  initialRules?: ReactionRule[];
  onSave?: (rules: ReactionRule[]) => void;
}

const ReactionsBuilder = ({
  projectId = "default-project",
  initialRules = [],
  onSave = () => {},
}: ReactionsBuilderProps) => {
  const [rules, setRules] = useState<ReactionRule[]>(
    initialRules.length > 0
      ? initialRules
      : [
          {
            id: "new-rule-1",
            event: "",
            threshold: 5,
            timeWindow: "5m",
            action: "",
            enabled: false,
          },
        ],
  );

  // Mock data for dropdowns
  const eventOptions = [
    { value: "apiError", label: "API Error" },
    { value: "pageLoadFail", label: "Page Load Failure" },
    { value: "loginFailure", label: "Login Failure" },
    { value: "saveNoteFail", label: "Save Note Failure" },
    { value: "rateLimitExceeded", label: "Rate Limit Exceeded" },
    { value: "databaseTimeout", label: "Database Timeout" },
    { value: "memoryLeak", label: "Memory Leak Detected" },
    { value: "highCPUUsage", label: "High CPU Usage" },
  ];

  const timeWindowOptions = [
    { value: "1m", label: "1 minute" },
    { value: "5m", label: "5 minutes" },
    { value: "10m", label: "10 minutes" },
    { value: "30m", label: "30 minutes" },
    { value: "1h", label: "1 hour" },
    { value: "6h", label: "6 hours" },
    { value: "12h", label: "12 hours" },
    { value: "24h", label: "24 hours" },
  ];

  const actionOptions = [
    { value: "slack-alert", label: "Slack Alert" },
    { value: "email-alert", label: "Email Alert" },
    { value: "pagerduty-alert", label: "PagerDuty Alert" },
    { value: "webhook", label: "Webhook" },
    { value: "restart-service", label: "Restart Service" },
    { value: "scale-up", label: "Scale Up Resources" },
  ];

  const addNewRule = () => {
    setRules([
      ...rules,
      {
        id: `new-rule-${rules.length + 1}`,
        event: "",
        threshold: 5,
        timeWindow: "5m",
        action: "",
        enabled: false,
      },
    ]);
  };

  const deleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId));
  };

  const updateRule = (
    ruleId: string,
    field: keyof ReactionRule,
    value: any,
  ) => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId ? { ...rule, [field]: value } : rule,
      ),
    );
  };

  const handleSave = () => {
    onSave(rules);
  };

  const getEventLabel = (eventValue: string) => {
    const event = eventOptions.find((option) => option.value === eventValue);
    return event ? event.label : eventValue;
  };

  const getTimeWindowLabel = (timeValue: string) => {
    const time = timeWindowOptions.find((option) => option.value === timeValue);
    return time ? time.label : timeValue;
  };

  const getActionLabel = (actionValue: string) => {
    const action = actionOptions.find((option) => option.value === actionValue);
    return action ? action.label : actionValue;
  };

  return (
    <div className="bg-background w-full h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Reaction Rules</h2>
        <Button onClick={addNewRule} size="sm" className="h-8">
          <Plus className="h-4 w-4 mr-1" /> Add Rule
        </Button>
      </div>

      {rules.map((rule, index) => (
        <Card key={rule.id} className="border border-border overflow-hidden">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium flex items-center">
              Rule {index + 1}
              {rule.enabled && (
                <Badge className="ml-2 bg-green-500/20 text-green-700 border-green-300 text-xs">
                  Active
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Switch
                checked={rule.enabled}
                onCheckedChange={(checked) =>
                  updateRule(rule.id, "enabled", checked)
                }
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => deleteRule(rule.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label
                  htmlFor={`event-${rule.id}`}
                  className="text-xs mb-1 block"
                >
                  When this event occurs
                </Label>
                <Select
                  value={rule.event}
                  onValueChange={(value) => updateRule(rule.id, "event", value)}
                >
                  <SelectTrigger id={`event-${rule.id}`} className="h-9">
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor={`threshold-${rule.id}`}
                  className="text-xs mb-1 block"
                >
                  At least this many times
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id={`threshold-${rule.id}`}
                    type="number"
                    min="1"
                    value={rule.threshold}
                    onChange={(e) =>
                      updateRule(
                        rule.id,
                        "threshold",
                        parseInt(e.target.value) || 1,
                      )
                    }
                    className="h-9"
                  />
                  <span className="text-sm text-muted-foreground">times</span>
                </div>
              </div>

              <div>
                <Label
                  htmlFor={`timeWindow-${rule.id}`}
                  className="text-xs mb-1 block"
                >
                  Within this time window
                </Label>
                <Select
                  value={rule.timeWindow}
                  onValueChange={(value) =>
                    updateRule(rule.id, "timeWindow", value)
                  }
                >
                  <SelectTrigger id={`timeWindow-${rule.id}`} className="h-9">
                    <SelectValue placeholder="Select time window" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeWindowOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4">
              <Label
                htmlFor={`action-${rule.id}`}
                className="text-xs mb-1 block"
              >
                Then perform this action
              </Label>
              <Select
                value={rule.action}
                onValueChange={(value) => updateRule(rule.id, "action", value)}
              >
                <SelectTrigger id={`action-${rule.id}`} className="h-9">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  {actionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preview output */}
            {rule.event && rule.threshold && rule.timeWindow && rule.action && (
              <div className="bg-muted/30 p-3 rounded-md border border-border/50 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">
                  If{" "}
                  <span className="font-medium">
                    {getEventLabel(rule.event)}
                  </span>{" "}
                  occurs{" "}
                  <span className="font-medium">{rule.threshold} times</span> in{" "}
                  <span className="font-medium">
                    {getTimeWindowLabel(rule.timeWindow)}
                  </span>{" "}
                  →{" "}
                  <span className="font-medium">
                    {getActionLabel(rule.action)}
                  </span>
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-end gap-2 border-t border-border/50 mt-4">
            <Button variant="outline" size="sm" className="h-8">
              <Play className="h-3 w-3 mr-1" /> Test
            </Button>
          </CardFooter>
        </Card>
      ))}

      <div className="flex justify-end mt-4">
        <Button onClick={handleSave} className="flex items-center gap-1">
          <Save className="h-4 w-4" /> Save Rules
        </Button>
      </div>
    </div>
  );
};

export default ReactionsBuilder;
