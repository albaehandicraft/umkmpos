import React from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  reorderLevel: number;
  category: string;
}

interface InventoryAlertProps {
  lowStockItems?: InventoryItem[];
  onViewInventory?: () => void;
}

const InventoryAlert = ({
  lowStockItems = [
    {
      id: "1",
      name: "Kopi Arabica",
      currentStock: 5,
      reorderLevel: 10,
      category: "Minuman",
    },
    {
      id: "2",
      name: "Gula Pasir 1kg",
      currentStock: 3,
      reorderLevel: 15,
      category: "Bahan Pokok",
    },
    {
      id: "3",
      name: "Mie Instan",
      currentStock: 8,
      reorderLevel: 20,
      category: "Makanan",
    },
  ],
  onViewInventory = () => console.log("Navigate to inventory"),
}: InventoryAlertProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          Peringatan Stok Menipis
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3 max-h-[120px] overflow-y-auto pr-2">
          {lowStockItems.length > 0 ? (
            lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-red-500">
                    {item.currentStock} tersisa
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Min: {item.reorderLevel}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-center text-muted-foreground py-4">
              Semua stok dalam jumlah yang cukup
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-sm"
          onClick={onViewInventory}
        >
          Kelola Inventaris
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InventoryAlert;
