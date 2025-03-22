import React, { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import ShoppingCart from "./ShoppingCart";
import CheckoutModal from "./CheckoutModal";
import ReceiptModal from "./ReceiptModal";
import { useSupabase } from "../../contexts/SupabaseContext";
import { productsApi, transactionsApi, storeSettingsApi } from "../../lib/api";
import { Product, StoreSettings } from "../../lib/api";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  product_id: string;
}

const CashierModule = () => {
  const { user } = useSupabase();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
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
    cashierName: user?.name || "Kasir",
    storeName: "Warung Makan Bahagia",
    storeAddress: "Jl. Pahlawan No. 123, Jakarta",
    storePhone: "021-5551234",
  });

  useEffect(() => {
    const loadStoreSettings = async () => {
      try {
        const settings = await storeSettingsApi.get();
        if (settings) {
          setStoreSettings(settings);
          setTransactionData((prev) => ({
            ...prev,
            storeName: settings.store_name,
            storeAddress: settings.address || prev.storeAddress,
            storePhone: settings.phone || prev.storePhone,
          }));
        }
      } catch (error) {
        console.error("Error loading store settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoreSettings();
  }, []);

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(
      (item) => item.product_id === product.id,
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: crypto.randomUUID(),
          product_id: product.id,
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
      cashierName: user?.name || "Kasir",
      receiptNumber: `INV-${new Date().toISOString().slice(0, 10)}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toLocaleDateString("id-ID"),
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setIsCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  const handlePaymentSuccess = async (paymentMethod: string) => {
    try {
      // Save transaction to database
      const transaction = {
        receipt_number: transactionData.receiptNumber,
        date: new Date().toISOString(),
        subtotal: transactionData.subtotal,
        tax: transactionData.tax,
        total: transactionData.total,
        payment_method: paymentMethod,
        cashier_name: user?.name || "Kasir",
        status: "completed" as const,
      };

      // Prepare transaction items
      const items = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      // Save to database
      await transactionsApi.create(transaction, items);

      // Update UI
      setIsCheckoutOpen(false);
      setIsReceiptOpen(true);
      setTransactionData({
        ...transactionData,
        paymentMethod,
      });
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert("Terjadi kesalahan saat menyimpan transaksi. Silakan coba lagi.");
    }
  };

  const handleReceiptClose = () => {
    setIsReceiptOpen(false);
    // Clear cart after successful transaction
    setCartItems([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
        onPaymentSuccess={handlePaymentSuccess}
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
