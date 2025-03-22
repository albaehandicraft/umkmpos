import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";

interface ProductData {
  id: string;
  name: string;
  category: string;
  sold: number;
  revenue: number;
  profit: number;
  profitMargin: number;
  stockTurnover: number;
  trend: "up" | "down" | "stable";
}

interface ProductPerformanceProps {
  products?: ProductData[];
  period?: string;
}

const ProductPerformance = ({
  products = mockProducts,
  period = "This Month",
}: ProductPerformanceProps) => {
  const [view, setView] = useState<"best" | "worst">("best");

  // Filter products based on view
  const displayProducts =
    view === "best"
      ? [...products].sort((a, b) => b.profit - a.profit).slice(0, 10)
      : [...products].sort((a, b) => a.profit - b.profit).slice(0, 10);

  // Prepare data for pie chart
  const pieData = displayProducts.map((product) => ({
    name: product.name,
    value: product.revenue,
  }));

  // Colors for pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
  ];

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">
              Product Performance
            </CardTitle>
            <CardDescription>
              Analysis of product sales and profitability for {period}
            </CardDescription>
          </div>
          <Tabs defaultValue="best" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="best"
                onClick={() => setView("best")}
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
              >
                Best Sellers
              </TabsTrigger>
              <TabsTrigger
                value="worst"
                onClick={() => setView("worst")}
                className="data-[state=active]:bg-red-100 data-[state=active]:text-red-800"
              >
                Worst Sellers
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table View */}
          <div className="overflow-auto max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{product.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {product.category}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{product.sold}</TableCell>
                    <TableCell className="text-right">
                      Rp {product.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      Rp {product.profit.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          product.profitMargin > 30
                            ? "success"
                            : product.profitMargin > 15
                              ? "default"
                              : "destructive"
                        }
                        className={
                          product.profitMargin > 30
                            ? "bg-green-100 text-green-800"
                            : product.profitMargin > 15
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {product.profitMargin}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {product.trend === "up" ? (
                        <TrendingUpIcon
                          className="inline ml-2 text-green-600"
                          size={16}
                        />
                      ) : product.trend === "down" ? (
                        <TrendingDownIcon
                          className="inline ml-2 text-red-600"
                          size={16}
                        />
                      ) : (
                        <span className="inline-block w-4 h-0.5 bg-gray-400 ml-2"></span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Chart View */}
          <div className="flex flex-col space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `Rp ${Number(value).toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="text-sm text-center text-muted-foreground">
              {view === "best" ? (
                <p className="flex items-center justify-center">
                  <ArrowUpIcon className="text-green-600 mr-1" size={16} />
                  These products contribute{" "}
                  {Math.round(
                    (displayProducts.reduce((sum, p) => sum + p.revenue, 0) /
                      products.reduce((sum, p) => sum + p.revenue, 0)) *
                      100,
                  )}
                  % of total revenue
                </p>
              ) : (
                <p className="flex items-center justify-center">
                  <ArrowDownIcon className="text-red-600 mr-1" size={16} />
                  These products contribute only{" "}
                  {Math.round(
                    (displayProducts.reduce((sum, p) => sum + p.revenue, 0) /
                      products.reduce((sum, p) => sum + p.revenue, 0)) *
                      100,
                  )}
                  % of total revenue
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Mock data
const mockProducts: ProductData[] = [
  {
    id: "1",
    name: "Nasi Goreng Spesial",
    category: "Makanan",
    sold: 245,
    revenue: 7350000,
    profit: 3675000,
    profitMargin: 50,
    stockTurnover: 8.2,
    trend: "up",
  },
  {
    id: "2",
    name: "Es Teh Manis",
    category: "Minuman",
    sold: 412,
    revenue: 2060000,
    profit: 1648000,
    profitMargin: 80,
    stockTurnover: 12.4,
    trend: "up",
  },
  {
    id: "3",
    name: "Ayam Goreng",
    category: "Makanan",
    sold: 198,
    revenue: 4950000,
    profit: 1980000,
    profitMargin: 40,
    stockTurnover: 6.8,
    trend: "stable",
  },
  {
    id: "4",
    name: "Mie Goreng",
    category: "Makanan",
    sold: 176,
    revenue: 3520000,
    profit: 1760000,
    profitMargin: 50,
    stockTurnover: 7.5,
    trend: "up",
  },
  {
    id: "5",
    name: "Es Jeruk",
    category: "Minuman",
    sold: 287,
    revenue: 1435000,
    profit: 1004500,
    profitMargin: 70,
    stockTurnover: 10.2,
    trend: "up",
  },
  {
    id: "6",
    name: "Sate Ayam",
    category: "Makanan",
    sold: 132,
    revenue: 3960000,
    profit: 1584000,
    profitMargin: 40,
    stockTurnover: 5.8,
    trend: "down",
  },
  {
    id: "7",
    name: "Gado-gado",
    category: "Makanan",
    sold: 98,
    revenue: 1960000,
    profit: 980000,
    profitMargin: 50,
    stockTurnover: 4.2,
    trend: "stable",
  },
  {
    id: "8",
    name: "Kopi Hitam",
    category: "Minuman",
    sold: 345,
    revenue: 1725000,
    profit: 1380000,
    profitMargin: 80,
    stockTurnover: 11.5,
    trend: "up",
  },
  {
    id: "9",
    name: "Soto Ayam",
    category: "Makanan",
    sold: 112,
    revenue: 2240000,
    profit: 896000,
    profitMargin: 40,
    stockTurnover: 4.8,
    trend: "down",
  },
  {
    id: "10",
    name: "Jus Alpukat",
    category: "Minuman",
    sold: 156,
    revenue: 1560000,
    profit: 936000,
    profitMargin: 60,
    stockTurnover: 6.2,
    trend: "up",
  },
  {
    id: "11",
    name: "Bakso",
    category: "Makanan",
    sold: 187,
    revenue: 3740000,
    profit: 1496000,
    profitMargin: 40,
    stockTurnover: 7.8,
    trend: "stable",
  },
  {
    id: "12",
    name: "Es Campur",
    category: "Minuman",
    sold: 134,
    revenue: 1340000,
    profit: 804000,
    profitMargin: 60,
    stockTurnover: 5.4,
    trend: "down",
  },
  {
    id: "13",
    name: "Pecel Lele",
    category: "Makanan",
    sold: 76,
    revenue: 1900000,
    profit: 760000,
    profitMargin: 40,
    stockTurnover: 3.2,
    trend: "down",
  },
  {
    id: "14",
    name: "Teh Botol",
    category: "Minuman",
    sold: 423,
    revenue: 1692000,
    profit: 846000,
    profitMargin: 50,
    stockTurnover: 14.1,
    trend: "up",
  },
  {
    id: "15",
    name: "Nasi Uduk",
    category: "Makanan",
    sold: 65,
    revenue: 975000,
    profit: 487500,
    profitMargin: 50,
    stockTurnover: 2.8,
    trend: "down",
  },
];

export default ProductPerformance;
