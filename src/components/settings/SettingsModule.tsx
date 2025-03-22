import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SettingsTabs from "./SettingsTabs";
import StoreProfileForm from "./StoreProfileForm";
import UICustomizationPanel from "./UICustomizationPanel";
import UserManagement from "./UserManagement";
import PaymentMethodsConfig from "./PaymentMethodsConfig";

interface SettingsModuleProps {
  activeTab?: string;
}

const SettingsModule = ({ activeTab = "store" }: SettingsModuleProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
          <p className="text-gray-600 mt-2">
            Konfigurasi toko, tampilan, pengguna, dan metode pembayaran
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <SettingsTabs activeTab={currentTab} onTabChange={handleTabChange} />

          <div className="p-6">
            <Tabs value={currentTab} className="w-full">
              <TabsContent value="store">
                <StoreProfileForm
                  initialData={{
                    storeName: "Warung Barokah",
                    address: "Jl. Pahlawan No. 123, Bandung, Jawa Barat",
                    phone: "081234567890",
                    email: "warungbarokah@example.com",
                    taxId: "12.345.678.9-012.000",
                    receiptHeader:
                      "Terima kasih telah berbelanja di Warung Barokah",
                    receiptFooter:
                      "Barang yang sudah dibeli tidak dapat dikembalikan",
                    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=WarungBarokah",
                  }}
                  onSave={(data) => console.log("Store profile saved:", data)}
                />
              </TabsContent>

              <TabsContent value="ui">
                <UICustomizationPanel
                  initialSettings={{
                    layout: {
                      gridSize: "medium",
                      showImages: true,
                      showPrices: true,
                    },
                    appearance: {
                      primaryColor: "#4f46e5",
                      secondaryColor: "#f97316",
                      fontSize: "medium",
                      buttonStyle: "rounded",
                    },
                    categories: {
                      visible: true,
                      position: "top",
                    },
                  }}
                  onSave={(settings) =>
                    console.log("UI settings saved:", settings)
                  }
                />
              </TabsContent>

              <TabsContent value="users">
                <UserManagement
                  users={[
                    {
                      id: "1",
                      name: "Budi Santoso",
                      email: "budi@warungku.id",
                      role: "Admin",
                      isActive: true,
                    },
                    {
                      id: "2",
                      name: "Siti Rahayu",
                      email: "siti@warungku.id",
                      role: "Kasir",
                      isActive: true,
                    },
                    {
                      id: "3",
                      name: "Agus Wijaya",
                      email: "agus@warungku.id",
                      role: "Kasir",
                      isActive: false,
                    },
                  ]}
                />
              </TabsContent>

              <TabsContent value="payment">
                <PaymentMethodsConfig />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModule;
