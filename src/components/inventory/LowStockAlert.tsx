import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowRight, TrendingUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Product {
  id: string;
  name: string;
  currentStock: number;
  reorderLevel: number;
  category: string;
  suggestedOrder: number;
  lastSold: string;
}

interface LowStockAlertProps {
  products?: Product[];
  onViewAll?: () => void;
  onReorder?: (productId: string) => void;
}

const LowStockAlert = ({
  products = [
    {
      id: "1",
      name: "Kopi Arabica Premium",
      currentStock: 5,
      reorderLevel: 10,
      category: "Minuman",
      suggestedOrder: 15,
      lastSold: "2 jam lalu",
    },
    {
      id: "2",
      name: "Gula Pasir 1kg",
      currentStock: 3,
      reorderLevel: 8,
      category: "Bahan Pokok",
      suggestedOrder: 12,
      lastSold: "30 menit lalu",
    },
    {
      id: "3",
      name: "Mie Instan Goreng",
      currentStock: 7,
      reorderLevel: 15,
      category: "Makanan",
      suggestedOrder: 20,
      lastSold: "1 jam lalu",
    },
  ],
  onViewAll = () => console.log("View all low stock items"),
  onReorder = (id) => console.log(`Reorder product ${id}`),
}: LowStockAlertProps) => {
  return (
    <Card className="w-full bg-white shadow-sm border-red-100">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg font-medium">Stok Menipis</CardTitle>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200"
            >
              {products.length} produk
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm"
            onClick={onViewAll}
          >
            Lihat Semua <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 bg-amber-50 rounded-md border border-amber-100"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{product.name}</h4>
                  <Badge variant="outline" className="bg-white text-xs">
                    {product.category}
                  </Badge>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <span className="text-red-600 font-medium">
                    {product.currentStock} tersisa
                  </span>
                  <span className="mx-2">•</span>
                  <span>Min. stok: {product.reorderLevel}</span>
                  <span className="mx-2">•</span>
                  <span>Terjual: {product.lastSold}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center bg-white px-2 py-1 rounded border text-sm">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span>{product.suggestedOrder}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Jumlah pesanan yang disarankan berdasarkan pola
                        penjualan
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  size="sm"
                  onClick={() => onReorder(product.id)}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Pesan Ulang
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockAlert;
