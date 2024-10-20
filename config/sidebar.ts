import { Home, ShoppingCart, Package, Users, LineChart } from "lucide-react";

// Define the structure for a menu item
interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: MenuItem[]; // Optional submenu
}

// Export the array of menu items
export const menuItems: MenuItem[] = [
  {
    title: "Events",
    href: "/events",
    icon: Home,
  },
  {
    title: "Feedback",
    href: "/feedback",
    icon: ShoppingCart,
  }, 
];
