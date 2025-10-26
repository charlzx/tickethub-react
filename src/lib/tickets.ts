import type { z } from 'zod';
import type { ticketSchema } from '@/lib/schemas';
import type { Ticket } from '@/lib/types';

const TICKETS_KEY = 'ticketapp_tickets';

// Here, we use localStorage as a mock database.
const getTicketsFromStorage = (): Ticket[] => {
  if (typeof window === 'undefined') return [];
  const ticketsJson = localStorage.getItem(TICKETS_KEY);
  // If tickets exist in storage, parse and return them. Otherwise, return an empty array.
  return ticketsJson ? JSON.parse(ticketsJson) : [];
};

const saveTicketsToStorage = (tickets: Ticket[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};

export const getTickets = async (): Promise<Ticket[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getTicketsFromStorage().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, 300);
  });
};

export const createTicket = async (data: z.infer<typeof ticketSchema>): Promise<Ticket> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tickets = getTicketsFromStorage();
      const newTicket: Ticket = {
        id: `TICK-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedTickets = [...tickets, newTicket];
      saveTicketsToStorage(updatedTickets);
      resolve(newTicket);
    }, 300);
  });
};

export const updateTicket = async (id: string, data: z.infer<typeof ticketSchema>): Promise<Ticket> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let tickets = getTicketsFromStorage();
      const ticketIndex = tickets.findIndex(t => t.id === id);
      if (ticketIndex === -1) {
        return reject(new Error("Ticket not found"));
      }
      const updatedTicket = {
        ...tickets[ticketIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      tickets[ticketIndex] = updatedTicket;
      saveTicketsToStorage(tickets);
      resolve(updatedTicket);
    }, 300);
  });
};

export const deleteTicket = async (id: string): Promise<{ success: boolean }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let tickets = getTicketsFromStorage();
      const newTickets = tickets.filter(t => t.id !== id);
      if (tickets.length === newTickets.length) {
        return reject(new Error("Ticket not found"));
      }
      saveTicketsToStorage(newTickets);
      resolve({ success: true });
    }, 300);
  });
};
