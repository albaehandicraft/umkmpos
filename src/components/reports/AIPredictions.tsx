import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Calendar,
  Download,
} from "lucide-react";

interface AIPredictionsProps {
  predictions?: {
    sales: PredictionData[];
    products: ProductPrediction[];
    insights: string[];
  };
}

interface PredictionData {
  date: string;
  actual: number;
  predicted: number;
}

interface ProductPrediction {
  name: string;
  currentDemand: number;
  predictedDemand: number;
  changePercentage: number;
}

const AIPredictions = ({
  predictions = defaultPredictions,
}: AIPredictionsProps) => {
  const [timeframe, setTimeframe] = useState("week");

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">
            AI Predictions & Insights
          </CardTitle>
          <CardDescription>
            AI-powered forecasts to help plan your business
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Next Week</SelectItem>
              <SelectItem value="month">Next Month</SelectItem>
              <SelectItem value="quarter">Next Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="sales">Sales Forecast</TabsTrigger>
            <TabsTrigger value="products">Product Demand</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Predicted Revenue</h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">Rp 12,450,000</span>
                    <span className="ml-2 flex items-center text-green-600 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> 12.5%
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    Predicted Transactions
                  </h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">245</span>
                    <span className="ml-2 flex items-center text-green-600 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> 8.2%
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    Avg. Transaction Value
                  </h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">Rp 50,800</span>
                    <span className="ml-2 flex items-center text-green-600 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> 4.3%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictions.sales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#8884d8"
                    name="Actual Sales"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#82ca9d"
                    name="Predicted Sales"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">
                    AI Forecast Insight
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Based on historical data and seasonal patterns, we predict a
                    12.5% increase in sales for the next {timeframe}. Consider
                    stocking up on your top-selling products.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={predictions.products}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="currentDemand"
                      fill="#8884d8"
                      name="Current Demand"
                    />
                    <Bar
                      dataKey="predictedDemand"
                      fill="#82ca9d"
                      name="Predicted Demand"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Top Products with Increasing Demand
                </h3>
                <div className="space-y-3">
                  {predictions.products
                    .filter((product) => product.changePercentage > 0)
                    .sort((a, b) => b.changePercentage - a.changePercentage)
                    .slice(0, 5)
                    .map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">{product.name}</span>
                        <div className="flex items-center">
                          <span className="text-green-600 flex items-center">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            {product.changePercentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                <h3 className="text-lg font-medium mt-6">
                  Products with Decreasing Demand
                </h3>
                <div className="space-y-3">
                  {predictions.products
                    .filter((product) => product.changePercentage < 0)
                    .sort((a, b) => a.changePercentage - b.changePercentage)
                    .slice(0, 3)
                    .map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">{product.name}</span>
                        <div className="flex items-center">
                          <span className="text-red-600 flex items-center">
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                            {Math.abs(product.changePercentage)}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="space-y-4">
              {predictions.insights.map((insight, index) => (
                <Card key={index} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">
                          Business Insight #{index + 1}
                        </h4>
                        <p className="text-gray-700">{insight}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Button className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Weekly AI Insights
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Default mock data
const defaultPredictions = {
  sales: [
    { date: "Mon", actual: 4000, predicted: 4200 },
    { date: "Tue", actual: 3000, predicted: 3500 },
    { date: "Wed", actual: 2000, predicted: 2400 },
    { date: "Thu", actual: 2780, predicted: 2900 },
    { date: "Fri", actual: 1890, predicted: 2200 },
    { date: "Sat", actual: 2390, predicted: 2800 },
    { date: "Sun", actual: 3490, predicted: 3800 },
    { date: "Mon", actual: null, predicted: 4100 },
    { date: "Tue", actual: null, predicted: 3600 },
    { date: "Wed", actual: null, predicted: 2900 },
  ],
  products: [
    {
      name: "Nasi Goreng",
      currentDemand: 40,
      predictedDemand: 48,
      changePercentage: 20,
    },
    {
      name: "Mie Ayam",
      currentDemand: 30,
      predictedDemand: 35,
      changePercentage: 16.7,
    },
    {
      name: "Es Teh",
      currentDemand: 60,
      predictedDemand: 65,
      changePercentage: 8.3,
    },
    {
      name: "Ayam Bakar",
      currentDemand: 25,
      predictedDemand: 28,
      changePercentage: 12,
    },
    {
      name: "Soto Ayam",
      currentDemand: 35,
      predictedDemand: 32,
      changePercentage: -8.6,
    },
    {
      name: "Bakso",
      currentDemand: 45,
      predictedDemand: 40,
      changePercentage: -11.1,
    },
    {
      name: "Es Jeruk",
      currentDemand: 50,
      predictedDemand: 45,
      changePercentage: -10,
    },
  ],
  insights: [
    "Your busiest days are Friday and Saturday. Consider adding more staff during these days to improve service speed.",
    'Customers who buy "Nasi Goreng" often also purchase "Es Teh". Consider creating a bundle promotion for these items.',
    "Your average transaction value increases by 15% when customers use digital payment methods compared to cash.",
    'Based on seasonal trends, we predict a 20% increase in "Es Jeruk" sales as the weather gets warmer in the coming weeks.',
  ],
};

export default AIPredictions;
