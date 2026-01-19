-- ========================================
-- 種子資料 - 初始化內容
-- 在 schema.sql 之後執行
-- ========================================

-- 1. 插入網站設定
INSERT INTO site_config (name, tagline, seo, colors, typography, tracking, footer) VALUES (
  'BestMattressLab',
  'Find Your Perfect Sleep',
  '{
    "title": "Best Mattress 2025: Top 10 Mattresses Reviewed & Compared",
    "description": "Our sleep experts tested 50+ mattresses to find the best options for every sleeper. Compare top-rated mattresses with honest reviews, prices, and exclusive discounts.",
    "keywords": ["best mattress", "mattress reviews", "mattress comparison", "memory foam mattress", "hybrid mattress"],
    "ogImage": "/images/og-image.jpg"
  }'::jsonb,
  '{
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
  '{
    "headingWeight": "700",
    "bodyWeight": "400",
    "headingItalic": false,
    "bodyItalic": false
  }'::jsonb,
  '{
    "gaId": "",
    "gtmId": "",
    "fbPixelId": "",
    "customHead": ""
  }'::jsonb,
  '{
    "disclaimer": "Disclosure: We may earn a commission when you purchase through links on our site. This does not affect our reviews, which are based on extensive testing and research.",
    "copyright": "© 2025 BestMattressLab. All rights reserved."
  }'::jsonb
);

-- 2. 插入模組
INSERT INTO modules (id, enabled, display_order, content) VALUES
('hero', true, 1, '{
  "badge": "🏆 2025 Expert Rankings",
  "headline": "Tired of Waking Up with Back Pain?",
  "subheadline": "You''ve tried mattress after mattress, read countless reviews, and still can''t find the right one.\nWhat if the problem isn''t you — it''s your method of choosing?",
  "highlight": "Stop guessing.\nOur sleep experts tested 50+ mattresses so you don''t have to.\nFind your perfect match in minutes.",
  "ctaText": "Find My Perfect Mattress →",
  "ctaLink": "#products",
  "backgroundImage": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920"
}'::jsonb),

('painPoints', true, 2, '{
  "title": "Sound Familiar?",
  "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
  "points": [
    {"icon": "😫", "text": "You wake up every morning with aches and pains that weren''t there before bed"},
    {"icon": "🔄", "text": "You''ve bought \"top-rated\" mattresses that felt great in-store but terrible at home"},
    {"icon": "💸", "text": "You''ve spent thousands on mattresses that wore out in just a few years"},
    {"icon": "🤔", "text": "You''re overwhelmed by options and don''t know if you need soft, firm, foam, or hybrid"},
    {"icon": "😔", "text": "You''re starting to wonder if maybe you''re just not meant to sleep well"}
  ]
}'::jsonb),

('story', true, 3, '{
  "title": "I''ve Been Where You Are",
  "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
  "paragraphs": [
    "I know exactly how frustrating this is — because I''ve lived it.",
    "For years, I woke up stiff and tired no matter what mattress I slept on. Memory foam. Innerspring. Hybrid. Nothing worked.",
    "That''s when I started digging into the science of sleep. Not marketing claims. Real research.",
    "What I discovered changed everything: There''s no ''best mattress.'' There''s only the best mattress FOR YOU."
  ]
}'::jsonb),

('method', true, 4, '{
  "title": "How We Test & Rate Mattresses",
  "subtitle": "This isn''t opinion — it''s methodology.",
  "features": [
    {"icon": "🔬", "title": "Pressure Mapping", "description": "We use clinical-grade sensors to measure pressure distribution"},
    {"icon": "💤", "title": "60+ Night Testing", "description": "Each mattress is tested for at least 60 nights"},
    {"icon": "📊", "title": "Durability Analysis", "description": "We simulate 10 years of use to evaluate long-term support"},
    {"icon": "🎯", "title": "Matched Recommendations", "description": "We recommend based on YOUR needs, not highest commission"}
  ]
}'::jsonb),

('comparison', true, 5, '{
  "title": "Quick Match: Which Mattress Fits You?",
  "subtitle": "Find your type, find your mattress",
  "rows": [
    {"type": "😴 Side Sleeper", "product": "Helix Midnight Luxe", "benefit": "✓ Pressure relief for shoulders & hips"},
    {"type": "🏥 Back Pain", "product": "Saatva Classic", "benefit": "✓ Zoned lumbar support system"},
    {"type": "🥵 Hot Sleeper", "product": "Brooklyn Aurora", "benefit": "✓ Phase-change cooling technology"},
    {"type": "💰 Budget-Friendly", "product": "Nectar", "benefit": "✓ Quality at unbeatable price"},
    {"type": "💑 Couples", "product": "DreamCloud", "benefit": "✓ Motion isolation + edge support"},
    {"type": "🌱 Eco-Conscious", "product": "Avocado Green", "benefit": "✓ Certified organic materials"}
  ]
}'::jsonb),

