'use client';
import { useEffect, useState } from 'react';

interface Product {
  id: string; rank: number; slug: string; badge: string; name: string; tagline: string;
  price: { original: number; current: number; currency: string };
  rating: number; images: { main: string; gallery: string[] };
  specs: { label: string; value: string }[];
  bestFor: string[]; notBestFor: string[]; briefReview: string; fullReview: string;
  materials: { layer: string; description: string }[];
  scores: { label: string; score: number }[];
  pros: string[]; cons: string[];
  faqs: { question: string; answer: string }[];
  affiliateLink: string; ctaText: string; isActive: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    try { const res = await fetch('/api/products'); const data = await res.json(); if (data.success) setProducts(data.data); } catch (e) { console.error(e); } finally { setLoading(false); }
  }

  async function saveProduct() {
    if (!editingProduct) return;
    setSaving(true);
    try {
      const res = await fetch('/api/products', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingProduct) });
      const data = await res.json();
      if (data.success) { setProducts(products.map(p => p.id === editingProduct.id ? data.data : p)); setEditingProduct(null); showMsg('success', '✅ 已儲存！'); }
    } catch { showMsg('error', '❌ 儲存失敗'); } finally { setSaving(false); }
  }

  async function toggleActive(product: Product) {
    try {
      const res = await fetch('/api/products', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...product, isActive: !product.isActive }) });
      const data = await res.json();
      if (data.success) setProducts(products.map(p => p.id === product.id ? data.data : p));
    } catch (e) { console.error(e); }
  }

  function showMsg(type: 'success' | 'error', text: string) { setMessage({ type, text }); setTimeout(() => setMessage(null), 3000); }
  function updateProduct(f: string, v: any) { if (editingProduct) setEditingProduct({ ...editingProduct, [f]: v }); }
  function updatePrice(f: string, v: number) { if (editingProduct) setEditingProduct({ ...editingProduct, price: { ...editingProduct.price, [f]: v } }); }

  // Array helpers
  function updateSpec(i: number, f: 'label' | 'value', v: string) { if (!editingProduct) return; const s = [...editingProduct.specs]; s[i] = { ...s[i], [f]: v }; updateProduct('specs', s); }
  function addSpec() { if (editingProduct) updateProduct('specs', [...editingProduct.specs, { label: '', value: '' }]); }
  function removeSpec(i: number) { if (editingProduct) updateProduct('specs', editingProduct.specs.filter((_, idx) => idx !== i)); }

  function updateMaterial(i: number, f: 'layer' | 'description', v: string) { if (!editingProduct) return; const m = [...editingProduct.materials]; m[i] = { ...m[i], [f]: v }; updateProduct('materials', m); }
  function addMaterial() { if (editingProduct) updateProduct('materials', [...editingProduct.materials, { layer: '', description: '' }]); }
  function removeMaterial(i: number) { if (editingProduct) updateProduct('materials', editingProduct.materials.filter((_, idx) => idx !== i)); }

  function updateScore(i: number, f: 'label' | 'score', v: any) { if (!editingProduct) return; const s = [...editingProduct.scores]; s[i] = { ...s[i], [f]: v }; updateProduct('scores', s); }
  function addScore() { if (editingProduct) updateProduct('scores', [...editingProduct.scores, { label: '', score: 0 }]); }
  function removeScore(i: number) { if (editingProduct) updateProduct('scores', editingProduct.scores.filter((_, idx) => idx !== i)); }

  function updateFaq(i: number, f: 'question' | 'answer', v: string) { if (!editingProduct) return; const fq = [...editingProduct.faqs]; fq[i] = { ...fq[i], [f]: v }; updateProduct('faqs', fq); }
  function addFaq() { if (editingProduct) updateProduct('faqs', [...editingProduct.faqs, { question: '', answer: '' }]); }
  function removeFaq(i: number) { if (editingProduct) updateProduct('faqs', editingProduct.faqs.filter((_, idx) => idx !== i)); }

  if (loading) return <div className="text-center py-12">載入中...</div>;

  const tabs = [
    { id: 'basic', label: '📝 基本' }, { id: 'pricing', label: '💰 價格' }, { id: 'images', label: '🖼️ 圖片' },
    { id: 'specs', label: '📋 規格' }, { id: 'review', label: '✍️ 評測' }, { id: 'materials', label: '🔧 材質' },
    { id: 'scores', label: '⭐ 評分' }, { id: 'proscons', label: '👍 優缺點' }, { id: 'faqs', label: '❓ FAQ' }, { id: 'affiliate', label: '🔗 聯盟' },
  ];

  return (
    <div>
      <div className="mb-8"><h1 className="text-3xl font-bold text-gray-900">產品管理</h1><p className="text-gray-600 mt-2">管理 TOP 10 產品評比</p></div>
      {message && <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{message.text}</div>}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">排名</th><th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">產品</th><th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">標籤</th><th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">價格</th><th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">評分</th><th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">狀態</th><th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">操作</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-2xl font-bold text-gray-300">#{p.rank}</td>
                <td className="px-6 py-4"><div className="flex items-center gap-4"><img src={p.images.main} alt={p.name} className="w-16 h-16 object-cover rounded-lg"/><div><div className="font-semibold text-gray-900">{p.name}</div><div className="text-sm text-gray-500">{p.slug}</div></div></div></td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">{p.badge}</span></td>
                <td className="px-6 py-4"><span className="text-gray-400 line-through text-sm">${p.price.original}</span><span className="ml-2 text-green-600 font-semibold">${p.price.current}</span></td>
                <td className="px-6 py-4"><span className="text-amber-500 font-bold">{p.rating}/10</span></td>
                <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-sm ${p.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.isActive ? '顯示中' : '已隱藏'}</span></td>
                <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => { setEditingProduct(p); setActiveTab('basic'); }} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">編輯</button><button onClick={() => toggleActive(p)} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium">{p.isActive ? '隱藏' : '顯示'}</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 my-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b"><h2 className="text-xl font-bold">編輯：{editingProduct.name}</h2><button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button></div>
            <div className="flex border-b px-6 overflow-x-auto">{tabs.map((t) => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === t.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>{t.label}</button>))}</div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-2">產品名稱</label><input type="text" value={editingProduct.name} onChange={(e) => updateProduct('name', e.target.value)} className="w-full px-4 py-2 border rounded-lg"/></div><div><label className="block text-sm font-medium mb-2">Slug (URL)</label><input type="text" value={editingProduct.slug} onChange={(e) => updateProduct('slug', e.target.value)} className="w-full px-4 py-2 border rounded-lg"/></div></div>
                  <div><label className="block text-sm font-medium mb-2">標籤</label><input type="text" value={editingProduct.badge} onChange={(e) => updateProduct('badge', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="例：🏆 最舒適"/></div>
                  <div><label className="block text-sm font-medium mb-2">標語</label><input type="text" value={editingProduct.tagline} onChange={(e) => updateProduct('tagline', e.target.value)} className="w-full px-4 py-2 border rounded-lg"/></div>
                  <div><label className="block text-sm font-medium mb-2">排名</label><input type="number" value={editingProduct.rank} onChange={(e) => updateProduct('rank', parseInt(e.target.value))} className="w-32 px-4 py-2 border rounded-lg"/></div>
                </div>
              )}
              {activeTab === 'pricing' && (
                <div className="space-y-4"><div className="grid grid-cols-3 gap-4"><div><label className="block text-sm font-medium mb-2">原價 ($)</label><input type="number" value={editingProduct.price.original} onChange={(e) => updatePrice('original', parseInt(e.target.value))} className="w-full px-4 py-2 border rounded-lg"/></div><div><label className="block text-sm font-medium mb-2">現價 ($)</label><input type="number" value={editingProduct.price.current} onChange={(e) => updatePrice('current', parseInt(e.target.value))} className="w-full px-4 py-2 border rounded-lg"/></div><div><label className="block text-sm font-medium mb-2">評分 (1-10)</label><input type="number" step="0.1" min="0" max="10" value={editingProduct.rating} onChange={(e) => updateProduct('rating', parseFloat(e.target.value))} className="w-full px-4 py-2 border rounded-lg"/></div></div></div>
              )}
              {activeTab === 'images' && (
                <div className="space-y-4"><div><label className="block text-sm font-medium mb-2">主圖網址</label><input type="text" value={editingProduct.images.main} onChange={(e) => updateProduct('images', { ...editingProduct.images, main: e.target.value })} className="w-full px-4 py-2 border rounded-lg"/></div>{editingProduct.images.main && <img src={editingProduct.images.main} alt="預覽" className="w-64 h-48 object-cover rounded-lg border"/>}</div>
              )}
              {activeTab === 'specs' && (
                <div className="space-y-4"><div className="flex justify-between"><span className="text-sm text-gray-600">產品規格</span><button onClick={addSpec} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">+ 新增</button></div>{editingProduct.specs.map((s, i) => (<div key={i} className="flex gap-4"><input type="text" value={s.label} onChange={(e) => updateSpec(i, 'label', e.target.value)} placeholder="標籤" className="flex-1 px-4 py-2 border rounded-lg"/><input type="text" value={s.value} onChange={(e) => updateSpec(i, 'value', e.target.value)} placeholder="數值" className="flex-1 px-4 py-2 border rounded-lg"/><button onClick={() => removeSpec(i)} className="px-3 py-2 text-red-500">🗑️</button></div>))}</div>
              )}
              {activeTab === 'review' && (
                <div className="space-y-6"><div><label className="block text-sm font-medium mb-2">簡短評測</label><textarea value={editingProduct.briefReview} onChange={(e) => updateProduct('briefReview', e.target.value)} rows={3} className="w-full px-4 py-2 border rounded-lg"/></div><div><label className="block text-sm font-medium mb-2">完整評測</label><textarea value={editingProduct.fullReview} onChange={(e) => updateProduct('fullReview', e.target.value)} rows={10} className="w-full px-4 py-2 border rounded-lg"/></div><div><label className="block text-sm font-medium mb-2">適合族群（每行一個）</label><textarea value={editingProduct.bestFor.join('\n')} onChange={(e) => updateProduct('bestFor', e.target.value.split('\n').filter(s => s.trim()))} rows={4} className="w-full px-4 py-2 border rounded-lg"/></div><div><label className="block text-sm font-medium mb-2">不適合族群（每行一個）</label><textarea value={editingProduct.notBestFor.join('\n')} onChange={(e) => updateProduct('notBestFor', e.target.value.split('\n').filter(s => s.trim()))} rows={4} className="w-full px-4 py-2 border rounded-lg"/></div></div>
              )}
              {activeTab === 'materials' && (
                <div className="space-y-4"><div className="flex justify-between"><span className="text-sm text-gray-600">材質層</span><button onClick={addMaterial} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">+ 新增</button></div>{editingProduct.materials.map((m, i) => (<div key={i} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg"><div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{i + 1}</div><div className="flex-1 space-y-2"><input type="text" value={m.layer} onChange={(e) => updateMaterial(i, 'layer', e.target.value)} placeholder="層名稱" className="w-full px-4 py-2 border rounded-lg"/><input type="text" value={m.description} onChange={(e) => updateMaterial(i, 'description', e.target.value)} placeholder="說明" className="w-full px-4 py-2 border rounded-lg"/></div><button onClick={() => removeMaterial(i)} className="px-3 py-2 text-red-500">🗑️</button></div>))}</div>
              )}
              {activeTab === 'scores' && (
                <div className="space-y-4"><div className="flex justify-between"><span className="text-sm text-gray-600">評分項目</span><button onClick={addScore} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">+ 新增</button></div>{editingProduct.scores.map((s, i) => (<div key={i} className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg"><input type="text" value={s.label} onChange={(e) => updateScore(i, 'label', e.target.value)} placeholder="項目" className="flex-1 px-4 py-2 border rounded-lg"/><input type="number" step="0.5" min="0" max="5" value={s.score} onChange={(e) => updateScore(i, 'score', parseFloat(e.target.value))} className="w-24 px-4 py-2 border rounded-lg"/><div className="text-amber-400 w-28">{'★'.repeat(Math.floor(s.score))}{'☆'.repeat(5 - Math.floor(s.score))}</div><button onClick={() => removeScore(i)} className="px-3 py-2 text-red-500">🗑️</button></div>))}</div>
              )}
              {activeTab === 'proscons' && (
                <div className="grid grid-cols-2 gap-6"><div><label className="block text-sm font-medium text-green-700 mb-2">👍 優點（每行一個）</label><textarea value={editingProduct.pros.join('\n')} onChange={(e) => updateProduct('pros', e.target.value.split('\n').filter(s => s.trim()))} rows={10} className="w-full px-4 py-2 border border-green-200 rounded-lg bg-green-50"/></div><div><label className="block text-sm font-medium text-red-700 mb-2">👎 缺點（每行一個）</label><textarea value={editingProduct.cons.join('\n')} onChange={(e) => updateProduct('cons', e.target.value.split('\n').filter(s => s.trim()))} rows={10} className="w-full px-4 py-2 border border-red-200 rounded-lg bg-red-50"/></div></div>
              )}
              {activeTab === 'faqs' && (
                <div className="space-y-4"><div className="flex justify-between"><span className="text-sm text-gray-600">FAQ</span><button onClick={addFaq} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">+ 新增</button></div>{editingProduct.faqs.map((f, i) => (<div key={i} className="p-4 bg-gray-50 rounded-lg space-y-2"><div className="flex gap-4"><input type="text" value={f.question} onChange={(e) => updateFaq(i, 'question', e.target.value)} placeholder="問題" className="flex-1 px-4 py-2 border rounded-lg"/><button onClick={() => removeFaq(i)} className="px-3 py-2 text-red-500">🗑️</button></div><textarea value={f.answer} onChange={(e) => updateFaq(i, 'answer', e.target.value)} rows={2} placeholder="答案" className="w-full px-4 py-2 border rounded-lg"/></div>))}</div>
              )}
              {activeTab === 'affiliate' && (
                <div className="space-y-4"><div><label className="block text-sm font-medium mb-2">聯盟連結</label><input type="text" value={editingProduct.affiliateLink} onChange={(e) => updateProduct('affiliateLink', e.target.value)} className="w-full px-4 py-2 border rounded-lg"/></div><div><label className="block text-sm font-medium mb-2">CTA 按鈕文字</label><input type="text" value={editingProduct.ctaText} onChange={(e) => updateProduct('ctaText', e.target.value)} className="w-full px-4 py-2 border rounded-lg"/></div><div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-600 mb-2">預覽：</p><button className="px-6 py-3 bg-green-500 text-white rounded-full font-bold">{editingProduct.ctaText}</button></div></div>
              )}
            </div>
            <div className="flex justify-end gap-4 px-6 py-4 border-t bg-gray-50"><button onClick={() => setEditingProduct(null)} className="px-6 py-2 text-gray-600">取消</button><button onClick={saveProduct} disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">{saving ? '儲存中...' : '💾 儲存'}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
