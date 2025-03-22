import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReportSelector from "./ReportSelector";
import SalesReportChart from "./SalesReportChart";
import ProductPerformance from "./ProductPerformance";
import AIPredictions from "./AIPredictions";

interface ReportsModuleProps {
  initialReportType?: string;
  initialDateRange?: { from: Date; to: Date };
}

const ReportsModule = ({
  initialReportType = "daily",
  initialDateRange = {
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  },
}: ReportsModuleProps) => {
  const [reportType, setReportType] = useState(initialReportType);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const handleReportTypeChange = (type: string) => {
    setReportType(type);
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
  };

  const handleExport = () => {
    // In a real implementation, this would handle exporting reports
    console.log(`Exporting ${reportType} report for date range:`, dateRange);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 space-y-6 bg-gray-50">
      <h1 className="text-2xl font-bold">Laporan & Analitik</h1>

      <ReportSelector
        onReportTypeChange={handleReportTypeChange}
        onDateRangeChange={handleDateRangeChange}
        onExport={handleExport}
      />

      <div className="space-y-6">
        {reportType === "daily" || reportType === "monthly" ? (
          <SalesReportChart
            data={{
              dates: [
                "2023-05-01",
                "2023-05-02",
                "2023-05-03",
                "2023-05-04",
                "2023-05-05",
                "2023-05-06",
                "2023-05-07",
                "2023-05-08",
                "2023-05-09",
                "2023-05-10",
              ],
              sales: [
                120000, 150000, 90000, 180000, 130000, 160000, 200000, 170000,
                190000, 210000,
              ],
              previousPeriodSales: [
                100000, 130000, 80000, 150000, 120000, 140000, 180000, 160000,
                170000, 190000,
              ],
              paymentMethods: [
                { method: "Cash", amount: 600000 },
                { method: "GoPay", amount: 450000 },
                { method: "OVO", amount: 350000 },
                { method: "DANA", amount: 300000 },
                { method: "Bank Transfer", amount: 200000 },
              ],
            }}
          />
        ) : null}

        {reportType === "products" && (
          <ProductPerformance
            period={`${dateRange.from.toLocaleDateString("id-ID")} - ${dateRange.to.toLocaleDateString("id-ID")}`}
          />
        )}

        {reportType === "predictions" && <AIPredictions />}
      </div>
    </div>
  );
};

export default ReportsModule;
