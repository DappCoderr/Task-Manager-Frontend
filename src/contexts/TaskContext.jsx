"use client";
import { createContext, useContext, useState, useMemo, useCallback } from "react";
import {
  useGetTasks,
  useCreateTask,
  useUpdateTask,
  useUpdateTaskStatus,
  useDeleteTask,
  useActivityLogs,
} from "@/hooks/useRegister";

const TaskContext = createContext(null);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    page: 1,
    limit: 10,
  });

  // Queries
  const {
    data: tasksResponse,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
    refetch: refetchTasks,
  } = useGetTasks(filters);

  const {
    data: activityResponse,
    isLoading: isActivityLoading,
    refetch: refetchActivity,
  } = useActivityLogs();

  // Mutations
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const updateTaskStatusMutation = useUpdateTaskStatus();
  const deleteTaskMutation = useDeleteTask();

  // Derived data
  const tasks = tasksResponse?.data || [];
  const totalTasks = tasksResponse?.total || tasks.length;
  const activityLogs = activityResponse?.data || [];

  // Task operations
  const createTask = useCallback(
    async (data) => {
      return createTaskMutation.mutateAsync(data);
    },
    [createTaskMutation]
  );

  const updateTask = useCallback(
    async (taskId, data) => {
      return updateTaskMutation.mutateAsync({ id: taskId, ...data });
    },
    [updateTaskMutation]
  );

  const updateTaskStatus = useCallback(
    async (taskId, newStatus) => {
      return updateTaskStatusMutation.mutateAsync({ taskId, newStatus });
    },
    [updateTaskStatusMutation]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      return deleteTaskMutation.mutateAsync(taskId);
    },
    [deleteTaskMutation]
  );

  const value = useMemo(
    () => ({
      // Data
      tasks,
      totalTasks,
      activityLogs,

      // Filters
      filters,
      setFilters,

      // Loading states
      isTasksLoading,
      isActivityLoading,
      isCreating: createTaskMutation.isPending,
      isUpdating: updateTaskMutation.isPending,
      isDeleting: deleteTaskMutation.isPending,

      // Error states
      isTasksError,
      tasksError,

      // Operations
      createTask,
      updateTask,
      updateTaskStatus,
      deleteTask,
      refetchTasks,
      refetchActivity,
    }),
    [
      tasks,
      totalTasks,
      activityLogs,
      filters,
      setFilters,
      isTasksLoading,
      isActivityLoading,
      createTaskMutation.isPending,
      updateTaskMutation.isPending,
      deleteTaskMutation.isPending,
      isTasksError,
      tasksError,
      createTask,
      updateTask,
      updateTaskStatus,
      deleteTask,
      refetchTasks,
      refetchActivity,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};