import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import DashboardHeader from "./dashboard/DashboardHeader";
import SalesSummary from "./dashboard/SalesSummary";
import SalesChart from "./dashboard/SalesChart";
import TopProducts from "./dashboard/TopProducts";
import InventoryAlert from "./dashboard/InventoryAlert";
import RecentTransactions from "./dashboard/RecentTransactions";
import CashierModule from "./cashier/CashierModule";
import InventoryModule from "./inventory/InventoryModule";
import ReportsModule from "./reports/ReportsModule";
import SettingsModule from "./settings/SettingsModule";

const Home = () => {
  // Handler for viewing inventory from alert
  const handleViewInventory = () => {
    // In a real app, this would navigate to inventory page
    console.log("Navigate to inventory page");
  };

  // Handler for viewing transaction details
  const handleViewTransaction = (id: string) => {
    // In a real app, this would open transaction details
    console.log("View transaction details for:", id);
  };

  // Handler for pagination in recent transactions
  const handlePageChange = (page: number) => {
    // In a real app, this would fetch the appropriate page of transactions
    console.log("Change to page:", page);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Main Content Area with Routes */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-6">
                  {/* Sales Summary Cards */}
                  <SalesSummary />

                  {/* Main Dashboard Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Chart - Takes 2/3 of the width on large screens */}
                    <div className="lg:col-span-2">
                      <SalesChart />
                    </div>

                    {/* Top Products - Takes 1/3 of the width */}
                    <div>
                      <TopProducts />
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Inventory Alert - Takes 1/3 of the width */}
                    <div>
                      <InventoryAlert onViewInventory={handleViewInventory} />
                    </div>

                    {/* Recent Transactions - Takes 2/3 of the width */}
                    <div className="lg:col-span-2">
                      <RecentTransactions
                        onViewTransaction={handleViewTransaction}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/cashier" element={<CashierModule />} />
            <Route path="/inventory" element={<InventoryModule />} />
            <Route path="/reports" element={<ReportsModule />} />
            <Route path="/settings" element={<SettingsModule />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Home;
