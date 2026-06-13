"use client";
export default function DashboardError({ error, reset }) {
  return (
    <div className="text-center p-8">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}