('products', true, 6, '{
  "title": "2025 Best Mattresses: Our Top 10 Picks",
  "subtitle": "Click any mattress to see the full review and exclusive discounts",
  "showCount": 10
}'::jsonb),

('testimonials', true, 7, '{
  "title": "What Our Readers Say",
  "subtitle": "Real people who found their perfect mattress through our guide",
  "items": [
    {"name": "Michael R.", "avatar": "👨‍💼", "product": "Bought WinkBed", "rating": 5, "text": "After years of waking up with lower back pain, I finally found relief. The WinkBed''s lumbar support is no joke."},
    {"name": "Sarah T.", "avatar": "👩", "product": "Bought DreamCloud", "rating": 5, "text": "I was skeptical of buying a mattress online, but the 365-night trial convinced me. Best decision ever."},
    {"name": "James L.", "avatar": "👨", "product": "Bought Nectar", "rating": 4, "text": "On a tight budget but needed something better. Nectar delivered way more quality than I expected."},
    {"name": "Emily K.", "avatar": "👩‍🦰", "product": "Bought Brooklyn Aurora", "rating": 5, "text": "As someone who runs hot at night, I''ve finally stopped waking up sweating. Game changer."}
  ]
}'::jsonb),

('faq', true, 8, '{
  "title": "Frequently Asked Questions",
  "subtitle": "Everything you need to know before buying",
  "items": [
    {"question": "How do I know which firmness is right for me?", "answer": "Your ideal firmness depends on sleep position and body weight. Side sleepers generally need softer mattresses (4-5). Back sleepers do well with medium (5-6). Stomach sleepers need firmer options (7-8)."},
    {"question": "Can I really trust mattress reviews online?", "answer": "Healthy skepticism is wise! That''s why we prioritize transparency. We disclose affiliate relationships, explain our methodology, and include negatives along with positives."},
    {"question": "What if I don''t like the mattress after I buy it?", "answer": "Every mattress we recommend comes with at least a 100-night trial, and many offer 365 nights. If it''s not right, you get a full refund."},
    {"question": "How long should a good mattress last?", "answer": "Quality mattresses should maintain proper support for 7-10 years. We factor durability into our ratings."}
  ]
}'::jsonb);

-- 3. 插入產品資料 (前3個示範，其他類似)
INSERT INTO products (rank, slug, badge, name, tagline, price, rating, images, specs, best_for, not_best_for, brief_review, full_review, materials, scores, pros, cons, faqs, affiliate_link, cta_text) VALUES

(1, 'winkbed', '🏆 Most Comfortable', 'WinkBed', 'High-end hybrid bed providing ample support, cushion, and cool sleep',
'{"original": 1799, "current": 1299, "currency": "USD"}'::jsonb,
9.4,
'{"main": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Innerspring Hybrid"}, {"label": "Firmness", "value": "Medium Soft to Firm (4-7)"}, {"label": "Trial Period", "value": "120 nights"}, {"label": "Warranty", "value": "Lifetime"}]'::jsonb,
'["Back pain sufferers", "Side sleepers", "Couples", "Hot sleepers", "Quality seekers"]'::jsonb,
'["Budget shoppers", "Those who prefer all-foam", "Ultra-soft preference"]'::jsonb,
'WinkBed combines classic innerspring support with modern comfort layers. The moment you lie down, you feel fully supported without sinking in.',
'After testing the WinkBed for over 60 nights, I can confidently say it''s one of the best hybrid mattresses on the market. The Euro-top provides immediate comfort, while the pocketed coils deliver exceptional support.\n\nThe zoned lumbar support is particularly impressive - it provides firmer support in the middle third where most people need it most.',
'[{"layer": "Euro-Top", "description": "Gel-infused foam for cooling comfort"}, {"layer": "Comfort Layer", "description": "AirCell foam for pressure relief"}, {"layer": "Support Core", "description": "Individually pocketed coils"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 4.5}, {"label": "Support", "score": 5}, {"label": "Temperature", "score": 4.5}, {"label": "Edge Support", "score": 5}, {"label": "Motion Isolation", "score": 4}, {"label": "Value", "score": 4}]'::jsonb,
'["Exceptional lumbar support system", "4 firmness options available", "Excellent edge support", "Lifetime warranty included", "Made in USA"]'::jsonb,
'["Higher price point", "Heavier than foam mattresses", "May be too firm for some"]'::jsonb,
'[{"question": "What firmness should I choose?", "answer": "Side sleepers typically prefer Softer (4) or Luxury Firm (6). Back sleepers do well with Luxury Firm (6)."}, {"question": "How long does it take to break in?", "answer": "Most sleepers notice the mattress fully conforming within 2-4 weeks."}]'::jsonb,
'https://www.winkbeds.com/?ref=affiliate',
'Shop WinkBed →'),

