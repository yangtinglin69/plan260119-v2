'use client';

import { useEffect, useState } from 'react';

interface Config {
  id: string; name: string; tagline: string; logo: string; favicon: string;
  seo: { title: string; description: string; keywords: string[]; ogImage: string };
  colors: { primary: string; secondary: string; accent: string; headerBg: string; headerText: string; footerBg: string; footerText: string; buttonBg: string; buttonText: string; buttonHover: string };
  typography: { headingWeight: string; bodyWeight: string; headingItalic: boolean; bodyItalic: boolean };
  tracking: { gaId: string; gtmId: string; fbPixelId: string; customHead: string };
  ai: { openaiKey: string; model: string; language: string };
  adsense: { enabled: boolean; publisherId: string; slots: { header: string; sidebar: string; inFeed: string; inArticle: string; footer: string } };
  footer: { disclaimer: string; copyright: string };
}

const defaults: Config = {
  id: '', name: '', tagline: '', logo: '', favicon: '',
  seo: { title: '', description: '', keywords: [], ogImage: '' },
  colors: { primary: '#1e3a5f', secondary: '#0f172a', accent: '#f59e0b', headerBg: '#1e3a5f', headerText: '#ffffff', footerBg: '#0f172a', footerText: '#ffffff', buttonBg: '#f59e0b', buttonText: '#000000', buttonHover: '#d97706' },
  typography: { headingWeight: '700', bodyWeight: '400', headingItalic: false, bodyItalic: false },
  tracking: { gaId: '', gtmId: '', fbPixelId: '', customHead: '' },
  ai: { openaiKey: '', model: 'gpt-4o-mini', language: 'en' },
  adsense: { enabled: false, publisherId: '', slots: { header: '', sidebar: '', inFeed: '', inArticle: '', footer: '' } },
  footer: { disclaimer: '', copyright: '' },
};

