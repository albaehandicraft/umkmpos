import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import ShoppingCart from "./ShoppingCart";
import CheckoutModal from "./CheckoutModal";
import ReceiptModal from "./ReceiptModal";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  inStock: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CashierModule = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
  ]);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [transactionData, setTransactionData] = useState({
    receiptNumber: `INV-${new Date().toISOString().slice(0, 10)}-${Math.floor(Math.random() * 1000)}`,
    date: new Date().toLocaleDateString("id-ID"),
    time: new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    items: [] as CartItem[],
    subtotal: 0,
    tax: 0,
    total: 0,
    paymentMethod: "Tunai",
    cashierName: "Budi Santoso",
    storeName: "Warung Makan Bahagia",
    storeAddress: "Jl. Pahlawan No. 123, Jakarta",
    storePhone: "021-5551234",
  });

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]);
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    setTransactionData({
      ...transactionData,
      items: [...cartItems],
      subtotal,
      tax,
      total,
    });

    setIsCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false);
    setIsReceiptOpen(true);
    // In a real app, we would save the transaction to the database here
  };

  const handleReceiptClose = () => {
    setIsReceiptOpen(false);
    // Clear cart after successful transaction
    setCartItems([]);
  };

  return (
    <div className="flex h-full bg-gray-50">
      <div className="flex-1 overflow-hidden">
        <ProductGrid onProductSelect={handleAddToCart} />
      </div>
      <div className="w-1/3 min-w-[350px] border-l">
        <ShoppingCart
          items={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutClose}
        orderItems={cartItems}
        totalAmount={transactionData.total}
      />

      <ReceiptModal
        open={isReceiptOpen}
        onOpenChange={handleReceiptClose}
        transactionData={transactionData}
      />
    </div>
  );
};

export default CashierModule;
