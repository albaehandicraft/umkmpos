import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Download,
  LineChart,
  BarChart,
  PieChart,
} from "lucide-react";

interface SalesReportChartProps {
  data?: {
    dates: string[];
    sales: number[];
    previousPeriodSales?: number[];
    paymentMethods?: {
      method: string;
      amount: number;
    }[];
  };
}

const SalesReportChart = ({
  data = {
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
      120000, 150000, 90000, 180000, 130000, 160000, 200000, 170000, 190000,
      210000,
    ],
    previousPeriodSales: [
      100000, 130000, 80000, 150000, 120000, 140000, 180000, 160000, 170000,
      190000,
    ],
    paymentMethods: [
      { method: "Cash", amount: 600000 },
      { method: "GoPay", amount: 450000 },
      { method: "OVO", amount: 350000 },
      { method: "DANA", amount: 300000 },
      { method: "Bank Transfer", amount: 200000 },
    ],
  },
}: SalesReportChartProps) => {
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line");
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(2023, 4, 1), // May 1, 2023
    to: new Date(2023, 4, 10), // May 10, 2023
  });

  // Mock chart rendering - in a real app, you would use a charting library like Recharts
  const renderChart = () => {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center">
        <div className="flex flex-col items-center text-gray-500">
          {chartType === "line" && <LineChart className="w-16 h-16" />}
          {chartType === "bar" && <BarChart className="w-16 h-16" />}
          {chartType === "area" && <LineChart className="w-16 h-16" />}
          <p className="mt-2">Sales chart visualization would appear here</p>
          <p className="text-xs">
            Using actual chart library like Recharts in production
          </p>
        </div>
      </div>
    );
  };

  const renderPaymentMethodsBreakdown = () => {
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Payment Methods Breakdown</h3>
        <div className="flex items-center space-x-2 mb-2">
          <PieChart className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-500">
            Payment distribution chart would appear here
          </span>
        </div>
        <div className="space-y-2">
          {data.paymentMethods?.map((method, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{method.method}</span>
              <span className="text-sm font-medium">
                Rp {method.amount.toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Sales Report</CardTitle>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-center text-sm h-9 px-3"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "d MMM yyyy")} -{" "}
                      {format(dateRange.to, "d MMM yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "d MMM yyyy")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(range) => range && setDateRange(range)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Select defaultValue="daily">
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visualization" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="comparison">Period Comparison</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>
          <TabsContent value="visualization" className="space-y-4">
            <div className="flex items-center justify-end space-x-2 mb-4">
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("line")}
                className="h-8"
              >
                <LineChart className="h-4 w-4 mr-1" /> Line
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="h-8"
              >
                <BarChart className="h-4 w-4 mr-1" /> Bar
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("area")}
                className="h-8"
              >
                <LineChart className="h-4 w-4 mr-1" /> Area
              </Button>
            </div>
            {renderChart()}
            <div className="pt-4">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div>
                  Total Sales:{" "}
                  <span className="font-medium text-black">
                    Rp{" "}
                    {data.sales
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString("id-ID")}
                  </span>
                </div>
                <div>
                  Average:{" "}
                  <span className="font-medium text-black">
                    Rp{" "}
                    {Math.round(
                      data.sales.reduce((a, b) => a + b, 0) / data.sales.length,
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
                <div>
                  Highest:{" "}
                  <span className="font-medium text-black">
                    Rp {Math.max(...data.sales).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="comparison">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Current Period</span>
                <div className="w-3 h-3 rounded-full bg-gray-300 ml-4"></div>
                <span className="text-sm">Previous Period</span>
              </div>
              {renderChart()}
              <div className="pt-2">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    Growth:{" "}
                    <span className="font-medium text-green-600">+12.5%</span>
                  </div>
                  <div>
                    Current Total:{" "}
                    <span className="font-medium text-black">
                      Rp{" "}
                      {data.sales
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div>
                    Previous Total:{" "}
                    <span className="font-medium text-black">
                      Rp{" "}
                      {data.previousPeriodSales
                        ?.reduce((a, b) => a + b, 0)
                        .toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="payment">
            {renderPaymentMethodsBreakdown()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SalesReportChart;
