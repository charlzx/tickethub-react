
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Ticket, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

const AuthNavLinks = ({ isMobile = false, closeSheet }: { isMobile?: boolean, closeSheet: () => void }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
    closeSheet();
  };
  
  return (
    <>
      <Button variant={isMobile ? "ghost" : "secondary"} asChild className={isMobile ? "w-full justify-start" : ""}>
        <Link href="/dashboard" onClick={closeSheet}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      </Button>
      <Button variant={isMobile ? "ghost" : "secondary"} asChild className={isMobile ? "w-full justify-start" : ""}>
        <Link href="/tickets" onClick={closeSheet}>
          <Ticket className="mr-2 h-4 w-4" />
          Tickets
        </Link>
      </Button>
      <div className={isMobile ? "pt-4 mt-4 border-t border-border" : ""}>
        <Button variant={isMobile ? "ghost" : "outline"} onClick={handleLogout} className={isMobile ? "w-full justify-start items-center gap-2" : "items-center gap-2"}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );
}

const GuestNavLinks = ({ isMobile = false, closeSheet }: { isMobile?: boolean, closeSheet: () => void }) => {
  return (
    <>
      <Button variant="ghost" asChild className={isMobile ? "w-full justify-start" : ""}>
        <Link href="/login" onClick={closeSheet}>Login</Link>
      </Button>
      <Button asChild className={isMobile ? "w-full" : ""}>
        <Link href="/signup" onClick={closeSheet}>Get Started</Link>
      </Button>
    </>
  )
}

export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // Don't render header on protected routes for desktop
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/tickets');
  if (user && !isMobile && isProtectedRoute) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <Ticket className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">TicketHub</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2">
          {user ? <AuthNavLinks closeSheet={() => {}} /> : <GuestNavLinks closeSheet={() => {}} />}
        </div>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-16 w-[80%]">
              <nav className="flex flex-col gap-4">
                {user ? <AuthNavLinks isMobile closeSheet={() => setSheetOpen(false)} /> : <GuestNavLinks isMobile closeSheet={() => setSheetOpen(false)}/>}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
