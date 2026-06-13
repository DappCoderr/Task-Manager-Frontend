"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { STATUS_MAP, STATUS_COLORS } from "@/constants/taskStatuses";

export default function TaskCard({ task, onDelete, onStatusChange }) {
  const nextStatus =
    task.status === "pending"
      ? "in_progress"
      : task.status === "in_progress"
      ? "completed"
      : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
        <Badge className={STATUS_COLORS[task.status]}>
          {STATUS_MAP[task.status]}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-3">
          <span>Due: {formatDate(task.dueDate)}</span>
          <span className="capitalize">Priority: {task.priority}</span>
        </div>
        <div className="flex gap-2">
          {nextStatus && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange(task.id, nextStatus)}
            >
              Move to {STATUS_MAP[nextStatus]}
            </Button>
          )}
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}