(2, 'dreamcloud', '💰 Best Value', 'DreamCloud Premier', 'Luxury hybrid mattress at an affordable price with 365-night trial',
'{"original": 1332, "current": 799, "currency": "USD"}'::jsonb,
8.9,
'{"main": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Hybrid"}, {"label": "Firmness", "value": "Medium Firm (6)"}, {"label": "Trial Period", "value": "365 nights"}, {"label": "Warranty", "value": "Lifetime"}]'::jsonb,
'["Budget-conscious buyers", "Back sleepers", "Couples", "Those wanting long trial"]'::jsonb,
'["Strict side sleepers", "Those preferring soft beds", "Lightweight individuals"]'::jsonb,
'DreamCloud delivers luxury hotel-quality sleep at a fraction of the price. The 365-night trial gives you a full year to decide.',
'DreamCloud has positioned itself as the go-to option for shoppers who want premium features without the premium price tag. The cashmere-blend cover feels genuinely luxurious.',
'[{"layer": "Cashmere Top", "description": "Soft, breathable cashmere blend cover"}, {"layer": "Gel Memory Foam", "description": "Cooling gel-infused comfort layer"}, {"layer": "Pocketed Coils", "description": "Individually wrapped for motion isolation"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 4}, {"label": "Support", "score": 4.5}, {"label": "Temperature", "score": 4}, {"label": "Edge Support", "score": 3.5}, {"label": "Motion Isolation", "score": 4.5}, {"label": "Value", "score": 5}]'::jsonb,
'["365-night trial period", "Lifetime warranty", "Excellent price point", "Luxurious cashmere cover", "Good motion isolation"]'::jsonb,
'["May be too firm for side sleepers", "Only one firmness option", "Edge support could be better"]'::jsonb,
'[{"question": "Is the 365-night trial really risk-free?", "answer": "Yes! DreamCloud offers free returns within 365 nights."}]'::jsonb,
'https://www.dreamcloudsleep.com/?ref=affiliate',
'Shop DreamCloud →'),

(3, 'saatva-classic', '🏥 Best for Back Pain', 'Saatva Classic', 'America''s best-selling online luxury innerspring mattress',
'{"original": 1995, "current": 1595, "currency": "USD"}'::jsonb,
9.2,
'{"main": "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Innerspring"}, {"label": "Firmness", "value": "3 Options (Plush to Firm)"}, {"label": "Trial Period", "value": "365 nights"}, {"label": "Warranty", "value": "Lifetime"}]'::jsonb,
'["Back pain sufferers", "Traditional mattress lovers", "Those wanting in-home setup", "Hot sleepers"]'::jsonb,
'["Memory foam enthusiasts", "Budget shoppers", "Those in small spaces"]'::jsonb,
'Saatva Classic offers the traditional innerspring feel with modern upgrades. The free white-glove delivery adds significant value.',
'Saatva has been a pioneer in the online mattress space. The dual-coil system creates exceptional support and durability.',
'[{"layer": "Euro Pillow Top", "description": "Plush comfort with pillow-top coils"}, {"layer": "Lumbar Support", "description": "Zoned support for lower back"}, {"layer": "Dual Coil System", "description": "13-gauge recycled steel coils"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 4}, {"label": "Support", "score": 5}, {"label": "Temperature", "score": 5}, {"label": "Edge Support", "score": 5}, {"label": "Motion Isolation", "score": 3.5}, {"label": "Value", "score": 4}]'::jsonb,
'["Excellent for back pain", "Free white-glove delivery", "Old mattress removal included", "3 firmness + 2 height options", "Very breathable"]'::jsonb,
'["Higher price point", "Not compressed shipping", "Some motion transfer"]'::jsonb,
'[{"question": "Which firmness is best for back pain?", "answer": "Most back pain sufferers do best with the Luxury Firm option."}]'::jsonb,
'https://www.saatva.com/?ref=affiliate',
'Shop Saatva →'),

