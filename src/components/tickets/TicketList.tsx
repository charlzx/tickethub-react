
"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { getTickets, createTicket, updateTicket, deleteTicket } from "@/lib/tickets";
import type { Ticket, TicketStatus, TicketPriority } from "@/lib/types";
import { TicketCard } from "./TicketCard";
import { TicketDialog } from "./TicketDialog";
import { DeleteTicketDialog } from "./DeleteTicketDialog";
import { useToast } from "@/hooks/use-toast";
import type { z } from "zod";
import type { ticketSchema } from "@/lib/schemas";
import { Loader2, Ticket as TicketIcon } from "lucide-react";
import { Separator } from "../ui/separator";

interface TicketListProps {
  searchTerm: string;
  statusFilter: TicketStatus | "all";
  priorityFilter: TicketPriority | "all";
}


export function TicketList({ searchTerm, statusFilter, priorityFilter }: TicketListProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { toast } = useToast();

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedTickets = await getTickets();
      setTickets(fetchedTickets);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to load tickets." });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const { activeTickets, closedTickets } = useMemo(() => {
    const filtered = tickets.filter(ticket => {
      const searchMatch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || ticket.status === statusFilter;
      const priorityMatch = priorityFilter === 'all' || ticket.priority === priorityFilter;
      return searchMatch && statusMatch && priorityMatch;
    });

    return {
      activeTickets: filtered.filter(t => t.status !== 'closed'),
      closedTickets: filtered.filter(t => t.status === 'closed'),
    }
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const handleOpenDialog = (ticket: Ticket | null = null) => {
    setSelectedTicket(ticket);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTicket(null);
  };

  const handleFormSubmit = async (values: z.infer<typeof ticketSchema>) => {
    try {
      if (selectedTicket) {
        await updateTicket(selectedTicket.id, values);
        toast({ title: "Success", description: "Ticket updated successfully." });
      } else {
        await createTicket(values);
        toast({ title: "Success", description: "Ticket created successfully." });
      }
      handleCloseDialog();
      await loadTickets();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save ticket." });
    }
  };

  const handleOpenDeleteDialog = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTicket(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTicket) return;
    setIsDeleting(true);
    try {
      await deleteTicket(selectedTicket.id);
      toast({ title: "Success", description: "Ticket deleted successfully." });
      handleCloseDeleteDialog();
      await loadTickets();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete ticket." });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      {activeTickets.length > 0 && (
        <div className="custom-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={() => handleOpenDialog(ticket)}
              onDelete={() => handleOpenDeleteDialog(ticket)}
            />
          ))}
        </div>
      )}

      {activeTickets.length > 0 && closedTickets.length > 0 && (
         <div className="relative my-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-dashed" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-muted/40 px-3 text-sm font-medium text-muted-foreground">Closed Tickets</span>
          </div>
        </div>
      )}

      {closedTickets.length > 0 && (
         <div className="custom-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {closedTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={() => handleOpenDialog(ticket)}
              onDelete={() => handleOpenDeleteDialog(ticket)}
            />
          ))}
        </div>
      )}

      {activeTickets.length === 0 && closedTickets.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <TicketIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No tickets found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Adjust your filters or create a new ticket.
          </p>
        </div>
      )}

      <TicketDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleFormSubmit}
        ticket={selectedTicket}
      />
      <DeleteTicketDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
