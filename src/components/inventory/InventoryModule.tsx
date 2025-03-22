import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { PlusCircle, RefreshCw, Download, Upload } from "lucide-react";
import InventoryTable from "./InventoryTable";
import LowStockAlert from "./LowStockAlert";
import ProductForm from "./ProductForm";
import { Dialog, DialogContent } from "../ui/dialog";
import { productsApi, categoriesApi, Product, Category } from "../../lib/api";

const InventoryModule = () => {
  const [activeTab, setActiveTab] = useState("all-products");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load products
      const productsData = await productsApi.getAll();
      setProducts(productsData);

      // Load categories
      const categoriesData = await categoriesApi.getAll();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter low stock products
  const lowStockProducts = products
    .filter((product) => product.stock <= product.reorder_level)
    .map((product) => ({
      id: product.id,
      name: product.name,
      currentStock: product.stock,
      reorderLevel: product.reorder_level,
      category: product.category,
      suggestedOrder: Math.max(product.reorder_level * 2 - product.stock, 5),
      lastSold: "Hari ini", // This would come from transaction data in a real implementation
    }));

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await productsApi.delete(productId);
        loadData(); // Reload data after deletion
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Gagal menghapus produk. Silakan coba lagi.");
      }
    }
  };

  const handleProductSubmit = async (productData: any) => {
    try {
      if (editingProduct) {
        // Update existing product
        await productsApi.update(editingProduct.id, {
          name: productData.name,
          price: productData.price,
          cost: productData.cost,
          category: productData.category,
          sku: productData.sku,
          stock: productData.stock,
          reorder_level: productData.reorderPoint,
          description: productData.description,
          is_active: productData.isActive,
        });
      } else {
        // Create new product
        await productsApi.create({
          name: productData.name,
          price: productData.price,
          cost: productData.cost,
          category: productData.category,
          sku: productData.sku,
          stock: productData.stock,
          reorder_level: productData.reorderPoint,
          description: productData.description,
          is_active: productData.isActive,
        });
      }

      setShowProductForm(false);
      loadData(); // Reload data after submission
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Gagal menyimpan produk. Silakan coba lagi.");
    }
  };

  const handleReorder = (productId: string) => {
    // Find the product
    const product = products.find((p) => p.id === productId);
    if (product) {
      // Set it as editing product and open the form
      setEditingProduct(product);
      setShowProductForm(true);
    }
  };

  return (
    <div className="w-full p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Inventaris</h1>
          <p className="text-gray-500">Kelola produk dan pantau stok barang</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2" onClick={loadData}>
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

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
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
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
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
                  (product) => product.stock <= product.reorder_level,
                )}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onAdd={handleAddProduct}
              />
            </TabsContent>

            <TabsContent value="categories" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const productsInCategory = products.filter(
                    (p) => p.category === category.name,
                  ).length;
                  return (
                    <div
                      key={category.id}
                      className="bg-white p-4 rounded-lg border shadow-sm"
                    >
                      <h3 className="font-medium text-lg mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {productsInCategory} produk
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setActiveTab("all-products");
                          // This would filter the products table by category
                        }}
                      >
                        Lihat Produk
                      </Button>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Product Form Dialog */}
          <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
            <DialogContent className="max-w-2xl">
              <ProductForm
                product={editingProduct}
                categories={categories.map((c) => c.name)}
                onSubmit={handleProductSubmit}
                onCancel={() => setShowProductForm(false)}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default InventoryModule;
