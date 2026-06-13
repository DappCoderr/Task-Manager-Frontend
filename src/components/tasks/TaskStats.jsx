export default function TaskStats({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm font-medium">Total</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm font-medium text-yellow-600">Pending</p>
        <p className="text-2xl font-bold">{pending}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm font-medium text-blue-600">In Progress</p>
        <p className="text-2xl font-bold">{inProgress}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm font-medium text-green-600">Completed</p>
        <p className="text-2xl font-bold">{completed}</p>
      </div>
    </div>
  );
}