import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Wallet,
  Banknote,
  QrCode,
  Smartphone,
  AlertCircle,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
  requiresConfig: boolean;
  configFields?: {
    name: string;
    placeholder: string;
    type: string;
  }[];
}

const PaymentMethodsConfig = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "cash",
      name: "Tunai",
      icon: <Banknote className="h-5 w-5" />,
      enabled: true,
      requiresConfig: false,
    },
    {
      id: "gopay",
      name: "GoPay",
      icon: <Wallet className="h-5 w-5 text-green-600" />,
      enabled: true,
      requiresConfig: true,
      configFields: [
        { name: "merchantId", placeholder: "ID Merchant GoPay", type: "text" },
        {
          name: "phoneNumber",
          placeholder: "Nomor Telepon Terdaftar",
          type: "tel",
        },
      ],
    },
    {
      id: "ovo",
      name: "OVO",
      icon: <Wallet className="h-5 w-5 text-purple-600" />,
      enabled: false,
      requiresConfig: true,
      configFields: [
        { name: "merchantId", placeholder: "ID Merchant OVO", type: "text" },
        {
          name: "phoneNumber",
          placeholder: "Nomor Telepon Terdaftar",
          type: "tel",
        },
      ],
    },
    {
      id: "dana",
      name: "DANA",
      icon: <Wallet className="h-5 w-5 text-blue-600" />,
      enabled: false,
      requiresConfig: true,
      configFields: [
        { name: "merchantId", placeholder: "ID Merchant DANA", type: "text" },
        {
          name: "phoneNumber",
          placeholder: "Nomor Telepon Terdaftar",
          type: "tel",
        },
      ],
    },
    {
      id: "qris",
      name: "QRIS",
      icon: <QrCode className="h-5 w-5" />,
      enabled: true,
      requiresConfig: true,
      configFields: [
        { name: "merchantId", placeholder: "ID Merchant QRIS", type: "text" },
      ],
    },
    {
      id: "bank_transfer",
      name: "Transfer Bank",
      icon: <CreditCard className="h-5 w-5" />,
      enabled: false,
      requiresConfig: true,
      configFields: [
        { name: "bankName", placeholder: "Nama Bank", type: "text" },
        { name: "accountNumber", placeholder: "Nomor Rekening", type: "text" },
        {
          name: "accountName",
          placeholder: "Nama Pemilik Rekening",
          type: "text",
        },
      ],
    },
    {
      id: "linkaja",
      name: "LinkAja",
      icon: <Smartphone className="h-5 w-5 text-red-600" />,
      enabled: false,
      requiresConfig: true,
      configFields: [
        {
          name: "merchantId",
          placeholder: "ID Merchant LinkAja",
          type: "text",
        },
        {
          name: "phoneNumber",
          placeholder: "Nomor Telepon Terdaftar",
          type: "tel",
        },
      ],
    },
  ]);

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) =>
        method.id === id ? { ...method, enabled: !method.enabled } : method,
      ),
    );
  };

  const saveChanges = () => {
    // In a real app, this would save to backend
    console.log("Saving payment method configurations:", paymentMethods);
    // Show success message or handle API call here
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Metode Pembayaran</h2>
        <p className="text-gray-600">
          Aktifkan dan konfigurasi metode pembayaran yang ingin Anda terima di
          toko Anda.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-md">{method.icon}</div>
                <CardTitle className="text-lg">{method.name}</CardTitle>
              </div>
              <Switch
                checked={method.enabled}
                onCheckedChange={() => togglePaymentMethod(method.id)}
              />
            </CardHeader>

            {method.enabled && method.requiresConfig && (
              <CardContent className="pt-4">
                {method.configFields?.map((field) => (
                  <div key={`${method.id}-${field.name}`} className="mb-3">
                    <label className="text-sm font-medium block mb-1">
                      {field.placeholder}
                    </label>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full"
                    />
                  </div>
                ))}
                {method.id === "qris" && (
                  <div className="mt-2 flex items-start space-x-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    <span>
                      Pastikan Anda telah mendaftarkan toko di QRIS untuk
                      menerima pembayaran.
                    </span>
                  </div>
                )}
              </CardContent>
            )}

            {!method.enabled && (
              <CardContent className="pt-2 pb-4">
                <p className="text-sm text-gray-500">
                  Aktifkan metode pembayaran ini untuk mengkonfigurasi
                  pengaturannya.
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="outline">Batal</Button>
        <Button onClick={saveChanges}>Simpan Perubahan</Button>
      </div>
    </div>
  );
};

export default PaymentMethodsConfig;
