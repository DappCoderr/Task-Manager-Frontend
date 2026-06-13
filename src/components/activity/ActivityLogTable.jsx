import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";

export default function ActivityLogTable({ logs = [] }) {
  return (
    <Table>
      <TableCaption>A list of recent activity.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Task ID</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-mono">{log.taskId}</TableCell>
            <TableCell className="capitalize">{log.action}</TableCell>
            <TableCell>{log.details}</TableCell>
            <TableCell>{formatDate(log.timestamp)}</TableCell>
          </TableRow>
        ))}
        {logs.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No activity logs.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}