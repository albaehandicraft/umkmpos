import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import {
  CreditCard,
  Wallet,
  Banknote,
  Receipt,
  ArrowRight,
  Check,
} from "lucide-react";

interface CheckoutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  orderItems?: OrderItem[];
  totalAmount?: number;
  onPaymentSuccess?: (paymentMethod: string) => void;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutModal = ({
  isOpen = true,
  onClose = () => {},
  orderItems = [
    { id: "1", name: "Nasi Goreng", price: 25000, quantity: 2 },
    { id: "2", name: "Es Teh Manis", price: 5000, quantity: 2 },
    { id: "3", name: "Ayam Goreng", price: 15000, quantity: 1 },
  ],
  totalAmount = 75000,
}: CheckoutModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [step, setStep] = useState(1);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmountPaid(value);
  };

  const handleProceedToPayment = () => {
    setStep(2);
  };

  const handleConfirmPayment = () => {
    // Process the payment and notify parent component
    if (onPaymentSuccess) {
      onPaymentSuccess(paymentMethod);
    }
    setStep(3);
  };

  const handleFinish = () => {
    setStep(1);
    onClose();
  };

  const getChange = () => {
    const paid = parseInt(amountPaid) || 0;
    return paid - totalAmount;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {step === 1 && "Checkout Pesanan"}
            {step === 2 && "Konfirmasi Pembayaran"}
            {step === 3 && "Pembayaran Berhasil"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === 1 && "Ringkasan pesanan dan pilih metode pembayaran"}
            {step === 2 && "Konfirmasi detail pembayaran"}
            {step === 3 && "Transaksi telah berhasil diselesaikan"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-md">Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>Rp {item.price.toLocaleString("id-ID")}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>Rp {totalAmount.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <label className="text-sm font-medium">Metode Pembayaran</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={paymentMethod === "cash" ? "default" : "outline"}
                  className="flex items-center justify-start gap-2 h-12"
                  onClick={() => handlePaymentMethodChange("cash")}
                >
                  <Banknote className="h-5 w-5" />
                  <span>Tunai</span>
                </Button>
                <Button
                  variant={paymentMethod === "e-wallet" ? "default" : "outline"}
                  className="flex items-center justify-start gap-2 h-12"
                  onClick={() => handlePaymentMethodChange("e-wallet")}
                >
                  <Wallet className="h-5 w-5" />
                  <span>E-Wallet</span>
                </Button>
                <Button
                  variant={paymentMethod === "bank" ? "default" : "outline"}
                  className="flex items-center justify-start gap-2 h-12"
                  onClick={() => handlePaymentMethodChange("bank")}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Transfer Bank</span>
                </Button>
              </div>
            </div>

            {paymentMethod === "cash" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Jumlah Dibayar</label>
                <Input
                  type="text"
                  placeholder="Masukkan jumlah uang"
                  value={amountPaid}
                  onChange={handleAmountPaidChange}
                  className="text-right"
                />
              </div>
            )}

            {paymentMethod === "e-wallet" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Pilih E-Wallet</label>
                <Select defaultValue="gopay">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih E-Wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gopay">GoPay</SelectItem>
                    <SelectItem value="ovo">OVO</SelectItem>
                    <SelectItem value="dana">DANA</SelectItem>
                    <SelectItem value="shopeepay">ShopeePay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Pilih Bank</label>
                <Select defaultValue="bca">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bca">BCA</SelectItem>
                    <SelectItem value="bni">BNI</SelectItem>
                    <SelectItem value="mandiri">Mandiri</SelectItem>
                    <SelectItem value="bri">BRI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Pembayaran</span>
                    <span className="font-bold">
                      Rp {totalAmount.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Metode Pembayaran</span>
                    <span>
                      {paymentMethod === "cash" && "Tunai"}
                      {paymentMethod === "e-wallet" && "E-Wallet"}
                      {paymentMethod === "bank" && "Transfer Bank"}
                    </span>
                  </div>

                  {paymentMethod === "cash" && (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium">Jumlah Dibayar</span>
                        <span>
                          Rp {parseInt(amountPaid).toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Kembalian</span>
                        <span className="font-bold">
                          Rp {getChange().toLocaleString("id-ID")}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {paymentMethod === "e-wallet" && (
              <div className="flex justify-center">
                <div className="bg-gray-200 p-4 rounded-lg w-48 h-48 flex items-center justify-center">
                  <span className="text-center text-sm">
                    QR Code Pembayaran
                  </span>
                </div>
              </div>
            )}

            {paymentMethod === "bank" && (
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Nomor Rekening</span>
                      <span className="font-medium">1234-5678-9012</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Atas Nama</span>
                      <span className="font-medium">UMKM Sejahtera</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Pembayaran Berhasil!</h3>
            <p className="text-center text-gray-600">
              Transaksi telah berhasil diselesaikan. Terima kasih atas pembelian
              Anda.
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Receipt className="h-5 w-5" />
              <span className="text-blue-600 cursor-pointer">Cetak Struk</span>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          {step === 1 && (
            <>
              <Button variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button
                onClick={handleProceedToPayment}
                disabled={paymentMethod === "cash" && !amountPaid}
              >
                Lanjut ke Pembayaran <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                Kembali
              </Button>
              <Button onClick={handleConfirmPayment}>
                Konfirmasi Pembayaran <Check className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {step === 3 && (
            <Button onClick={handleFinish} className="w-full sm:w-auto">
              Selesai
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
