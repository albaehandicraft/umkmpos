import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { AlertCircle } from "lucide-react";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    cost: number;
    category: string;
    sku: string;
    stock: number;
    reorderPoint: number;
    isActive: boolean;
  };
  onSubmit?: (product: any) => void;
  onCancel?: () => void;
}

const ProductForm = ({
  product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    cost: 0,
    category: "",
    sku: "",
    stock: 0,
    reorderPoint: 5,
    isActive: true,
  },
  onSubmit = () => {},
  onCancel = () => {},
}: ProductFormProps) => {
  const [formData, setFormData] = useState(product);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" ||
        name === "cost" ||
        name === "stock" ||
        name === "reorderPoint"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama produk wajib diisi";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU wajib diisi";
    }

    if (formData.price <= 0) {
      newErrors.price = "Harga jual harus lebih dari 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          {product.id ? "Edit Produk" : "Tambah Produk Baru"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama Produk */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">
                Nama Produk <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama produk"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.name}
                </p>
              )}
            </div>

            {/* SKU */}
            <div className="space-y-2">
              <Label htmlFor="sku" className="font-medium">
                SKU/Kode Produk <span className="text-red-500">*</span>
              </Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Masukkan kode produk"
                className={errors.sku ? "border-red-500" : ""}
              />
              {errors.sku && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.sku}
                </p>
              )}
            </div>

            {/* Kategori */}
            <div className="space-y-2">
              <Label htmlFor="category" className="font-medium">
                Kategori
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange(value, "category")}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="makanan">Makanan</SelectItem>
                  <SelectItem value="minuman">Minuman</SelectItem>
                  <SelectItem value="pakaian">Pakaian</SelectItem>
                  <SelectItem value="elektronik">Elektronik</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Harga Jual */}
            <div className="space-y-2">
              <Label htmlFor="price" className="font-medium">
                Harga Jual (Rp) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.price}
                </p>
              )}
            </div>

            {/* Harga Modal */}
            <div className="space-y-2">
              <Label htmlFor="cost" className="font-medium">
                Harga Modal (Rp)
              </Label>
              <Input
                id="cost"
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>

            {/* Stok */}
            <div className="space-y-2">
              <Label htmlFor="stock" className="font-medium">
                Stok Saat Ini
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>

            {/* Batas Reorder */}
            <div className="space-y-2">
              <Label htmlFor="reorderPoint" className="font-medium">
                Batas Minimum Stok
              </Label>
              <Input
                id="reorderPoint"
                name="reorderPoint"
                type="number"
                value={formData.reorderPoint}
                onChange={handleChange}
                placeholder="5"
                min="0"
              />
            </div>

            {/* Status Aktif */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive" className="font-medium">
                  Produk Aktif
                </Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
              <p className="text-sm text-gray-500">
                Produk tidak aktif tidak akan muncul di menu kasir
              </p>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label htmlFor="description" className="font-medium">
              Deskripsi Produk
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Masukkan deskripsi produk"
              rows={3}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 border-t p-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button type="submit" variant="default">
            {product.id ? "Simpan Perubahan" : "Tambah Produk"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProductForm;