(4, 'helix-midnight', '🌙 Best for Side Sleepers', 'Helix Midnight Luxe', 'Specifically designed for side sleepers with zoned support',
'{"original": 2373, "current": 1799, "currency": "USD"}'::jsonb,
9.0,
'{"main": "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Hybrid"}, {"label": "Firmness", "value": "Medium (5)"}, {"label": "Trial Period", "value": "100 nights"}, {"label": "Warranty", "value": "15 years"}]'::jsonb,
'["Side sleepers", "Couples with different preferences", "Shoulder/hip pain sufferers"]'::jsonb,
'["Stomach sleepers", "Those wanting ultra-firm", "Budget shoppers"]'::jsonb,
'Helix Midnight Luxe is engineered specifically for side sleepers with enhanced cushioning at pressure points.',
'Helix takes a unique approach - they offer a sleep quiz to match you with the right mattress.',
'[{"layer": "GlacioTex Cover", "description": "Advanced cooling fabric"}, {"layer": "Memory Plus Foam", "description": "Body-contouring pressure relief"}, {"layer": "Wrapped Coils", "description": "Individually pocketed springs"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 5}, {"label": "Support", "score": 4.5}, {"label": "Temperature", "score": 4.5}, {"label": "Edge Support", "score": 4}, {"label": "Motion Isolation", "score": 4.5}, {"label": "Value", "score": 4}]'::jsonb,
'["Perfect for side sleepers", "Excellent pressure relief", "Split firmness available", "Advanced cooling technology"]'::jsonb,
'["Premium price", "Only 100-night trial", "May be too soft for some"]'::jsonb,
'[{"question": "Can I get different firmnesses for each side?", "answer": "Yes! Helix offers a Dual Comfort option."}]'::jsonb,
'https://www.helixsleep.com/products/midnight-luxe?ref=affiliate',
'Shop Helix →'),

(5, 'brooklyn-aurora', '❄️ Best for Hot Sleepers', 'Brooklyn Bedding Aurora Luxe', 'Advanced cooling technology for the hottest sleepers',
'{"original": 2124, "current": 1699, "currency": "USD"}'::jsonb,
8.8,
'{"main": "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Hybrid"}, {"label": "Firmness", "value": "3 Options Available"}, {"label": "Trial Period", "value": "120 nights"}, {"label": "Warranty", "value": "10 years"}]'::jsonb,
'["Hot sleepers", "Night sweaters", "Those in warm climates"]'::jsonb,
'["Budget shoppers", "Those who sleep cold"]'::jsonb,
'Brooklyn Bedding Aurora Luxe uses CopperFlex foam and phase-change material to create the coolest-sleeping hybrid.',
'If you''ve ever woken up in a pool of sweat, the Aurora Luxe might be your solution.',
'[{"layer": "Phase-Change Cover", "description": "Actively regulates temperature"}, {"layer": "CopperFlex Foam", "description": "Copper-infused cooling foam"}, {"layer": "Quantum Edge Coils", "description": "Encased coils with edge support"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 4.5}, {"label": "Support", "score": 4}, {"label": "Temperature", "score": 5}, {"label": "Edge Support", "score": 4.5}, {"label": "Motion Isolation", "score": 4}, {"label": "Value", "score": 4}]'::jsonb,
'["Industry-leading cooling", "3 firmness options", "Made in USA", "Great edge support"]'::jsonb,
'["Shorter warranty than others", "Higher price point"]'::jsonb,
'[{"question": "How much cooler does it actually sleep?", "answer": "In our testing, the Aurora Luxe surface temperature was 3-4°F cooler than standard mattresses."}]'::jsonb,
'https://www.brooklynbedding.com/products/aurora-luxe?ref=affiliate',
'Shop Brooklyn →'),

