import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

interface SalesSummaryProps {
  todaySales?: number;
  totalTransactions?: number;
  averageValue?: number;
  comparisonPercentage?: {
    sales: number;
    transactions: number;
    average: number;
  };
}

const SalesSummary = ({
  todaySales = 2500000,
  totalTransactions = 42,
  averageValue = 59500,
  comparisonPercentage = {
    sales: 12.5,
    transactions: 8.3,
    average: 4.2,
  },
}: SalesSummaryProps) => {
  // Format currency in Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Determine if trend is positive or negative
  const getTrendIcon = (percentage: number) => {
    if (percentage > 0) {
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    } else if (percentage < 0) {
      return <ArrowDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  // Get trend color class
  const getTrendColorClass = (percentage: number) => {
    return percentage > 0
      ? "text-green-500"
      : percentage < 0
        ? "text-red-500"
        : "text-gray-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-white">
      {/* Today's Sales Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Penjualan Hari Ini
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {formatCurrency(todaySales)}
              </h3>
              <div className="flex items-center mt-2">
                {getTrendIcon(comparisonPercentage.sales)}
                <span
                  className={`text-xs font-medium ml-1 ${getTrendColorClass(comparisonPercentage.sales)}`}
                >
                  {Math.abs(comparisonPercentage.sales)}% dari kemarin
                </span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Transactions Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Transaksi
              </p>
              <h3 className="text-2xl font-bold mt-1">{totalTransactions}</h3>
              <div className="flex items-center mt-2">
                {getTrendIcon(comparisonPercentage.transactions)}
                <span
                  className={`text-xs font-medium ml-1 ${getTrendColorClass(comparisonPercentage.transactions)}`}
                >
                  {Math.abs(comparisonPercentage.transactions)}% dari kemarin
                </span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Average Transaction Value Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Rata-rata Transaksi
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {formatCurrency(averageValue)}
              </h3>
              <div className="flex items-center mt-2">
                {getTrendIcon(comparisonPercentage.average)}
                <span
                  className={`text-xs font-medium ml-1 ${getTrendColorClass(comparisonPercentage.average)}`}
                >
                  {Math.abs(comparisonPercentage.average)}% dari kemarin
                </span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesSummary;
