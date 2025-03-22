import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  ArrowUpDown,
} from "lucide-react";

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

interface InventoryTableProps {
  products?: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onAdd?: () => void;
}

const InventoryTable = ({
  products = [
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
  ],
  onEdit = () => {},
  onDelete = () => {},
  onAdd = () => {},
}: InventoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories for filter
  const categories = [...new Set(products.map((product) => product.category))];

  // Handle sorting
  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // For numeric values
      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-xl font-bold">Inventaris Produk</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari produk atau SKU..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setSelectedCategory(null)}
                  className={!selectedCategory ? "bg-gray-100" : ""}
                >
                  Semua Kategori
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category ? "bg-gray-100" : ""
                    }
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={onAdd} className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Produk
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Nama Produk
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleSort("sku")}
                    >
                      SKU
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleSort("category")}
                    >
                      Kategori
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div
                      className="flex items-center justify-end gap-1 cursor-pointer"
                      onClick={() => handleSort("price")}
                    >
                      Harga Jual
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div
                      className="flex items-center justify-end gap-1 cursor-pointer"
                      onClick={() => handleSort("stock")}
                    >
                      Stok
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div
                      className="flex items-center justify-end gap-1 cursor-pointer"
                      onClick={() => handleSort("reorderLevel")}
                    >
                      Reorder Level
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(product.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            product.stock <= product.reorderLevel
                              ? "destructive"
                              : "outline"
                          }
                          className={
                            product.stock <= product.reorderLevel
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : ""
                          }
                        >
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {product.reorderLevel}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(product)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDelete(product.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-6 text-gray-500"
                    >
                      Tidak ada produk yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
