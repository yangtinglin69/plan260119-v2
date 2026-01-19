-- ========================================
-- Supabase 資料表建立腳本
-- 在 Supabase Dashboard → SQL Editor 執行
-- ========================================

-- 1. 網站設定表
CREATE TABLE site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'BestMattressLab',
  tagline TEXT DEFAULT 'Find Your Perfect Sleep',
  logo TEXT DEFAULT '/images/logo.png',
  favicon TEXT DEFAULT '/images/favicon.ico',
  seo JSONB DEFAULT '{
    "title": "Best Mattress 2025: Top 10 Mattresses Reviewed",
    "description": "Our sleep experts tested 50+ mattresses to find the best options for every sleeper.",
    "keywords": ["best mattress", "mattress reviews"],
    "ogImage": "/images/og-image.jpg"
  }'::jsonb,
  colors JSONB DEFAULT '{
    "primary": "#1e3a5f",
    "secondary": "#0f172a",
    "accent": "#f59e0b",
    "headerBg": "#1e3a5f",
    "headerText": "#ffffff",
    "footerBg": "#0f172a",
    "footerText": "#ffffff",
    "buttonBg": "#f59e0b",
    "buttonText": "#000000",
    "buttonHover": "#d97706"
  }'::jsonb,
  typography JSONB DEFAULT '{
    "headingWeight": "700",
    "bodyWeight": "400",
    "headingItalic": false,
    "bodyItalic": false
  }'::jsonb,
  tracking JSONB DEFAULT '{
    "gaId": "",
    "gtmId": "",
    "fbPixelId": "",
    "customHead": ""
  }'::jsonb,
  ai JSONB DEFAULT '{
    "openaiKey": "",
    "model": "gpt-4o-mini",
    "language": "en"
  }'::jsonb,
  adsense JSONB DEFAULT '{
    "enabled": false,
    "publisherId": "",
    "slots": {
      "header": "",
      "sidebar": "",
      "inFeed": "",
      "inArticle": "",
      "footer": ""
    }
  }'::jsonb,
  footer JSONB DEFAULT '{
    "disclaimer": "Disclosure: We may earn a commission when you purchase through links on our site.",
    "copyright": "© 2025 BestMattressLab. All rights reserved."
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 產品表
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rank INTEGER NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  badge TEXT DEFAULT '',
  name TEXT NOT NULL,
  tagline TEXT DEFAULT '',
  price JSONB DEFAULT '{"original": 0, "current": 0, "currency": "USD"}'::jsonb,
  rating DECIMAL(3,1) DEFAULT 0,
  images JSONB DEFAULT '{"main": "", "gallery": []}'::jsonb,
  specs JSONB DEFAULT '[]'::jsonb,
  best_for JSONB DEFAULT '[]'::jsonb,
  not_best_for JSONB DEFAULT '[]'::jsonb,
  brief_review TEXT DEFAULT '',
  full_review TEXT DEFAULT '',
  materials JSONB DEFAULT '[]'::jsonb,
  scores JSONB DEFAULT '[]'::jsonb,
  pros JSONB DEFAULT '[]'::jsonb,
  cons JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  affiliate_link TEXT DEFAULT '',
  cta_text TEXT DEFAULT 'Shop Now →',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 模組表
CREATE TABLE modules (
  id TEXT PRIMARY KEY,
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 建立更新時間觸發器
-- ========================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_modules_updated_at
  BEFORE UPDATE ON modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ========================================
-- 開啟 Row Level Security (RLS)
-- 設定為公開讀取，需要認證才能寫入
-- ========================================

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

-- 公開讀取
CREATE POLICY "Allow public read site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read modules" ON modules FOR SELECT USING (true);

-- 允許所有人寫入（簡化版，正式環境建議加上認證）
CREATE POLICY "Allow all write site_config" ON site_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all write products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all write modules" ON modules FOR ALL USING (true) WITH CHECK (true);
