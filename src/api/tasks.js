// src/apis/tasks.js
let tasks = [
  {
    id: "1",
    title: "Finish project report",
    description: "Complete the quarterly report for the team",
    status: "in_progress",
    priority: "high",
    dueDate: "2026-06-20T00:00:00.000Z",
    createdAt: "2026-06-10T12:00:00Z",
  },
  {
    id: "2",
    title: "Review pull requests",
    description: "Check open PRs in frontend repo",
    status: "pending",
    priority: "medium",
    dueDate: "2026-06-15T00:00:00Z",
    createdAt: "2026-06-11T08:30:00Z",
  },
  {
    id: "3",
    title: "Update dependencies",
    description: "Upgrade all outdated npm packages",
    status: "completed",
    priority: "low",
    dueDate: "2026-06-12T00:00:00Z",
    createdAt: "2026-06-09T15:00:00Z",
  },
];

let activityLogs = [
  {
    id: "log1",
    taskId: "1",
    action: "created",
    timestamp: "2026-06-10T12:00:00Z",
    details: "Task created",
  },
  {
    id: "log2",
    taskId: "1",
    action: "updated",
    timestamp: "2026-06-11T09:00:00Z",
    details: "Status changed to 'in_progress'",
  },
  {
    id: "log3",
    taskId: "2",
    action: "created",
    timestamp: "2026-06-11T08:30:00Z",
    details: "Task created",
  },
  {
    id: "log4",
    taskId: "3",
    action: "completed",
    timestamp: "2026-06-12T16:00:00Z",
    details: "Task marked as completed",
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTasks = async (filters = {}) => {
  await delay(300);
  let filtered = [...tasks];
  if (filters.search) {
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.description.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  if (filters.status) {
    filtered = filtered.filter((t) => t.status === filters.status);
  }
  if (filters.priority) {
    filtered = filtered.filter((t) => t.priority === filters.priority);
  }
  return {
    success: true,
    data: filtered,
    message: "Tasks fetched",
  };
};

export const createTask = async (payload) => {
  await delay(300);
  const newTask = {
    id: String(tasks.length + 1),
    ...payload,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  activityLogs.push({
    id: `log${activityLogs.length + 1}`,
    taskId: newTask.id,
    action: "created",
    timestamp: new Date().toISOString(),
    details: "Task created",
  });
  return { success: true, data: newTask, message: "Task created" };
};

export const updateTask = async ({ id, ...payload }) => {
  await delay(300);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Task not found");
  const oldTask = tasks[index];
  tasks[index] = { ...oldTask, ...payload };
  activityLogs.push({
    id: `log${activityLogs.length + 1}`,
    taskId: id,
    action: "updated",
    timestamp: new Date().toISOString(),
    details: `Updated fields: ${Object.keys(payload).join(", ")}`,
  });
  return { success: true, data: tasks[index], message: "Task updated" };
};

export const deleteTask = async (id) => {
  await delay(300);
  tasks = tasks.filter((t) => t.id !== id);
  activityLogs.push({
    id: `log${activityLogs.length + 1}`,
    taskId: id,
    action: "deleted",
    timestamp: new Date().toISOString(),
    details: "Task deleted",
  });
  return { success: true, message: "Task deleted" };
};

export const getActivityLogs = async (params = {}) => {
  await delay(300);
  let logs = [...activityLogs];
  if (params.taskId) {
    logs = logs.filter((l) => l.taskId === params.taskId);
  }
  return { success: true, data: logs, message: "Activity logs" };
};