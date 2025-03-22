import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Share, Printer, X } from "lucide-react";

interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  transactionData?: {
    receiptNumber: string;
    date: string;
    time: string;
    items: ReceiptItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
    cashierName: string;
    storeName: string;
    storeAddress: string;
    storePhone: string;
  };
}

const ReceiptModal = ({
  open = true,
  onOpenChange,
  transactionData = {
    receiptNumber: "INV-20230615-001",
    date: "15 Juni 2023",
    time: "14:30",
    items: [
      { id: "1", name: "Nasi Goreng", quantity: 2, price: 25000 },
      { id: "2", name: "Es Teh Manis", quantity: 2, price: 5000 },
      { id: "3", name: "Ayam Goreng", quantity: 1, price: 15000 },
    ],
    subtotal: 75000,
    tax: 7500,
    total: 82500,
    paymentMethod: "Tunai",
    cashierName: "Budi Santoso",
    storeName: "Warung Makan Bahagia",
    storeAddress: "Jl. Pahlawan No. 123, Jakarta",
    storePhone: "021-5551234",
  },
}: ReceiptModalProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // Implementation for sharing receipt via WhatsApp or email
    alert("Fitur berbagi struk akan segera tersedia!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">Struk Pembayaran</DialogTitle>
          <button
            onClick={() => onOpenChange && onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="receipt-content p-4 text-sm">
          <div className="text-center mb-4">
            <h3 className="font-bold text-lg">{transactionData.storeName}</h3>
            <p className="text-xs">{transactionData.storeAddress}</p>
            <p className="text-xs">{transactionData.storePhone}</p>
          </div>

          <div className="flex justify-between text-xs mb-2">
            <span>No: {transactionData.receiptNumber}</span>
            <span>
              {transactionData.date} {transactionData.time}
            </span>
          </div>

          <Separator className="my-2" />

          <div className="space-y-2 mb-2">
            {transactionData.items.map((item) => (
              <div key={item.id} className="flex justify-between text-xs">
                <div>
                  <div>{item.name}</div>
                  <div className="text-gray-500">
                    {item.quantity} x {formatCurrency(item.price)}
                  </div>
                </div>
                <div className="text-right">
                  {formatCurrency(item.quantity * item.price)}
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-2" />

          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(transactionData.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Pajak (10%)</span>
              <span>{formatCurrency(transactionData.tax)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatCurrency(transactionData.total)}</span>
            </div>
          </div>

          <Separator className="my-2" />

          <div className="text-xs">
            <div className="flex justify-between">
              <span>Metode Pembayaran</span>
              <span>{transactionData.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Kasir</span>
              <span>{transactionData.cashierName}</span>
            </div>
          </div>

          <div className="text-center mt-4 text-xs">
            <p>Terima kasih telah berbelanja</p>
            <p>Silahkan datang kembali</p>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Cetak
          </Button>
          <Button className="flex items-center gap-2" onClick={handleShare}>
            <Share className="h-4 w-4" />
            Bagikan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
