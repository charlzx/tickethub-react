
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTickets } from "@/lib/tickets";
import type { Ticket } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { BarChart, BookOpenCheck, Ticket as TicketIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TicketStatusChart } from "@/components/tickets/TicketStatusChart";

type Stats = {
  total: number;
  open: number;
  resolved: number;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setIsLoading(true);
      try {
        const fetchedTickets: Ticket[] = await getTickets();
        setTickets(fetchedTickets);
        const total = fetchedTickets.length;
        const open = fetchedTickets.filter((t) => t.status === "open" || t.status === "in_progress").length;
        const resolved = fetchedTickets.filter((t) => t.status === "closed").length;
        setStats({ total, open, resolved });
      } catch (error) {
        console.error("Failed to fetch ticket stats:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="custom-dashboard-header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">Here&apos;s a summary of your support tickets.</p>
        </div>
        <Button asChild className="shadow-sm w-full sm:w-auto">
          <Link href="/tickets">Manage Tickets</Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <TicketIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.total}</div>
            <p className="text-xs text-muted-foreground">All tickets submitted</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <BookOpenCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.open}</div>
            <p className="text-xs text-muted-foreground">Tickets needing attention</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Tickets</CardTitle>
            <BarChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.resolved}</div>
            <p className="text-xs text-muted-foreground">Successfully closed tickets</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 mt-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Ticket Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <TicketStatusChart tickets={tickets} />
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
