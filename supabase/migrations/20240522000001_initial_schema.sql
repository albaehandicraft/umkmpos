-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  cost INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  category TEXT NOT NULL,
  sku TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  reorder_level INTEGER NOT NULL DEFAULT 5,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number TEXT NOT NULL UNIQUE,
  date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  subtotal INTEGER NOT NULL,
  tax INTEGER NOT NULL,
  total INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  cashier_name TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create transaction_items table
CREATE TABLE IF NOT EXISTS transaction_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create store_settings table
CREATE TABLE IF NOT EXISTS store_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  tax_id TEXT,
  receipt_header TEXT,
  receipt_footer TEXT,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'cashier',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create ui_settings table
CREATE TABLE IF NOT EXISTS ui_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ui_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public read access for products" ON products;
CREATE POLICY "Public read access for products"
  ON products FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true);

-- Similar policies for other tables
DROP POLICY IF EXISTS "Public read access for categories" ON categories;
CREATE POLICY "Public read access for categories"
  ON categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
CREATE POLICY "Authenticated users can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read access for transactions" ON transactions;
CREATE POLICY "Public read access for transactions"
  ON transactions FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage transactions" ON transactions;
CREATE POLICY "Authenticated users can manage transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read access for transaction_items" ON transaction_items;
CREATE POLICY "Public read access for transaction_items"
  ON transaction_items FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage transaction_items" ON transaction_items;
CREATE POLICY "Authenticated users can manage transaction_items"
  ON transaction_items FOR ALL
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read access for store_settings" ON store_settings;
CREATE POLICY "Public read access for store_settings"
  ON store_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage store_settings" ON store_settings;
CREATE POLICY "Authenticated users can manage store_settings"
  ON store_settings FOR ALL
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can read their own data" ON users;
CREATE POLICY "Users can read their own data"
  ON users FOR SELECT
  USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

DROP POLICY IF EXISTS "Admin users can manage all users" ON users;
CREATE POLICY "Admin users can manage all users"
  ON users FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

DROP POLICY IF EXISTS "Users can read their own UI settings" ON ui_settings;
CREATE POLICY "Users can read their own UI settings"
  ON ui_settings FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can update their own UI settings" ON ui_settings;
CREATE POLICY "Users can update their own UI settings"
  ON ui_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Enable realtime for all tables
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table categories;
alter publication supabase_realtime add table transactions;
alter publication supabase_realtime add table transaction_items;
alter publication supabase_realtime add table store_settings;
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table ui_settings;

-- Insert default categories
INSERT INTO categories (name) VALUES ('Makanan'), ('Minuman'), ('Snack')
ON CONFLICT (name) DO NOTHING;

-- Insert default store settings
INSERT INTO store_settings (store_name, address, phone, email, receipt_header, receipt_footer)
VALUES ('Warung Barokah', 'Jl. Pahlawan No. 123, Bandung, Jawa Barat', '081234567890', 'warungbarokah@example.com', 'Terima kasih telah berbelanja di Warung Barokah', 'Barang yang sudah dibeli tidak dapat dikembalikan')
ON CONFLICT DO NOTHING;
