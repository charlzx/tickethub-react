import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TicketStatus } from "@/lib/types";

type StatusBadgeProps = {
  status: TicketStatus;
  className?: string;
};

const statusStyles: Record<TicketStatus, string> = {
  open: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  in_progress: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
  closed: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("capitalize", statusStyles[status], className)}>
      {status.replace("_", " ")}
    </Badge>
  );
}
