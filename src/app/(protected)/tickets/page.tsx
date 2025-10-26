
"use client";

import { TicketList } from "@/components/tickets/TicketList";
import { Button } from "@/components/ui/button";
import { TicketDialog } from "@/components/tickets/TicketDialog";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { createTicket } from "@/lib/tickets";
import { z } from "zod";
import { ticketSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TicketStatus, TicketPriority } from "@/lib/types";

// This component now acts as a trigger for a client component that manages its own state
const CreateTicketButton = ({ onNewTicketCreated }: { onNewTicketCreated: () => void }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (values: z.infer<typeof ticketSchema>) => {
    try {
      await createTicket(values);
      toast({ title: "Success", description: "Ticket created successfully." });
      setIsDialogOpen(false);
      onNewTicketCreated(); // Notify parent to reload tickets
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to create ticket." });
    }
  };

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="shadow-sm w-full sm:w-auto">Create New Ticket</Button>
      <TicketDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleFormSubmit}
      />
    </>
  );
};


export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | "all">("all");
  const [listKey, setListKey] = useState(0); 

  const handleNewTicket = useCallback(() => {
    setListKey(prev => prev + 1);
  }, []);

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="custom-ticket-header flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-headline">Ticket Management</h1>
          <p className="text-muted-foreground">View, create, and manage all support tickets.</p>
        </div>
        <CreateTicketButton onNewTicketCreated={handleNewTicket} />
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as any)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TicketList 
        key={listKey}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
      />
    </div>
  );
}
