import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Users, Palette, CreditCard } from "lucide-react";

interface SettingsTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SettingsTabs = ({
  activeTab = "store",
  onTabChange,
}: SettingsTabsProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className="w-full bg-white">
      <Tabs
        defaultValue={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="border-b">
          <TabsList className="flex justify-start h-16 bg-transparent">
            <TabsTrigger
              value="store"
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Store className="h-5 w-5" />
              <span>Store Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="ui"
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Palette className="h-5 w-5" />
              <span>UI Customization</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Users className="h-5 w-5" />
              <span>Users/Employees</span>
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <CreditCard className="h-5 w-5" />
              <span>Payment Methods</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab content containers - these would be populated by the parent component */}
        <TabsContent value="store" className="mt-6">
          {/* Store profile content will be rendered by parent */}
        </TabsContent>
        <TabsContent value="ui" className="mt-6">
          {/* UI customization content will be rendered by parent */}
        </TabsContent>
        <TabsContent value="users" className="mt-6">
          {/* User management content will be rendered by parent */}
        </TabsContent>
        <TabsContent value="payment" className="mt-6">
          {/* Payment methods content will be rendered by parent */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTabs;