(6, 'nectar', '🎯 Best Budget Option', 'Nectar Memory Foam', 'Quality memory foam sleep at an unbeatable price',
'{"original": 1099, "current": 649, "currency": "USD"}'::jsonb,
8.5,
'{"main": "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Memory Foam"}, {"label": "Firmness", "value": "Medium Firm (6)"}, {"label": "Trial Period", "value": "365 nights"}, {"label": "Warranty", "value": "Lifetime"}]'::jsonb,
'["Budget shoppers", "Memory foam lovers", "Average weight sleepers"]'::jsonb,
'["Heavy individuals (250+ lbs)", "Hot sleepers"]'::jsonb,
'Nectar proves you don''t need to spend a fortune for quality memory foam.',
'Nectar has disrupted the mattress industry by offering genuine quality at a price point that undercuts most competitors.',
'[{"layer": "Cooling Cover", "description": "Breathable quilted cover"}, {"layer": "Gel Memory Foam", "description": "2\" cooling gel comfort layer"}, {"layer": "Base Foam", "description": "High-density foundation"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 4.5}, {"label": "Support", "score": 3.5}, {"label": "Temperature", "score": 3}, {"label": "Edge Support", "score": 3}, {"label": "Motion Isolation", "score": 5}, {"label": "Value", "score": 5}]'::jsonb,
'["Incredible value", "365-night trial", "Lifetime warranty", "Great pressure relief"]'::jsonb,
'["Sleeps warm", "Limited support for heavier people", "Only one firmness option"]'::jsonb,
'[{"question": "Is Nectar good for heavy sleepers?", "answer": "Nectar works best for sleepers under 230 lbs."}]'::jsonb,
'https://www.nectarsleep.com/?ref=affiliate',
'Shop Nectar →'),

(7, 'purple', '🔬 Most Innovative', 'Purple Mattress', 'The Purple Grid technology you can''t find anywhere else',
'{"original": 1499, "current": 1399, "currency": "USD"}'::jsonb,
8.7,
'{"main": "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Purple Grid Hybrid"}, {"label": "Firmness", "value": "Medium (5)"}, {"label": "Trial Period", "value": "100 nights"}, {"label": "Warranty", "value": "10 years"}]'::jsonb,
'["Those seeking unique feel", "Back sleepers", "Hot sleepers"]'::jsonb,
'["Traditional foam lovers", "Very light sleepers"]'::jsonb,
'Purple''s proprietary Grid technology offers a completely unique sleeping experience.',
'Purple changed the mattress game with their Grid technology. This isn''t memory foam, latex, or traditional coils - it''s something entirely different.',
'[{"layer": "SoftFlex Cover", "description": "Stretchy, breathable fabric"}, {"layer": "Purple Grid", "description": "2\" hyper-elastic polymer grid"}, {"layer": "Responsive Coils", "description": "Pocketed coil support"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 5}, {"label": "Support", "score": 4.5}, {"label": "Temperature", "score": 5}, {"label": "Edge Support", "score": 4}, {"label": "Motion Isolation", "score": 4}, {"label": "Value", "score": 3.5}]'::jsonb,
'["Completely unique feel", "Excellent pressure relief", "Very temperature neutral", "Durable construction"]'::jsonb,
'["Unusual feel isn''t for everyone", "Heavy and hard to move", "Only 100-night trial"]'::jsonb,
'[{"question": "What does the Purple Grid actually feel like?", "answer": "It''s hard to describe - firm yet soft, supportive yet pressure-relieving."}]'::jsonb,
'https://www.purple.com/?ref=affiliate',
'Shop Purple →'),

(8, 'bear-elite', '💪 Best for Athletes', 'Bear Elite Hybrid', 'Designed for active recovery with Celliant technology',
'{"original": 2215, "current": 1772, "currency": "USD"}'::jsonb,
8.6,
'{"main": "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Hybrid"}, {"label": "Firmness", "value": "3 Options Available"}, {"label": "Trial Period", "value": "120 nights"}, {"label": "Warranty", "value": "Lifetime"}]'::jsonb,
'["Athletes and active individuals", "Those with muscle soreness", "Recovery-focused sleepers"]'::jsonb,
'["Budget shoppers", "Those skeptical of recovery claims"]'::jsonb,
'Bear Elite Hybrid combines responsive foam with Celliant technology for enhanced muscle recovery.',
'Bear has positioned itself as the mattress for athletes, and the Elite Hybrid is their flagship product.',
'[{"layer": "Celliant Cover", "description": "Infrared energy conversion"}, {"layer": "Copper Memory Foam", "description": "Cooling and antimicrobial"}, {"layer": "Zoned Coils", "description": "Targeted support zones"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 4.5}, {"label": "Support", "score": 4.5}, {"label": "Temperature", "score": 4.5}, {"label": "Edge Support", "score": 4}, {"label": "Motion Isolation", "score": 4}, {"label": "Value", "score": 3.5}]'::jsonb,
'["Celliant recovery technology", "Copper-infused cooling", "3 firmness options", "Lifetime warranty"]'::jsonb,
'["Premium pricing", "Recovery benefits debated"]'::jsonb,
'[{"question": "Does Celliant technology really work?", "answer": "Celliant is FDA-determined to increase blood flow. Studies show potential benefits."}]'::jsonb,
'https://www.bearmattress.com/products/bear-elite-hybrid?ref=affiliate',
'Shop Bear →'),

