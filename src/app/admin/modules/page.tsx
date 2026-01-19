'use client';

import { useEffect, useState } from 'react';

interface Module { id: string; enabled: boolean; order: number; content: any; }

const LABELS: Record<string, { icon: string; name: string }> = {
  hero: { icon: '🏠', name: '首屏 Hero' }, painPoints: { icon: '😫', name: '痛點區' },
  story: { icon: '📖', name: '故事區' }, method: { icon: '🔬', name: '方法/特色' },
  comparison: { icon: '📊', name: '比較表' }, products: { icon: '📦', name: '產品列表' },
  testimonials: { icon: '💬', name: '客戶評價' }, faq: { icon: '❓', name: 'FAQ' },
};

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Module | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => { fetch('/api/modules').then(r => r.json()).then(d => { if (d.success) setModules(d.data); setLoading(false); }); }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    const r = await fetch('/api/modules', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    const d = await r.json();
    if (d.success) { setModules(modules.map(m => m.id === editing.id ? d.data : m)); setEditing(null); showMsg('success', '✅ 已儲存'); }
    setSaving(false);
  }

  async function toggle(m: Module) {
    const r = await fetch('/api/modules', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'toggle', data: { id: m.id, enabled: !m.enabled } }) });
    const d = await r.json();
    if (d.success) setModules(d.data);
  }

  function showMsg(t: 'success' | 'error', text: string) { setMsg({ type: t, text }); setTimeout(() => setMsg(null), 3000); }
  function upd(f: string, v: any) { if (editing) setEditing({ ...editing, content: { ...editing.content, [f]: v } }); }

  function renderEditor() {
    if (!editing) return null;
    const c = editing.content;
    const id = editing.id;

    if (id === 'hero') return (
      <div className="space-y-4">
        <div><label className="block text-sm font-medium mb-2">標籤</label><input type="text" value={c.badge || ''} onChange={e => upd('badge', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">主標題</label><input type="text" value={c.headline || ''} onChange={e => upd('headline', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">副標題</label><textarea value={c.subheadline || ''} onChange={e => upd('subheadline', e.target.value)} rows={2} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">重點提示</label><textarea value={c.highlight || ''} onChange={e => upd('highlight', e.target.value)} rows={2} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-2">CTA 文字</label><input type="text" value={c.ctaText || ''} onChange={e => upd('ctaText', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium mb-2">CTA 連結</label><input type="text" value={c.ctaLink || ''} onChange={e => upd('ctaLink', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        </div>
        <div><label className="block text-sm font-medium mb-2">背景圖片</label><input type="text" value={c.backgroundImage || ''} onChange={e => upd('backgroundImage', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
      </div>
    );

    if (id === 'painPoints') return (
      <div className="space-y-4">
        <div><label className="block text-sm font-medium mb-2">標題</label><input type="text" value={c.title || ''} onChange={e => upd('title', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">圖片</label><input type="text" value={c.image || ''} onChange={e => upd('image', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div className="flex justify-between items-center"><span className="font-medium">痛點列表</span><button onClick={() => upd('points', [...(c.points || []), { icon: '😫', text: '' }])} className="px-3 py-1 bg-blue-50 text-blue-600 rounded">+ 新增</button></div>
        {c.points?.map((p: any, i: number) => (
          <div key={i} className="flex gap-2"><input type="text" value={p.icon} onChange={e => { const pts = [...c.points]; pts[i].icon = e.target.value; upd('points', pts); }} className="w-16 px-2 py-2 border rounded-lg text-center" /><input type="text" value={p.text} onChange={e => { const pts = [...c.points]; pts[i].text = e.target.value; upd('points', pts); }} className="flex-1 px-4 py-2 border rounded-lg" placeholder="痛點內容" /><button onClick={() => upd('points', c.points.filter((_: any, j: number) => j !== i))} className="text-red-500">🗑️</button></div>
        ))}
      </div>
    );

    if (id === 'story') return (
      <div className="space-y-4">
        <div><label className="block text-sm font-medium mb-2">標題</label><input type="text" value={c.title || ''} onChange={e => upd('title', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">圖片</label><input type="text" value={c.image || ''} onChange={e => upd('image', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div className="flex justify-between items-center"><span className="font-medium">段落</span><button onClick={() => upd('paragraphs', [...(c.paragraphs || []), ''])} className="px-3 py-1 bg-blue-50 text-blue-600 rounded">+ 新增</button></div>
        {c.paragraphs?.map((p: string, i: number) => (
          <div key={i} className="flex gap-2"><span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">{i + 1}</span><textarea value={p} onChange={e => { const ps = [...c.paragraphs]; ps[i] = e.target.value; upd('paragraphs', ps); }} rows={2} className="flex-1 px-4 py-2 border rounded-lg" /><button onClick={() => upd('paragraphs', c.paragraphs.filter((_: any, j: number) => j !== i))} className="text-red-500">🗑️</button></div>
        ))}
      </div>
    );

    if (id === 'method') return (
      <div className="space-y-4">
        <div><label className="block text-sm font-medium mb-2">標題</label><input type="text" value={c.title || ''} onChange={e => upd('title', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">副標題</label><input type="text" value={c.subtitle || ''} onChange={e => upd('subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div className="flex justify-between items-center"><span className="font-medium">特色列表</span><button onClick={() => upd('features', [...(c.features || []), { icon: '🔬', title: '', description: '' }])} className="px-3 py-1 bg-blue-50 text-blue-600 rounded">+ 新增</button></div>
        {c.features?.map((f: any, i: number) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg space-y-2">
            <div className="flex gap-2"><input type="text" value={f.icon} onChange={e => { const fs = [...c.features]; fs[i].icon = e.target.value; upd('features', fs); }} className="w-16 px-2 py-2 border rounded-lg text-center" /><input type="text" value={f.title} onChange={e => { const fs = [...c.features]; fs[i].title = e.target.value; upd('features', fs); }} className="flex-1 px-4 py-2 border rounded-lg" placeholder="標題" /><button onClick={() => upd('features', c.features.filter((_: any, j: number) => j !== i))} className="text-red-500">🗑️</button></div>
            <input type="text" value={f.description} onChange={e => { const fs = [...c.features]; fs[i].description = e.target.value; upd('features', fs); }} className="w-full px-4 py-2 border rounded-lg" placeholder="說明" />
          </div>
        ))}
      </div>
    );

    if (id === 'comparison') return (
      <div className="space-y-4">
        <div><label className="block text-sm font-medium mb-2">標題</label><input type="text" value={c.title || ''} onChange={e => upd('title', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">副標題</label><input type="text" value={c.subtitle || ''} onChange={e => upd('subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div className="flex justify-between items-center"><span className="font-medium">比較列表</span><button onClick={() => upd('rows', [...(c.rows || []), { type: '', product: '', benefit: '' }])} className="px-3 py-1 bg-blue-50 text-blue-600 rounded">+ 新增</button></div>
        {c.rows?.map((r: any, i: number) => (
          <div key={i} className="flex gap-2">
            <input type="text" value={r.type} onChange={e => { const rs = [...c.rows]; rs[i].type = e.target.value; upd('rows', rs); }} className="flex-1 px-4 py-2 border rounded-lg" placeholder="族群" />
            <input type="text" value={r.product} onChange={e => { const rs = [...c.rows]; rs[i].product = e.target.value; upd('rows', rs); }} className="flex-1 px-4 py-2 border rounded-lg" placeholder="產品" />
            <input type="text" value={r.benefit} onChange={e => { const rs = [...c.rows]; rs[i].benefit = e.target.value; upd('rows', rs); }} className="flex-1 px-4 py-2 border rounded-lg" placeholder="好處" />
            <button onClick={() => upd('rows', c.rows.filter((_: any, j: number) => j !== i))} className="text-red-500">🗑️</button>
          </div>
        ))}
      </div>
    );

    if (id === 'products') return (
      <div className="space-y-4">
        <div><label className="block text-sm font-medium mb-2">標題</label><input type="text" value={c.title || ''} onChange={e => upd('title', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">副標題</label><input type="text" value={c.subtitle || ''} onChange={e => upd('subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">顯示數量</label><input type="number" min="1" max="20" value={c.showCount || 10} onChange={e => upd('showCount', parseInt(e.target.value))} className="w-32 px-4 py-2 border rounded-lg" /></div>
        <p className="text-sm text-gray-500">產品資料請到「產品管理」編輯</p>
      </div>
    );

    if (id === 'testimonials') return (
      <div className="space-y-4">
        <div><label className="block text-sm font-medium mb-2">標題</label><input type="text" value={c.title || ''} onChange={e => upd('title', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">副標題</label><input type="text" value={c.subtitle || ''} onChange={e => upd('subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div className="flex justify-between items-center"><span className="font-medium">評價列表</span><button onClick={() => upd('items', [...(c.items || []), { name: '', avatar: '👤', product: '', rating: 5, text: '' }])} className="px-3 py-1 bg-blue-50 text-blue-600 rounded">+ 新增</button></div>
        {c.items?.map((t: any, i: number) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg space-y-2">
            <div className="flex gap-2">
              <input type="text" value={t.avatar} onChange={e => { const ts = [...c.items]; ts[i].avatar = e.target.value; upd('items', ts); }} className="w-16 px-2 py-2 border rounded-lg text-center" />
              <input type="text" value={t.name} onChange={e => { const ts = [...c.items]; ts[i].name = e.target.value; upd('items', ts); }} className="flex-1 px-4 py-2 border rounded-lg" placeholder="姓名" />
              <input type="number" min="1" max="5" value={t.rating} onChange={e => { const ts = [...c.items]; ts[i].rating = parseInt(e.target.value); upd('items', ts); }} className="w-20 px-2 py-2 border rounded-lg" />
              <button onClick={() => upd('items', c.items.filter((_: any, j: number) => j !== i))} className="text-red-500">🗑️</button>
            </div>
            <input type="text" value={t.product} onChange={e => { const ts = [...c.items]; ts[i].product = e.target.value; upd('items', ts); }} className="w-full px-4 py-2 border rounded-lg" placeholder="購買產品" />
            <textarea value={t.text} onChange={e => { const ts = [...c.items]; ts[i].text = e.target.value; upd('items', ts); }} rows={2} className="w-full px-4 py-2 border rounded-lg" placeholder="評價內容" />
          </div>
        ))}
      </div>
    );

    if (id === 'faq') return (
      <div className="space-y-4">
        <div><label className="block text-sm font-medium mb-2">標題</label><input type="text" value={c.title || ''} onChange={e => upd('title', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-2">副標題</label><input type="text" value={c.subtitle || ''} onChange={e => upd('subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div className="flex justify-between items-center"><span className="font-medium">FAQ 列表</span><button onClick={() => upd('items', [...(c.items || []), { question: '', answer: '' }])} className="px-3 py-1 bg-blue-50 text-blue-600 rounded">+ 新增</button></div>
        {c.items?.map((f: any, i: number) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg space-y-2">
            <div className="flex gap-2"><input type="text" value={f.question} onChange={e => { const fs = [...c.items]; fs[i].question = e.target.value; upd('items', fs); }} className="flex-1 px-4 py-2 border rounded-lg" placeholder="問題" /><button onClick={() => upd('items', c.items.filter((_: any, j: number) => j !== i))} className="text-red-500">🗑️</button></div>
            <textarea value={f.answer} onChange={e => { const fs = [...c.items]; fs[i].answer = e.target.value; upd('items', fs); }} rows={2} className="w-full px-4 py-2 border rounded-lg" placeholder="答案" />
          </div>
        ))}
      </div>
    );

    return <p>此模組暫無編輯器</p>;
  }

  if (loading) return <div className="text-center py-12">載入中...</div>;

  return (
    <div>
      <div className="mb-8"><h1 className="text-3xl font-bold text-gray-900">模組管理</h1><p className="text-gray-600 mt-2">管理銷售頁面的各個區塊</p></div>
      {msg && <div className={`mb-4 p-4 rounded-lg ${msg.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{msg.text}</div>}
      
      <div className="space-y-4">
        {modules.map((m) => (
          <div key={m.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{LABELS[m.id]?.icon || '📄'}</span>
                <div><h3 className="font-semibold text-gray-900">{LABELS[m.id]?.name || m.id}</h3><p className="text-sm text-gray-500">順序：{m.order}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={m.enabled} onChange={() => toggle(m)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  <span className="ml-3 text-sm">{m.enabled ? '開啟' : '關閉'}</span>
                </label>
                <button onClick={() => setEditing(m)} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">編輯</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 my-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b"><h2 className="text-xl font-bold">{LABELS[editing.id]?.icon} 編輯 {LABELS[editing.id]?.name}</h2><button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button></div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">{renderEditor()}</div>
            <div className="flex justify-end gap-4 px-6 py-4 border-t bg-gray-50">
              <button onClick={() => setEditing(null)} className="px-6 py-2 text-gray-600">取消</button>
              <button onClick={save} disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">{saving ? '儲存中...' : '💾 儲存'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
