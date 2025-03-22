import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { productsApi, categoriesApi, Product } from "../../lib/api";

interface ProductGridProps {
  onProductSelect?: (product: Product) => void;
}

const ProductGrid = ({ onProductSelect = () => {} }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Semua"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
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
      setCategories(["Semua", ...categoriesData.map((cat) => cat.name)]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter products based on search term and active category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "Semua" || product.category === activeCategory;
    return matchesSearch && matchesCategory && product.is_active;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 mr-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari produk..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={loadData}
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`cursor-pointer transition-all hover:scale-105 ${product.stock <= 0 ? "opacity-50" : ""}`}
                onClick={() => product.stock > 0 && onProductSelect(product)}
              >
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="w-full h-24 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="text-3xl text-gray-400">
                        {product.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm mt-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm font-bold text-primary mt-1">
                    {formatPrice(product.price)}
                  </p>
                  {product.stock <= 0 && (
                    <Badge
                      variant="outline"
                      className="mt-2 bg-red-50 text-red-500 border-red-200"
                    >
                      Stok Habis
                    </Badge>
                  )}
                  {product.stock > 0 &&
                    product.stock <= product.reorder_level && (
                      <Badge
                        variant="outline"
                        className="mt-2 bg-amber-50 text-amber-700 border-amber-200"
                      >
                        Stok Menipis: {product.stock}
                      </Badge>
                    )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <p>Tidak ada produk ditemukan</p>
              <p className="text-sm">
                Coba kata kunci lain atau kategori berbeda
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
