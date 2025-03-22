import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface Transaction {
  id: string;
  time: string;
  amount: number;
  paymentMethod: string;
  items: string[];
  status: "completed" | "pending" | "cancelled";
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onViewTransaction?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const RecentTransactions = ({
  transactions = [
    {
      id: "TX-1234",
      time: "10:30 AM",
      amount: 75000,
      paymentMethod: "Cash",
      items: ["Nasi Goreng", "Es Teh", "Kerupuk"],
      status: "completed",
    },
    {
      id: "TX-1235",
      time: "11:15 AM",
      amount: 125000,
      paymentMethod: "GoPay",
      items: ["Ayam Bakar", "Nasi", "Es Jeruk", "Kerupuk"],
      status: "completed",
    },
    {
      id: "TX-1236",
      time: "12:45 PM",
      amount: 50000,
      paymentMethod: "OVO",
      items: ["Mie Goreng", "Es Kopi"],
      status: "completed",
    },
    {
      id: "TX-1237",
      time: "1:30 PM",
      amount: 200000,
      paymentMethod: "Bank Transfer",
      items: ["Paket Keluarga", "Es Teh (4)"],
      status: "pending",
    },
    {
      id: "TX-1238",
      time: "2:15 PM",
      amount: 35000,
      paymentMethod: "Cash",
      items: ["Soto Ayam", "Es Jeruk"],
      status: "completed",
    },
  ],
  onViewTransaction = () => {},
  currentPage = 1,
  totalPages = 5,
  onPageChange = () => {},
}: RecentTransactionsProps) => {
  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get status color based on transaction status
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "cancelled":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-950">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Transaksi Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Metode Pembayaran</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.time}</TableCell>
                  <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <span className="truncate max-w-[150px] inline-block">
                      {transaction.items.join(", ")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status,
                      )}`}
                    >
                      {transaction.status === "completed" && "Selesai"}
                      {transaction.status === "pending" && "Menunggu"}
                      {transaction.status === "cancelled" && "Dibatalkan"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewTransaction(transaction.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Halaman {currentPage} dari {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
