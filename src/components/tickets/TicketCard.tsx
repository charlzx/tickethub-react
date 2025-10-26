
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import type { Ticket } from "@/lib/types";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

export function TicketCard({ ticket, onEdit, onDelete }: TicketCardProps) {
  return (
    <Card className={cn(
      "shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col",
      ticket.status === 'closed' && "opacity-60 hover:opacity-100"
    )}>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="font-headline text-lg">{ticket.title}</CardTitle>
        </div>
         <div className="flex items-center gap-2 pt-1">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>
        <CardDescription className="!mt-4">
          Last updated: {format(new Date(ticket.updatedAt), "PPP p")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {ticket.description || "No description provided."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(ticket)}>
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit Ticket</span>
        </Button>
        <Button variant="destructive" size="icon" onClick={() => onDelete(ticket)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete Ticket</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
