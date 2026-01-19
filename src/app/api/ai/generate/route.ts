import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const LANGUAGE_PROMPTS: Record<string, string> = {
  'en': 'Respond in English.',
  'zh-TW': 'Respond in Traditional Chinese (繁體中文).',
  'ja': 'Respond in Japanese (日本語).',
};

const TYPE_PROMPTS: Record<string, (count: number, topic: string) => string> = {
  products: (count, topic) => `Generate ${count} product reviews for "${topic}" products. For each product, provide:
- rank (number 1-${count})
- name (product name)
- slug (url-friendly name)
- badge (e.g., "Best Overall", "Best Value", "Most Comfortable")
- tagline (short description)
- originalPrice (number)
- currentPrice (number, should be less than originalPrice)
- rating (number 1-10, with one decimal)
- imageUrl (use placeholder: https://picsum.photos/400/300?random=X where X is the rank)
- briefReview (2-3 sentences)
- affiliateLink (use placeholder: https://example.com/product-X)
- ctaText (call to action text like "Shop Now →")

Return as JSON array.`,

  testimonials: (count, topic) => `Generate ${count} customer testimonials for "${topic}" products. For each testimonial:
- name (customer name with initial, e.g., "John D.")
- avatar (single emoji representing the person)
- product (product name they bought)
- rating (number 1-5)
- text (2-3 sentences review)

Return as JSON array.`,

  faq: (count, topic) => `Generate ${count} frequently asked questions about "${topic}". For each FAQ:
- question (common question customers ask)
- answer (helpful, detailed answer)

Return as JSON array.`,

  comparison: (count, topic) => `Generate ${count} comparison rows for "${topic}" products. For each row:
- type (customer type with emoji, e.g., "😴 Side Sleeper", "💪 Athletes")
- product (recommended product name)
- benefit (benefit with checkmark, e.g., "✓ Better pressure relief")

Return as JSON array.`,
};

export async function POST(request: NextRequest) {
  try {
    const { type, prompt, count } = await request.json();

    if (!type || !prompt || !count) {
      return NextResponse.json({ success: false, error: '缺少必要參數' }, { status: 400 });
    }

    // Get AI settings from database
    const { data: siteConfig } = await supabase.from('site_config').select('ai').single();
    
    const aiSettings = siteConfig?.ai || {};
    const apiKey = aiSettings.openaiKey;
    const model = aiSettings.model || 'gpt-4o-mini';
    const language = aiSettings.language || 'en';

    if (!apiKey) {
      return NextResponse.json({ success: false, error: '請先到「網站設定」→「AI 設定」填入 OpenAI API Key' }, { status: 400 });
    }

    const systemPrompt = TYPE_PROMPTS[type]?.(count, prompt);
    if (!systemPrompt) {
      return NextResponse.json({ success: false, error: '不支援的資料類型' }, { status: 400 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: `You are a helpful assistant that generates content for affiliate marketing websites. ${LANGUAGE_PROMPTS[language]} Always return valid JSON array only, no markdown, no explanation.` },
          { role: 'user', content: systemPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ success: false, error: error.error?.message || 'OpenAI API 錯誤' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    // Parse JSON from response
    let parsedData;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedData = JSON.parse(cleanContent);
    } catch (e) {
      return NextResponse.json({ success: false, error: '無法解析 AI 回應' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    console.error('AI generate error:', error);
    return NextResponse.json({ success: false, error: '生成失敗' }, { status: 500 });
  }
}
