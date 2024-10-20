"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { menuItems } from "@/config/sidebar";
import { usePathname } from "next/navigation"; // Import usePathname


export default function MobileSidebar() {
  const pathname = usePathname(); // Get the current pathname

    return (
        <Sheet modal>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex  py-4 px-2 flex-col">
                <nav className="grid gap-1 text-lg pt-6 text-[12px]">
                    {menuItems.map((item) => (
                        <div key={item.title}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 h-[38px] transition-all ${pathname === item.href
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
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname === subItem.href
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
            </SheetContent>
        </Sheet>
    );
}