export default function SettingsPage() {
  const [cfg, setCfg] = useState<Config>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('basic');
  const [msg, setMsg] = useState<{ t: 'success' | 'error'; m: string } | null>(null);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    fetch('/api/site').then(r => r.json()).then(d => {
      if (d.success) setCfg({ ...defaults, ...d.data, colors: { ...defaults.colors, ...d.data.colors }, typography: { ...defaults.typography, ...d.data.typography }, tracking: { ...defaults.tracking, ...d.data.tracking }, ai: { ...defaults.ai, ...d.data.ai }, adsense: { ...defaults.adsense, ...d.data.adsense, slots: { ...defaults.adsense.slots, ...d.data.adsense?.slots } }, seo: { ...defaults.seo, ...d.data.seo }, footer: { ...defaults.footer, ...d.data.footer } });
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    const r = await fetch('/api/site', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cfg) });
    const d = await r.json();
    setMsg({ t: d.success ? 'success' : 'error', m: d.success ? '✅ 已儲存' : '❌ 失敗' });
    setTimeout(() => setMsg(null), 3000);
    setSaving(false);
  }

  function upd(f: string, v: any) { setCfg({ ...cfg, [f]: v }); }
  function updN(p: string, f: string, v: any) { setCfg({ ...cfg, [p]: { ...(cfg as any)[p], [f]: v } }); }
  function updD(p: string, c: string, f: string, v: any) { setCfg({ ...cfg, [p]: { ...(cfg as any)[p], [c]: { ...(cfg as any)[p][c], [f]: v } } }); }

  if (loading) return <div className="text-center py-12">載入中...</div>;

  const tabs = [
    { id: 'basic', l: '📝 基本' }, { id: 'seo', l: '🔍 SEO' }, { id: 'tracking', l: '📊 追蹤碼' },
    { id: 'colors', l: '🎨 顏色' }, { id: 'typography', l: '✏️ 文字' }, { id: 'ai', l: '🤖 AI' },
    { id: 'footer', l: '📄 頁尾' }, { id: 'adsense', l: '💰 廣告' },
  ];

  return (
    <div>
      <div className="mb-8"><h1 className="text-3xl font-bold text-gray-900">網站設定</h1><p className="text-gray-600 mt-2">管理網站外觀與功能</p></div>
      {msg && <div className={`mb-4 p-4 rounded-lg ${msg.t === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{msg.m}</div>}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b px-6 overflow-x-auto">
          {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 ${tab === t.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>{t.l}</button>)}
        </div>
        
        <div className="p-6">
          {tab === 'basic' && (
            <div className="space-y-4 max-w-2xl">
              <div><label className="block text-sm font-medium mb-2">網站名稱</label><input type="text" value={cfg.name} onChange={e => upd('name', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-2">網站標語</label><input type="text" value={cfg.tagline} onChange={e => upd('tagline', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-2">Logo 網址</label><input type="text" value={cfg.logo} onChange={e => upd('logo', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /><p className="text-xs text-gray-500 mt-1">建議 200x50px</p></div>
              <div><label className="block text-sm font-medium mb-2">Favicon 網址</label><input type="text" value={cfg.favicon} onChange={e => upd('favicon', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /><p className="text-xs text-gray-500 mt-1">建議 32x32px</p></div>
            </div>
          )}

          {tab === 'seo' && (
            <div className="space-y-4 max-w-2xl">
              <div><label className="block text-sm font-medium mb-2">頁面標題</label><input type="text" value={cfg.seo.title} onChange={e => updN('seo', 'title', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /><p className="text-xs text-gray-500 mt-1">{cfg.seo.title.length}/60 字元</p></div>
              <div><label className="block text-sm font-medium mb-2">Meta 描述</label><textarea value={cfg.seo.description} onChange={e => updN('seo', 'description', e.target.value)} rows={3} className="w-full px-4 py-2 border rounded-lg" /><p className="text-xs text-gray-500 mt-1">{cfg.seo.description.length}/160 字元</p></div>
              <div><label className="block text-sm font-medium mb-2">關鍵字（逗號分隔）</label><input type="text" value={cfg.seo.keywords.join(', ')} onChange={e => updN('seo', 'keywords', e.target.value.split(',').map(k => k.trim()))} className="w-full px-4 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-2">OG Image</label><input type="text" value={cfg.seo.ogImage} onChange={e => updN('seo', 'ogImage', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /><p className="text-xs text-gray-500 mt-1">建議 1200x630px</p></div>
            </div>
          )}

          {tab === 'tracking' && (
            <div className="space-y-4 max-w-2xl">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">💡 追蹤碼會自動加到 &lt;head&gt;</div>
              <div><label className="block text-sm font-medium mb-2">Google Analytics 4</label><input type="text" value={cfg.tracking.gaId} onChange={e => updN('tracking', 'gaId', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="G-XXXXXXXXXX" /></div>
              <div><label className="block text-sm font-medium mb-2">Google Tag Manager</label><input type="text" value={cfg.tracking.gtmId} onChange={e => updN('tracking', 'gtmId', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="GTM-XXXXXXX" /></div>
              <div><label className="block text-sm font-medium mb-2">Facebook Pixel ID</label><input type="text" value={cfg.tracking.fbPixelId} onChange={e => updN('tracking', 'fbPixelId', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="123456789012345" /></div>
              <div><label className="block text-sm font-medium mb-2">自訂 Head 程式碼</label><textarea value={cfg.tracking.customHead} onChange={e => updN('tracking', 'customHead', e.target.value)} rows={5} className="w-full px-4 py-2 border rounded-lg font-mono text-sm" placeholder="<!-- TikTok, Line Tag... -->" /></div>
            </div>
          )}

          {tab === 'colors' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold border-b pb-2">🎨 品牌色彩</h3>
                  {[{ k: 'primary', l: '主色' }, { k: 'secondary', l: '副色' }, { k: 'accent', l: '強調色' }].map(({ k, l }) => (
                    <div key={k}><label className="block text-sm font-medium mb-1">{l}</label><div className="flex gap-2"><input type="color" value={(cfg.colors as any)[k]} onChange={e => updN('colors', k, e.target.value)} className="w-12 h-10 rounded border cursor-pointer" /><input type="text" value={(cfg.colors as any)[k]} onChange={e => updN('colors', k, e.target.value)} className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm" /></div></div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold border-b pb-2">🏠 頁首/Hero</h3>
                  {[{ k: 'headerBg', l: '背景色' }, { k: 'headerText', l: '文字色' }].map(({ k, l }) => (
                    <div key={k}><label className="block text-sm font-medium mb-1">{l}</label><div className="flex gap-2"><input type="color" value={(cfg.colors as any)[k]} onChange={e => updN('colors', k, e.target.value)} className="w-12 h-10 rounded border cursor-pointer" /><input type="text" value={(cfg.colors as any)[k]} onChange={e => updN('colors', k, e.target.value)} className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm" /></div></div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold border-b pb-2">📄 頁尾</h3>
                  {[{ k: 'footerBg', l: '背景色' }, { k: 'footerText', l: '文字色' }].map(({ k, l }) => (
                    <div key={k}><label className="block text-sm font-medium mb-1">{l}</label><div className="flex gap-2"><input type="color" value={(cfg.colors as any)[k]} onChange={e => updN('colors', k, e.target.value)} className="w-12 h-10 rounded border cursor-pointer" /><input type="text" value={(cfg.colors as any)[k]} onChange={e => updN('colors', k, e.target.value)} className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm" /></div></div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold border-b pb-2">🔘 CTA 按鈕</h3>
                  {[{ k: 'buttonBg', l: '背景色' }, { k: 'buttonText', l: '文字色' }, { k: 'buttonHover', l: 'Hover 色' }].map(({ k, l }) => (
                    <div key={k}><label className="block text-sm font-medium mb-1">{l}</label><div className="flex gap-2"><input type="color" value={(cfg.colors as any)[k]} onChange={e => updN('colors', k, e.target.value)} className="w-12 h-10 rounded border cursor-pointer" /><input type="text" value={(cfg.colors as any)[k]} onChange={e => updN('colors', k, e.target.value)} className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm" /></div></div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">👁️ 預覽</h3>
                <div className="space-y-3">
                  <div className="p-6 rounded-lg" style={{ backgroundColor: cfg.colors.headerBg, color: cfg.colors.headerText }}><p className="font-bold">頁首預覽</p><button className="mt-3 px-6 py-2 rounded-full font-bold" style={{ backgroundColor: cfg.colors.buttonBg, color: cfg.colors.buttonText }}>CTA 按鈕</button></div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: cfg.colors.footerBg, color: cfg.colors.footerText }}><p className="text-sm">頁尾預覽</p></div>
                </div>
              </div>
            </div>
          )}

          {tab === 'typography' && (
            <div className="space-y-4 max-w-2xl">
              <div><label className="block text-sm font-medium mb-2">標題字重</label><select value={cfg.typography.headingWeight} onChange={e => updN('typography', 'headingWeight', e.target.value)} className="w-full px-4 py-2 border rounded-lg"><option value="400">Regular (400)</option><option value="500">Medium (500)</option><option value="600">Semi Bold (600)</option><option value="700">Bold (700)</option><option value="800">Extra Bold (800)</option><option value="900">Black (900)</option></select></div>
              <div><label className="block text-sm font-medium mb-2">內文字重</label><select value={cfg.typography.bodyWeight} onChange={e => updN('typography', 'bodyWeight', e.target.value)} className="w-full px-4 py-2 border rounded-lg"><option value="300">Light (300)</option><option value="400">Regular (400)</option><option value="500">Medium (500)</option><option value="600">Semi Bold (600)</option></select></div>
              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={cfg.typography.headingItalic} onChange={e => updN('typography', 'headingItalic', e.target.checked)} className="w-5 h-5 rounded" /><span className="text-sm font-medium">標題斜體</span></label>
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={cfg.typography.bodyItalic} onChange={e => updN('typography', 'bodyItalic', e.target.checked)} className="w-5 h-5 rounded" /><span className="text-sm font-medium">內文斜體</span></label>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">👁️ 預覽</h3>
                <div className="p-6 bg-gray-50 rounded-lg space-y-4">
                  <h1 className="text-3xl" style={{ fontWeight: cfg.typography.headingWeight, fontStyle: cfg.typography.headingItalic ? 'italic' : 'normal' }}>標題文字 Heading</h1>
                  <p style={{ fontWeight: cfg.typography.bodyWeight, fontStyle: cfg.typography.bodyItalic ? 'italic' : 'normal' }}>內文文字。Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'ai' && (
            <div className="space-y-4 max-w-2xl">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-purple-800">🤖 設定後可在「匯入中心」使用 AI 生成內容</div>
              <div><label className="block text-sm font-medium mb-2">OpenAI API Key</label><div className="flex gap-2"><input type={showKey ? 'text' : 'password'} value={cfg.ai.openaiKey} onChange={e => updN('ai', 'openaiKey', e.target.value)} className="flex-1 px-4 py-2 border rounded-lg font-mono" placeholder="sk-..." /><button onClick={() => setShowKey(!showKey)} className="px-4 py-2 bg-gray-100 rounded-lg">{showKey ? '🙈' : '👁️'}</button></div><p className="text-xs text-gray-500 mt-1">從 <a href="https://platform.openai.com/api-keys" target="_blank" className="text-blue-600">platform.openai.com</a> 取得</p></div>
              <div><label className="block text-sm font-medium mb-2">模型</label><select value={cfg.ai.model} onChange={e => updN('ai', 'model', e.target.value)} className="w-full px-4 py-2 border rounded-lg"><option value="gpt-4o-mini">GPT-4o Mini（推薦）</option><option value="gpt-4o">GPT-4o</option><option value="gpt-4-turbo">GPT-4 Turbo</option></select></div>
              <div><label className="block text-sm font-medium mb-2">生成語言</label><select value={cfg.ai.language} onChange={e => updN('ai', 'language', e.target.value)} className="w-full px-4 py-2 border rounded-lg"><option value="en">English</option><option value="zh-TW">繁體中文</option><option value="ja">日本語</option></select></div>
            </div>
          )}

          {tab === 'footer' && (
            <div className="space-y-4 max-w-2xl">
              <div><label className="block text-sm font-medium mb-2">免責聲明</label><textarea value={cfg.footer.disclaimer} onChange={e => updN('footer', 'disclaimer', e.target.value)} rows={3} className="w-full px-4 py-2 border rounded-lg" placeholder="Disclosure: We may earn..." /><p className="text-xs text-gray-500 mt-1">FTC 規範的佣金揭露</p></div>
              <div><label className="block text-sm font-medium mb-2">版權宣告</label><input type="text" value={cfg.footer.copyright} onChange={e => updN('footer', 'copyright', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="© 2025..." /></div>
            </div>
          )}

          {tab === 'adsense' && (
            <div className="space-y-4 max-w-2xl">
              <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={cfg.adsense.enabled} onChange={e => updN('adsense', 'enabled', e.target.checked)} className="w-5 h-5 rounded" /><span className="font-medium">啟用 AdSense</span></label>
              {cfg.adsense.enabled && (<>
                <div><label className="block text-sm font-medium mb-2">Publisher ID</label><input type="text" value={cfg.adsense.publisherId} onChange={e => updN('adsense', 'publisherId', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="ca-pub-..." /></div>
                <div className="border-t pt-4"><h4 className="font-medium mb-3">廣告版位 ID</h4><div className="grid grid-cols-2 gap-3">{[{ k: 'header', l: '頁首' }, { k: 'sidebar', l: '側邊欄' }, { k: 'inFeed', l: '列表內' }, { k: 'inArticle', l: '文章內' }, { k: 'footer', l: '頁尾' }].map(({ k, l }) => (<div key={k}><label className="block text-sm text-gray-600 mb-1">{l}</label><input type="text" value={(cfg.adsense.slots as any)[k]} onChange={e => updD('adsense', 'slots', k, e.target.value)} className="w-full px-3 py-2 border rounded-lg" /></div>))}</div></div>
              </>)}
            </div>
          )}
        </div>

        <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
          <button onClick={save} disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">{saving ? '儲存中...' : '💾 儲存設定'}</button>
        </div>
      </div>
    </div>
  );
}
