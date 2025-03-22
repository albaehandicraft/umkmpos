import React from "react";
import { Bell, User, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface DashboardHeaderProps {
  storeName?: string;
  notificationCount?: number;
  userName?: string;
  userAvatar?: string;
}

const DashboardHeader = ({
  storeName = "Toko Sejahtera",
  notificationCount = 3,
  userName = "Budi Santoso",
  userAvatar = "",
}: DashboardHeaderProps) => {
  // Format current date in Indonesian format
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("id-ID", options);

  return (
    <header className="w-full h-20 px-6 flex items-center justify-between bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-500">{formattedDate}</div>
        <div className="text-xl font-semibold text-gray-800">{storeName}</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari..."
            className="pl-8 h-9 w-full bg-gray-50 focus:bg-white"
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifikasi</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center space-x-2">
          <Avatar>
            {userAvatar ? (
              <AvatarImage src={userAvatar} alt={userName} />
            ) : (
              <AvatarFallback className="bg-primary text-white">
                {userName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="text-sm font-medium">{userName}</div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
