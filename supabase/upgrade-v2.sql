-- ========================================
-- 升級腳本 v2：為現有資料庫加入新欄位
-- 在 Supabase SQL Editor 執行
-- ========================================

-- 步驟 1：先新增欄位（如果不存在）
DO $$
BEGIN
  -- 新增 typography 欄位
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'site_config' AND column_name = 'typography'
  ) THEN
    ALTER TABLE site_config ADD COLUMN typography JSONB DEFAULT '{
      "headingWeight": "700",
      "bodyWeight": "400",
      "headingItalic": false,
      "bodyItalic": false
    }'::jsonb;
    RAISE NOTICE 'Added typography column';
  END IF;

  -- 新增 tracking 欄位
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'site_config' AND column_name = 'tracking'
  ) THEN
    ALTER TABLE site_config ADD COLUMN tracking JSONB DEFAULT '{
      "gaId": "",
      "gtmId": "",
      "fbPixelId": "",
      "customHead": ""
    }'::jsonb;
    RAISE NOTICE 'Added tracking column';
  END IF;

  -- 新增 ai 欄位
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'site_config' AND column_name = 'ai'
  ) THEN
    ALTER TABLE site_config ADD COLUMN ai JSONB DEFAULT '{
      "openaiKey": "",
      "model": "gpt-4o-mini",
      "language": "en"
    }'::jsonb;
    RAISE NOTICE 'Added ai column';
  END IF;
END $$;

-- 步驟 2：更新 colors 欄位，加入新的顏色（如果缺少）
UPDATE site_config SET 
  colors = colors || '{
    "headerBg": "#1e3a5f",
    "headerText": "#ffffff",
    "footerBg": "#0f172a",
    "footerText": "#ffffff",
    "buttonBg": "#f59e0b",
    "buttonText": "#000000",
    "buttonHover": "#d97706"
  }'::jsonb
WHERE NOT (colors ? 'headerBg');

-- 步驟 3：確保新欄位有預設值
UPDATE site_config SET 
  typography = '{
    "headingWeight": "700",
    "bodyWeight": "400",
    "headingItalic": false,
    "bodyItalic": false
  }'::jsonb
WHERE typography IS NULL;

UPDATE site_config SET 
  tracking = '{
    "gaId": "",
    "gtmId": "",
    "fbPixelId": "",
    "customHead": ""
  }'::jsonb
WHERE tracking IS NULL;

UPDATE site_config SET 
  ai = '{
    "openaiKey": "",
    "model": "gpt-4o-mini",
    "language": "en"
  }'::jsonb
WHERE ai IS NULL;

-- 步驟 4：驗證結果
SELECT 
  name,
  jsonb_pretty(colors) as colors,
  jsonb_pretty(typography) as typography,
  jsonb_pretty(tracking) as tracking,
  jsonb_pretty(ai) as ai
FROM site_config;