(9, 'avocado-green', '🌱 Best Organic', 'Avocado Green Mattress', 'Certified organic mattress made with natural latex and wool',
'{"original": 1999, "current": 1799, "currency": "USD"}'::jsonb,
8.5,
'{"main": "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Latex Hybrid"}, {"label": "Firmness", "value": "Gentle Firm (7)"}, {"label": "Trial Period", "value": "365 nights"}, {"label": "Warranty", "value": "25 years"}]'::jsonb,
'["Eco-conscious buyers", "Those avoiding chemicals", "Natural latex lovers"]'::jsonb,
'["Budget shoppers", "Those wanting soft beds"]'::jsonb,
'Avocado Green is the gold standard for organic mattresses - GOTS certified organic.',
'If environmental impact and chemical exposure matter to you, Avocado Green is likely your best option.',
'[{"layer": "Organic Cotton Cover", "description": "GOTS certified organic cotton"}, {"layer": "Organic Wool", "description": "Natural flame barrier"}, {"layer": "Organic Dunlop Latex", "description": "GOLS certified responsive comfort"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 4}, {"label": "Support", "score": 5}, {"label": "Temperature", "score": 5}, {"label": "Edge Support", "score": 4.5}, {"label": "Motion Isolation", "score": 3.5}, {"label": "Value", "score": 4}]'::jsonb,
'["Genuinely organic certified", "No chemical flame retardants", "Extremely durable (25yr warranty)", "Made in USA"]'::jsonb,
'["Premium price point", "Firmer than average", "Some motion transfer"]'::jsonb,
'[{"question": "What certifications does Avocado have?", "answer": "GOTS (organic textiles), GOLS (organic latex), GREENGUARD Gold."}]'::jsonb,
'https://www.avocadogreenmattress.com/?ref=affiliate',
'Shop Avocado →'),

(10, 'tempur-pedic', '👑 Luxury Pick', 'Tempur-Pedic TEMPUR-Adapt', 'NASA-developed memory foam technology from the original innovator',
'{"original": 2299, "current": 2099, "currency": "USD"}'::jsonb,
8.4,
'{"main": "https://images.unsplash.com/photo-1587557686929-e41ffa0a22f9?w=600", "gallery": []}'::jsonb,
'[{"label": "Type", "value": "Memory Foam"}, {"label": "Firmness", "value": "Medium (5)"}, {"label": "Trial Period", "value": "90 nights"}, {"label": "Warranty", "value": "10 years"}]'::jsonb,
'["True memory foam enthusiasts", "Those with chronic pain", "Side sleepers"]'::jsonb,
'["Budget shoppers", "Hot sleepers", "Those wanting bouncy feel"]'::jsonb,
'Tempur-Pedic invented memory foam for consumers and the TEMPUR-Adapt continues their legacy.',
'Tempur-Pedic is the name that started the memory foam mattress revolution.',
'[{"layer": "SmartClimate Cover", "description": "Cool-to-touch fabric"}, {"layer": "TEMPUR-ES Comfort", "description": "Extra-soft conforming layer"}, {"layer": "TEMPUR Support", "description": "Signature pressure relief"}]'::jsonb,
'[{"label": "Pressure Relief", "score": 5}, {"label": "Support", "score": 4}, {"label": "Temperature", "score": 3}, {"label": "Edge Support", "score": 3}, {"label": "Motion Isolation", "score": 5}, {"label": "Value", "score": 3}]'::jsonb,
'["Unmatched pressure relief", "Original memory foam pioneer", "Excellent for chronic pain", "Superior motion isolation"]'::jsonb,
'["Very expensive", "Sleeps warm", "Only 90-night trial", "Slow response feel"]'::jsonb,
'[{"question": "Is Tempur-Pedic worth the price?", "answer": "For chronic pain sufferers who need maximum conforming, Tempur-Pedic can be life-changing."}]'::jsonb,
'https://www.tempurpedic.com/shop-mattresses/tempur-adapt/?ref=affiliate',
'Shop Tempur-Pedic →');
