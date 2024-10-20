"use client";

import Link from "next/link";
import { Package2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/config/sidebar";
import { usePathname } from "next/navigation"; // Import usePathname

export default function DesktopSidebar() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Hello 👋</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>

        <div className="flex-1">
          <nav className="grid items-start px-2 space-y-3 pt-2 text-sm font-medium lg:px-4">
            {menuItems.map((item) => (
              <div key={item.title}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    pathname === item.href
                      ? "bg-[#172c4e] text-white" // Change to your desired background color for active item
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
                {item.submenu && (
                  <div className="pl-6">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                          pathname === subItem.href
                            ? "bg-[#1d417b] text-white" // Change to your desired background color for active subitem
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <subItem.icon className="h-4 w-4" />
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
