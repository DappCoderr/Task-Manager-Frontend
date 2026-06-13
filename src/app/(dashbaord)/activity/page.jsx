"use client";
import { useActivityLogs } from "@/hooks/useTasks";
import ActivityLogTable from "@/components/activity/ActivityLogTable";

export default function ActivityPage() {
  const { data, isLoading, isError, error, refetch } = useActivityLogs();
  const logs = data?.data || [];

  if (isLoading) return <div className="p-8 text-center">Loading activity...</div>;
  if (isError)
    return (
      <div className="p-8 text-center">
        <p>Error: {error.message}</p>
        <button onClick={refetch} className="underline">Retry</button>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>
      <ActivityLogTable logs={logs} />
    </div>
  );
}