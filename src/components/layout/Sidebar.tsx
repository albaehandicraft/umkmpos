import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  storeName?: string;
  storeLogoUrl?: string;
  userName?: string;
  userAvatarUrl?: string;
}

const Sidebar = ({
  storeName = "Toko Sejahtera",
  storeLogoUrl = "https://api.dicebear.com/7.x/initials/svg?seed=TS&backgroundColor=4f46e5",
  userName = "Budi Santoso",
  userAvatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
}: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <Home size={20} />, label: "Dashboard" },
    { path: "/cashier", icon: <ShoppingCart size={20} />, label: "Kasir" },
    { path: "/inventory", icon: <Package size={20} />, label: "Inventaris" },
    { path: "/reports", icon: <BarChart3 size={20} />, label: "Laporan" },
    { path: "/settings", icon: <Settings size={20} />, label: "Pengaturan" },
  ];

  return (
    <div className="h-full w-[250px] bg-white border-r flex flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Store Logo and Name */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={storeLogoUrl} alt={storeName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {storeName.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="font-semibold text-lg">{storeName}</div>
        </div>

        <Separator />

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <TooltipProvider key={item.path}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant={
                        location.pathname === item.path ? "default" : "ghost"
                      }
                      className={cn(
                        "w-full justify-start",
                        location.pathname === item.path
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="mt-auto">
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatarUrl} alt={userName} />
              <AvatarFallback>
                <User size={16} />
              </AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">{userName}</div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <LogOut size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Keluar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
