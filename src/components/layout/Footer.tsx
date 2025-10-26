import Link from "next/link";
import { Ticket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="container max-w-7xl py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">TicketHub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TicketHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
