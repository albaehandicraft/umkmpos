import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShoppingCartProps {
  items?: CartItem[];
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

const ShoppingCart = ({
  items = [
    {
      id: "1",
      name: "Nasi Goreng",
      price: 25000,
      quantity: 2,
    },
    {
      id: "2",
      name: "Es Teh Manis",
      price: 5000,
      quantity: 3,
    },
    {
      id: "3",
      name: "Ayam Goreng",
      price: 15000,
      quantity: 1,
    },
  ],
  onQuantityChange = () => {},
  onRemoveItem = () => {},
  onCheckout = () => {},
}: ShoppingCartProps) => {
  const [note, setNote] = useState("");

  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      onQuantityChange(id, newQuantity);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="h-full flex flex-col bg-white">
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-bold">Keranjang Belanja</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow overflow-auto py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <p>Keranjang belanja kosong</p>
            <p className="text-sm mt-2">
              Tambahkan produk dari menu di sebelah kiri
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(item.price)}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center">{item.quantity}</span>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Catatan Pesanan
              </label>
              <Input
                id="note"
                placeholder="Tambahkan catatan untuk pesanan ini"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-shrink-0 border-t p-4 flex flex-col">
        <div className="w-full space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatCurrency(calculateSubtotal())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pajak (10%)</span>
            <span>{formatCurrency(calculateTax())}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>

        <Button
          className="w-full py-6"
          size="lg"
          disabled={items.length === 0}
          onClick={onCheckout}
        >
          Proses Pembayaran
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingCart;
