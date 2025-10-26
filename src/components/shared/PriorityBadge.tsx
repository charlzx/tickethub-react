"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TicketPriority } from "@/lib/types";
import { ArrowUp, ArrowRight, ArrowDown, HelpCircle } from "lucide-react";

type PriorityBadgeProps = {
  priority: TicketPriority;
  className?: string;
};

const priorityStyles: Record<TicketPriority, { icon: React.ReactNode, className: string }> = {
  high: {
    icon: <ArrowUp className="h-3 w-3 mr-1" />,
    className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
  },
  medium: {
    icon: <ArrowRight className="h-3 w-3 mr-1" />,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  },
  low: {
    icon: <ArrowDown className="h-3 w-3 mr-1" />,
    className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  if (!priority || !priorityStyles[priority]) {
    return (
        <Badge variant="outline" className={cn("capitalize", "bg-gray-100 text-gray-800 border-gray-200", className)}>
            <HelpCircle className="h-3 w-3 mr-1" />
            Unknown
        </Badge>
    );
  }
  const style = priorityStyles[priority];
  return (
    <Badge variant="outline" className={cn("capitalize", style.className, className)}>
      {style.icon}
      {priority}
    </Badge>
  );
}
