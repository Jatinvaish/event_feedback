"use client";

import {
  CircleUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../ModeToggle";
import DesktopSidebar from "./desktopSidebar";
import MobileSidebar from "./mobileSidebar";
import { useRouter } from "next/navigation";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const logOut = async () => {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');

    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Handle successful cookie clear
      console.log('Cookie cleared successfully');
      // Redirect or update your UI as needed
    } else {
      // Handle error
      console.error('Failed to clear cookie');
    }
    router.push('/')

  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <DesktopSidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar />
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <span className="xs:hidden">Welcome Back</span>
              </div>
            </form>
          </div>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="bg-black text-white cursor-pointer" onClick={() => logOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Here is where children content will be injected */}
        <main className="flex flex-1 flex-col p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
