import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";

interface SalesChartProps {
  data?: {
    daily?: Array<{ date: string; sales: number; target: number }>;
    weekly?: Array<{ week: string; sales: number; target: number }>;
    monthly?: Array<{ month: string; sales: number; target: number }>;
  };
}

const SalesChart = ({
  data = {
    daily: [
      { date: "01/05", sales: 1200000, target: 1000000 },
      { date: "02/05", sales: 1350000, target: 1000000 },
      { date: "03/05", sales: 1100000, target: 1000000 },
      { date: "04/05", sales: 1450000, target: 1000000 },
      { date: "05/05", sales: 1600000, target: 1000000 },
      { date: "06/05", sales: 1800000, target: 1000000 },
      { date: "07/05", sales: 1700000, target: 1000000 },
    ],
    weekly: [
      { week: "Minggu 1", sales: 8500000, target: 7000000 },
      { week: "Minggu 2", sales: 9200000, target: 7000000 },
      { week: "Minggu 3", sales: 8700000, target: 7000000 },
      { week: "Minggu 4", sales: 9500000, target: 7000000 },
    ],
    monthly: [
      { month: "Jan", sales: 35000000, target: 30000000 },
      { month: "Feb", sales: 32000000, target: 30000000 },
      { month: "Mar", sales: 37000000, target: 30000000 },
      { month: "Apr", sales: 39000000, target: 30000000 },
      { month: "Mei", sales: 42000000, target: 30000000 },
    ],
  },
}: SalesChartProps) => {
  const [selectedTab, setSelectedTab] = useState("daily");
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Format currency in Indonesian Rupiah
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-emerald-600">
            Penjualan: {formatRupiah(payload[0].value)}
          </p>
          <p className="text-blue-600">
            Target: {formatRupiah(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Grafik Penjualan</CardTitle>
          <p className="text-sm text-muted-foreground">
            {selectedTab === "daily" && "Penjualan harian"}
            {selectedTab === "weekly" && "Penjualan mingguan"}
            {selectedTab === "monthly" && "Penjualan bulanan"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : "Pilih tanggal"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="daily"
          value={selectedTab}
          onValueChange={setSelectedTab}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Harian</TabsTrigger>
            <TabsTrigger value="weekly">Mingguan</TabsTrigger>
            <TabsTrigger value="monthly">Bulanan</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.daily}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) =>
                    formatRupiah(value).replace("Rp", "")
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  name="Penjualan"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#3b82f6"
                  fill="none"
                  name="Target"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.weekly}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis
                  tickFormatter={(value) =>
                    formatRupiah(value).replace("Rp", "")
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  name="Penjualan"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#3b82f6"
                  fill="none"
                  name="Target"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.monthly}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) =>
                    formatRupiah(value).replace("Rp", "")
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  name="Penjualan"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#3b82f6"
                  fill="none"
                  name="Target"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
