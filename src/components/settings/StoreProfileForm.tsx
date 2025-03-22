import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const formSchema = z.object({
  storeName: z
    .string()
    .min(2, { message: "Nama toko harus minimal 2 karakter" }),
  address: z
    .string()
    .min(5, { message: "Alamat toko harus diisi dengan lengkap" }),
  phone: z.string().min(10, { message: "Nomor telepon harus valid" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  taxId: z.string().optional(),
  receiptHeader: z.string().optional(),
  receiptFooter: z.string().optional(),
  logo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface StoreProfileFormProps {
  initialData?: FormValues;
  onSave?: (data: FormValues) => void;
}

const StoreProfileForm = ({
  initialData = {
    storeName: "Warung Barokah",
    address: "Jl. Pahlawan No. 123, Bandung, Jawa Barat",
    phone: "081234567890",
    email: "warungbarokah@example.com",
    taxId: "12.345.678.9-012.000",
    receiptHeader: "Terima kasih telah berbelanja di Warung Barokah",
    receiptFooter: "Barang yang sudah dibeli tidak dapat dikembalikan",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=WarungBarokah",
  },
  onSave = () => {},
}: StoreProfileFormProps) => {
  const [logoPreview, setLogoPreview] = useState<string>(
    initialData.logo || "",
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (data: FormValues) => {
    onSave(data);
    // In a real app, this would send data to the backend
    console.log("Store profile updated:", data);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file to storage
      // For now, we'll just create a local URL
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        form.setValue("logo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Profil Toko</CardTitle>
        <CardDescription>
          Kelola informasi toko Anda yang akan ditampilkan pada struk dan
          laporan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3 space-y-4">
                <FormField
                  control={form.control}
                  name="storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Toko</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama toko" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan alamat lengkap toko"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contoh: 081234567890"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@toko.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NPWP (Opsional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan NPWP jika ada"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Format: 00.000.000.0-000.000
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-1/3 space-y-4">
                <FormItem>
                  <FormLabel>Logo Toko</FormLabel>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-40 h-40 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo toko"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-center p-4 text-gray-500">
                          <p>Belum ada logo</p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80">
                          <Upload size={16} />
                          <span>Unggah Logo</span>
                        </div>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoChange}
                        />
                      </label>
                    </div>
                    <FormDescription className="text-center">
                      Format: JPG, PNG, atau SVG
                      <br />
                      Ukuran maksimal: 2MB
                    </FormDescription>
                  </div>
                </FormItem>
              </div>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="receiptHeader"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Header Struk</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Teks yang akan muncul di bagian atas struk"
                        className="min-h-[60px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Contoh: Terima kasih telah berbelanja di toko kami
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receiptFooter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Footer Struk</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Teks yang akan muncul di bagian bawah struk"
                        className="min-h-[60px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Contoh: Barang yang sudah dibeli tidak dapat dikembalikan
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-6 flex justify-end">
              <Button type="submit" className="flex items-center gap-2">
                <Save size={16} />
                Simpan Perubahan
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StoreProfileForm;
