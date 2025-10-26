
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Ticket } from "@/lib/types"

interface TicketStatusChartProps {
  tickets: Ticket[];
}

export function TicketStatusChart({ tickets }: TicketStatusChartProps) {
  const chartData = React.useMemo(() => {
    const statusCounts = {
      open: 0,
      in_progress: 0,
      closed: 0,
    };

    tickets.forEach(ticket => {
      statusCounts[ticket.status]++;
    });

    return [
      { name: "Open", count: statusCounts.open, fill: "var(--color-open)" },
      { name: "In Progress", count: statusCounts.in_progress, fill: "var(--color-in_progress)" },
      { name: "Closed", count: statusCounts.closed, fill: "var(--color-closed)" },
    ];
  }, [tickets]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <style>{`
          :root {
            --color-open: hsl(var(--chart-2));
            --color-in_progress: hsl(var(--chart-4));
            --color-closed: hsl(var(--chart-1));
          }
        `}</style>
      <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Status
                      </span>
                      <span className="font-bold text-foreground">
                        {payload[0].payload.name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Tickets
                      </span>
                      <span className="font-bold text-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

