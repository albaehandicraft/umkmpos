import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TopProductsProps {
  products?: {
    id: string;
    name: string;
    quantity: number;
    revenue: number;
    trend: "up" | "down" | "stable";
    percentageChange: number;
  }[];
}

const TopProducts = ({
  products = [
    {
      id: "1",
      name: "Nasi Goreng Spesial",
      quantity: 42,
      revenue: 1260000,
      trend: "up" as const,
      percentageChange: 12,
    },
    {
      id: "2",
      name: "Es Teh Manis",
      quantity: 78,
      revenue: 780000,
      trend: "up" as const,
      percentageChange: 8,
    },
    {
      id: "3",
      name: "Ayam Goreng",
      quantity: 36,
      revenue: 720000,
      trend: "down" as const,
      percentageChange: 5,
    },
    {
      id: "4",
      name: "Mie Goreng",
      quantity: 28,
      revenue: 560000,
      trend: "stable" as const,
      percentageChange: 0,
    },
    {
      id: "5",
      name: "Soto Ayam",
      quantity: 22,
      revenue: 440000,
      trend: "up" as const,
      percentageChange: 3,
    },
  ],
}: TopProductsProps) => {
  // Format currency to Indonesian Rupiah
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for chart
  const chartData = products.map((product) => ({
    name:
      product.name.length > 10
        ? `${product.name.substring(0, 10)}...`
        : product.name,
    revenue: product.revenue,
  }));

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Produk Terlaris</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart visualization */}
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value) => [
                    formatCurrency(value as number),
                    "Pendapatan",
                  ]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    padding: "0.5rem",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#4f46e5"
                  radius={[0, 4, 4, 0]}
                  barSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Products list */}
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {product.quantity} terjual
                    </span>
                    {product.trend !== "stable" && (
                      <Badge
                        variant={
                          product.trend === "up" ? "default" : "destructive"
                        }
                        className="text-xs px-1.5 py-0 h-5"
                      >
                        {product.trend === "up" ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {product.percentageChange}%
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
