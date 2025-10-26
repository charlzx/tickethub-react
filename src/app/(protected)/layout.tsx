"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, LayoutDashboard, Ticket, LogOut } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';


const MobileBottomNav = () => {
  const pathname = usePathname();
  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
        <Link href="/dashboard" className={`inline-flex flex-col items-center justify-center px-5 hover:bg-muted ${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>
          <LayoutDashboard className="w-5 h-5 mb-1" />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link href="/tickets" className={`inline-flex flex-col items-center justify-center px-5 hover:bg-muted ${pathname === '/tickets' ? 'text-primary' : 'text-muted-foreground'}`}>
          <Ticket className="w-5 h-5 mb-1" />
          <span className="text-sm ">Tickets</span>
        </Link>
      </div>
    </div>
  );
};

const UserNav = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name || 'User'} />
            <AvatarFallback>{user.name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="hidden md:flex md:flex-col bg-background border-r">
           <SidebarContent className="flex flex-col">
            <div className="p-4 flex items-center gap-2 border-b">
              <Link href="/dashboard" className="flex items-center gap-2">
                  <Ticket className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg font-headline">TicketHub</span>
              </Link>
            </div>
            <SidebarMenu className="flex-1 mt-4 space-y-2 px-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/dashboard'} className="py-5">
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/tickets'} className="py-5">
                  <Link href="/tickets">
                    <Ticket />
                    <span>Tickets</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
             <div className="mt-auto p-4 flex flex-col gap-2 border-t">
                <div className="flex items-center gap-3">
                   <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name || 'User'} />
                    <AvatarFallback>{user.name?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" onClick={handleLogout} className="w-full justify-start mt-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col w-full">
           <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between md:hidden">
              <div className="md:hidden">
                 <Link href="/dashboard" className="flex items-center gap-2">
                  <Ticket className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg font-headline">TicketHub</span>
                </Link>
              </div>
              <div className="md:hidden">
                <UserNav />
              </div>
           </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/40 pb-20 md:pb-8">
            {children}
          </main>
        </div>
      </div>
      <MobileBottomNav />
    </SidebarProvider>
  );
}
