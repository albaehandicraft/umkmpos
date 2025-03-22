export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bills: {
        Row: {
          created_at: string
          id: string
          jenis: string
          jumlah: number
          resident_id: string | null
          status: string
          tanggal_pembayaran: string | null
          tanggal_tagihan: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          jenis: string
          jumlah: number
          resident_id?: string | null
          status: string
          tanggal_pembayaran?: string | null
          tanggal_tagihan?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          jenis?: string
          jumlah?: number
          resident_id?: string | null
          status?: string
          tanggal_pembayaran?: string | null
          tanggal_tagihan?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bills_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "residents"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          id: string
          jenis_document: string
          keterangan: string | null
          nama_file: string
          resident_id: string | null
          tanggal_upload: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          jenis_document: string
          keterangan?: string | null
          nama_file: string
          resident_id?: string | null
          tanggal_upload?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          jenis_document?: string
          keterangan?: string | null
          nama_file?: string
          resident_id?: string | null
          tanggal_upload?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "residents"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          bill_id: string
          bukti_pembayaran: string | null
          catatan: string | null
          created_at: string
          id: string
          jumlah_dibayar: number
          resident_id: string
          tanggal_jatuh_tempo: string
          tanggal_pembayaran: string | null
          updated_at: string
        }
        Insert: {
          bill_id: string
          bukti_pembayaran?: string | null
          catatan?: string | null
          created_at?: string
          id?: string
          jumlah_dibayar: number
          resident_id: string
          tanggal_jatuh_tempo: string
          tanggal_pembayaran?: string | null
          updated_at?: string
        }
        Update: {
          bill_id?: string
          bukti_pembayaran?: string | null
          catatan?: string | null
          created_at?: string
          id?: string
          jumlah_dibayar?: number
          resident_id?: string
          tanggal_jatuh_tempo?: string
          tanggal_pembayaran?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_bill_id_fkey"
            columns: ["bill_id"]
            isOneToOne: false
            referencedRelation: "bills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "residents"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          cost: number
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          is_active: boolean
          name: string
          price: number
          reorder_level: number
          sku: string | null
          stock: number
          updated_at: string | null
        }
        Insert: {
          category: string
          cost?: number
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          is_active?: boolean
          name: string
          price: number
          reorder_level?: number
          sku?: string | null
          stock?: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          cost?: number
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          is_active?: boolean
          name?: string
          price?: number
          reorder_level?: number
          sku?: string | null
          stock?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      residents: {
        Row: {
          alamat: string | null
          created_at: string
          email: string | null
          id: string
          nama: string
          nik: string | null
          no_hp: string | null
          nomor_kk: string | null
          nomor_rumah: string | null
          status_kk: string | null
          tanggal_bergabung: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          alamat?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nama: string
          nik?: string | null
          no_hp?: string | null
          nomor_kk?: string | null
          nomor_rumah?: string | null
          status_kk?: string | null
          tanggal_bergabung?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          alamat?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nama?: string
          nik?: string | null
          no_hp?: string | null
          nomor_kk?: string | null
          nomor_rumah?: string | null
          status_kk?: string | null
          tanggal_bergabung?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      store_settings: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          logo: string | null
          phone: string | null
          receipt_footer: string | null
          receipt_header: string | null
          store_name: string
          tax_id: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          phone?: string | null
          receipt_footer?: string | null
          receipt_header?: string | null
          store_name: string
          tax_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          phone?: string | null
          receipt_footer?: string | null
          receipt_header?: string | null
          store_name?: string
          tax_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transaction_items: {
        Row: {
          created_at: string | null
          id: string
          price: number
          product_id: string
          quantity: number
          transaction_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          price: number
          product_id: string
          quantity: number
          transaction_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          price?: number
          product_id?: string
          quantity?: number
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_items_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          cashier_name: string | null
          created_at: string | null
          date: string | null
          id: string
          payment_method: string
          receipt_number: string
          status: string
          subtotal: number
          tax: number
          total: number
          updated_at: string | null
        }
        Insert: {
          cashier_name?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          payment_method: string
          receipt_number: string
          status?: string
          subtotal: number
          tax: number
          total: number
          updated_at?: string | null
        }
        Update: {
          cashier_name?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          payment_method?: string
          receipt_number?: string
          status?: string
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      ui_settings: {
        Row: {
          created_at: string | null
          id: string
          settings: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          settings?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          settings?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ui_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean
          name: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          is_active?: boolean
          name: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean
          name?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
