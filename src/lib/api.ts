import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

// Products API
export const productsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return data || [];
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("name");

    if (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }

    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product by id:", error);
      return null;
    }

    return data;
  },

  async create(product: Omit<Product, "id">) {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return null;
    }

    return data;
  },

  async update(id: string, product: Partial<Product>) {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      return null;
    }

    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      return false;
    }

    return true;
  },

  async getLowStock() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .lt("stock", supabase.rpc("least", { a: "reorder_level", b: 10 }))
      .order("stock");

    if (error) {
      console.error("Error fetching low stock products:", error);
      return [];
    }

    return data || [];
  },
};

// Categories API
export const categoriesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    return data || [];
  },

  async create(name: string) {
    const { data, error } = await supabase
      .from("categories")
      .insert({ name })
      .select()
      .single();

    if (error) {
      console.error("Error creating category:", error);
      return null;
    }

    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      console.error("Error deleting category:", error);
      return false;
    }

    return true;
  },
};

// Transactions API
export const transactionsApi = {
  async getAll(limit = 100, page = 0) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*, transaction_items(*, products(*))")
      .order("date", { ascending: false })
      .range(page * limit, (page + 1) * limit - 1);

    if (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }

    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*, transaction_items(*, products(*))")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching transaction by id:", error);
      return null;
    }

    return data;
  },

  async create(
    transaction: Omit<Transaction, "id">,
    items: Omit<TransactionItem, "id" | "transaction_id">[],
  ) {
    // Start a transaction
    const { data: transactionData, error: transactionError } = await supabase
      .from("transactions")
      .insert(transaction)
      .select()
      .single();

    if (transactionError) {
      console.error("Error creating transaction:", transactionError);
      return null;
    }

    // Add transaction items
    const transactionItems = items.map((item) => ({
      ...item,
      transaction_id: transactionData.id,
    }));

    const { error: itemsError } = await supabase
      .from("transaction_items")
      .insert(transactionItems);

    if (itemsError) {
      console.error("Error creating transaction items:", itemsError);
      // In a real app, you might want to roll back the transaction here
      return null;
    }

    // Update product stock
    for (const item of items) {
      const { error: updateError } = await supabase.rpc("decrement_stock", {
        product_id: item.product_id,
        quantity: item.quantity,
      });

      if (updateError) {
        console.error("Error updating product stock:", updateError);
      }
    }

    return transactionData;
  },

  async getRecentTransactions(limit = 5) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*, transaction_items(*, products(*))")
      .order("date", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching recent transactions:", error);
      return [];
    }

    return data || [];
  },

  async getSalesByDate(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("date, total")
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date");

    if (error) {
      console.error("Error fetching sales by date:", error);
      return [];
    }

    return data || [];
  },

  async getSalesByPaymentMethod() {
    const { data, error } = await supabase
      .from("transactions")
      .select("payment_method, sum(total)")
      .group("payment_method");

    if (error) {
      console.error("Error fetching sales by payment method:", error);
      return [];
    }

    return data || [];
  },
};

// Store Settings API
export const storeSettingsApi = {
  async get() {
    const { data, error } = await supabase
      .from("store_settings")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching store settings:", error);
      return null;
    }

    return data;
  },

  async update(settings: Partial<StoreSettings>) {
    // First check if settings exist
    const { data: existingSettings } = await supabase
      .from("store_settings")
      .select("id")
      .limit(1);

    if (existingSettings && existingSettings.length > 0) {
      // Update existing settings
      const { data, error } = await supabase
        .from("store_settings")
        .update(settings)
        .eq("id", existingSettings[0].id)
        .select()
        .single();

      if (error) {
        console.error("Error updating store settings:", error);
        return null;
      }

      return data;
    } else {
      // Create new settings
      const { data, error } = await supabase
        .from("store_settings")
        .insert(settings)
        .select()
        .single();

      if (error) {
        console.error("Error creating store settings:", error);
        return null;
      }

      return data;
    }
  },
};

// Users API
export const usersApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching users:", error);
      return [];
    }

    return data || [];
  },

  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching current user:", error);
      return null;
    }

    return data;
  },

  async update(id: string, userData: Partial<User>) {
    const { data, error } = await supabase
      .from("users")
      .update(userData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating user:", error);
      return null;
    }

    return data;
  },
};

// UI Settings API
export const uiSettingsApi = {
  async get(userId?: string) {
    const query = supabase.from("ui_settings").select("*");

    if (userId) {
      query.eq("user_id", userId);
    } else {
      query.is("user_id", null);
    }

    const { data, error } = await query.limit(1).single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "No rows returned" error
      console.error("Error fetching UI settings:", error);
      return null;
    }

    return data;
  },

  async update(settings: any, userId?: string) {
    // First check if settings exist
    const query = supabase.from("ui_settings").select("id");

    if (userId) {
      query.eq("user_id", userId);
    } else {
      query.is("user_id", null);
    }

    const { data: existingSettings } = await query.limit(1);

    if (existingSettings && existingSettings.length > 0) {
      // Update existing settings
      const { data, error } = await supabase
        .from("ui_settings")
        .update({ settings })
        .eq("id", existingSettings[0].id)
        .select()
        .single();

      if (error) {
        console.error("Error updating UI settings:", error);
        return null;
      }

      return data;
    } else {
      // Create new settings
      const { data, error } = await supabase
        .from("ui_settings")
        .insert({
          user_id: userId || null,
          settings,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating UI settings:", error);
        return null;
      }

      return data;
    }
  },
};

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  image?: string;
  category: string;
  sku?: string;
  stock: number;
  reorder_level: number;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id: string;
  receipt_number: string;
  date: string;
  subtotal: number;
  tax: number;
  total: number;
  payment_method: string;
  cashier_name?: string;
  status: "completed" | "pending" | "cancelled";
  created_at?: string;
  updated_at?: string;
  transaction_items?: TransactionItem[];
}

export interface TransactionItem {
  id: string;
  transaction_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at?: string;
  product?: Product;
}

export interface StoreSettings {
  id: string;
  store_name: string;
  address?: string;
  phone?: string;
  email?: string;
  tax_id?: string;
  receipt_header?: string;
  receipt_footer?: string;
  logo?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "cashier" | "inventory";
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UISettings {
  id: string;
  user_id?: string;
  settings: any;
  created_at?: string;
  updated_at?: string;
}
