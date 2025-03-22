import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { PlusCircle, RefreshCw, Download, Upload } from "lucide-react";
import InventoryTable from "./InventoryTable";
import LowStockAlert from "./LowStockAlert";
import ProductForm from "./ProductForm";
import { Dialog, DialogContent } from "../ui/dialog";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderLevel: number;
}

const InventoryModule = () => {
  const [activeTab, setActiveTab] = useState("all-products");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Sample products data
  const products = [
    {
      id: "1",
      name: "Kopi Arabica",
      sku: "KP-001",
      category: "Minuman",
      price: 15000,
      cost: 8000,
      stock: 25,
      reorderLevel: 10,
    },
    {
      id: "2",
      name: "Nasi Goreng",
      sku: "NG-001",
      category: "Makanan",
      price: 25000,
      cost: 12000,
      stock: 5,
      reorderLevel: 8,
    },
    {
      id: "3",
      name: "Es Teh Manis",
      sku: "ET-001",
      category: "Minuman",
      price: 8000,
      cost: 3000,
      stock: 40,
      reorderLevel: 15,
    },
    {
      id: "4",
      name: "Roti Bakar",
      sku: "RB-001",
      category: "Makanan",
      price: 12000,
      cost: 5000,
      stock: 12,
      reorderLevel: 10,
    },
    {
      id: "5",
      name: "Ayam Goreng",
      sku: "AG-001",
      category: "Makanan",
      price: 18000,
      cost: 10000,
      stock: 8,
      reorderLevel: 5,
    },
  ];

  // Filter low stock products
  const lowStockProducts = products
    .filter((product) => product.stock <= product.reorderLevel)
    .map((product) => ({
      id: product.id,
      name: product.name,
      currentStock: product.stock,
      reorderLevel: product.reorderLevel,
      category: product.category,
      suggestedOrder: Math.max(product.reorderLevel * 2 - product.stock, 5),
      lastSold: "2 jam lalu", // Mock data
    }));

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would call an API to delete the product
    console.log(`Delete product with ID: ${productId}`);
  };

  const handleProductSubmit = (productData: any) => {
    // In a real app, this would call an API to save the product
    console.log("Product data submitted:", productData);
    setShowProductForm(false);
  };

  const handleReorder = (productId: string) => {
    // In a real app, this would open a reorder form or process
    console.log(`Reorder product with ID: ${productId}`);
  };

  return (
    <div className="w-full p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Inventaris</h1>
          <p className="text-gray-500">Kelola produk dan pantau stok barang</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button onClick={handleAddProduct} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Produk
          </Button>
        </div>
      </div>

      {/* Low Stock Alert Banner */}
      {lowStockProducts.length > 0 && (
        <div className="mb-6">
          <LowStockAlert
            products={lowStockProducts}
            onReorder={handleReorder}
            onViewAll={() => setActiveTab("low-stock")}
          />
        </div>
      )}

      {/* Inventory Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all-products">Semua Produk</TabsTrigger>
          <TabsTrigger value="low-stock">
            Stok Menipis
            {lowStockProducts.length > 0 && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {lowStockProducts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="categories">Kategori</TabsTrigger>
        </TabsList>

        <TabsContent value="all-products" className="mt-0">
          <InventoryTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onAdd={handleAddProduct}
          />
        </TabsContent>

        <TabsContent value="low-stock" className="mt-0">
          <InventoryTable
            products={products.filter(
              (product) => product.stock <= product.reorderLevel,
            )}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onAdd={handleAddProduct}
          />
        </TabsContent>

        <TabsContent value="categories" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from(
              new Set(products.map((product) => product.category)),
            ).map((category) => (
              <div
                key={category}
                className="bg-white p-4 rounded-lg border shadow-sm"
              >
                <h3 className="font-medium text-lg mb-2">{category}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {products.filter((p) => p.category === category).length}{" "}
                  produk
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Lihat Produk
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Form Dialog */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-3xl p-0">
          <ProductForm
            product={
              editingProduct
                ? {
                    ...editingProduct,
                    description: "", // Add missing fields from ProductForm interface
                    reorderPoint: editingProduct.reorderLevel,
                    isActive: true,
                  }
                : undefined
            }
            onSubmit={handleProductSubmit}
            onCancel={() => setShowProductForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryModule;
