"use client";
import { useState } from "react";
import { useGetTasks, useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import TaskList from "@/components/tasks/TaskList";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskStats from "@/components/tasks/TaskStats";

export default function DashboardPage() {
  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });
  const { data: tasksData, isLoading, isError, error, refetch } = useGetTasks(filters);
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const tasks = tasksData?.data || [];

  if (isLoading) return <div className="p-8 text-center">Loading tasks...</div>;
  if (isError)
    return (
      <div className="p-8 text-center">
        <p>Error loading tasks: {error.message}</p>
        <button onClick={refetch} className="underline mt-2">Retry</button>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <TaskStats tasks={tasks} />
      <TaskFilters filters={filters} onChange={setFilters} />
      {tasks.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No tasks found. Try adjusting filters.</p>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onStatusChange={(id, status) => updateTask({ id, status })}
        />
      )}
    </div>
  );
}