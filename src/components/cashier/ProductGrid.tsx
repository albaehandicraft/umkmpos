import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  inStock: boolean;
}

interface ProductGridProps {
  products?: Product[];
  onProductSelect?: (product: Product) => void;
  categories?: string[];
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      name: "Nasi Goreng",
      price: 15000,
      category: "Makanan",
      inStock: true,
    },
    {
      id: "2",
      name: "Es Teh",
      price: 5000,
      category: "Minuman",
      inStock: true,
    },
    {
      id: "3",
      name: "Ayam Goreng",
      price: 20000,
      category: "Makanan",
      inStock: true,
    },
    {
      id: "4",
      name: "Es Jeruk",
      price: 7000,
      category: "Minuman",
      inStock: true,
    },
    {
      id: "5",
      name: "Mie Goreng",
      price: 12000,
      category: "Makanan",
      inStock: true,
    },
    { id: "6", name: "Kopi", price: 8000, category: "Minuman", inStock: true },
    {
      id: "7",
      name: "Sate Ayam",
      price: 25000,
      category: "Makanan",
      inStock: false,
    },
    {
      id: "8",
      name: "Jus Alpukat",
      price: 15000,
      category: "Minuman",
      inStock: true,
    },
    {
      id: "9",
      name: "Bakso",
      price: 18000,
      category: "Makanan",
      inStock: true,
    },
    {
      id: "10",
      name: "Air Mineral",
      price: 3000,
      category: "Minuman",
      inStock: true,
    },
    {
      id: "11",
      name: "Gado-gado",
      price: 15000,
      category: "Makanan",
      inStock: true,
    },
    {
      id: "12",
      name: "Es Campur",
      price: 12000,
      category: "Minuman",
      inStock: true,
    },
  ],
  onProductSelect = () => {},
  categories = ["Semua", "Makanan", "Minuman"],
}: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Filter products based on search term and active category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "Semua" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
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
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari produk..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`cursor-pointer transition-all hover:scale-105 ${!product.inStock ? "opacity-50" : ""}`}
              onClick={() => product.inStock && onProductSelect(product)}
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
                {!product.inStock && (
                  <Badge
                    variant="outline"
                    className="mt-2 bg-red-50 text-red-500 border-red-200"
                  >
                    Stok Habis
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
    </div>
  );
};

export default ProductGrid;
