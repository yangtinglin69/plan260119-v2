'use client';

import { useState } from 'react';

type ImportType = 'products' | 'testimonials' | 'faq' | 'comparison';

const IMPORT_TYPES: { id: ImportType; icon: string; label: string; desc: string }[] = [
  { id: 'products', icon: '📦', label: 'TOP 10 產品', desc: '產品名稱、價格、評分、評測等' },
  { id: 'testimonials', icon: '💬', label: '客戶評價', desc: '客戶姓名、評分、評價內容' },
  { id: 'faq', icon: '❓', label: 'FAQ 問答', desc: '常見問題與答案' },
  { id: 'comparison', icon: '📊', label: '比較表', desc: '族群類型、推薦產品、好處' },
];

const CSV_TEMPLATES: Record<ImportType, { headers: string[]; example: string[][] }> = {
  products: {
    headers: ['rank', 'name', 'slug', 'badge', 'tagline', 'originalPrice', 'currentPrice', 'rating', 'imageUrl', 'briefReview', 'affiliateLink', 'ctaText'],
    example: [['1', 'WinkBed', 'winkbed', 'Most Comfortable', 'Luxury hybrid mattress', '1799', '1299', '9.4', 'https://example.com/img.jpg', 'Great for back pain...', 'https://affiliate.link', 'Shop Now →']],
  },
  testimonials: {
    headers: ['name', 'avatar', 'product', 'rating', 'text'],
    example: [['John D.', '👨', 'WinkBed', '5', 'Best mattress I ever bought! My back pain is gone.']],
  },
  faq: {
    headers: ['question', 'answer'],
    example: [['What is the best mattress for back pain?', 'Our top pick for back pain is WinkBed, thanks to its zoned lumbar support.']],
  },
  comparison: {
    headers: ['type', 'product', 'benefit'],
    example: [['😴 Side Sleeper', 'Helix Midnight', '✓ Pressure relief for shoulders and hips']],
  },
};

export default function ImportPage() {
  const [selectedType, setSelectedType] = useState<ImportType | null>(null);
  const [mode, setMode] = useState<'csv' | 'ai' | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiCount, setAiCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);

  function downloadTemplate(type: ImportType) {
    const { headers, example } = CSV_TEMPLATES[type];
    const csvContent = [headers.join(','), ...example.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-template.csv`;
    a.click();
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !selectedType) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj: any = {};
        headers.forEach((h, i) => { obj[h] = values[i]?.trim() || ''; });
        return obj;
      });
      setCsvData(data);
      setPreviewData(data);
    };
    reader.readAsText(file);
  }

  async function generateWithAI() {
    if (!selectedType || !aiPrompt) return;
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedType, prompt: aiPrompt, count: aiCount }),
      });
      const data = await res.json();
      if (data.success) {
        setPreviewData(data.data);
        showMsg('success', `✅ 已生成 ${data.data.length} 筆資料！`);
      } else {
        showMsg('error', data.error || '生成失敗');
      }
    } catch (e) {
      showMsg('error', '❌ AI 生成失敗，請檢查 API Key 設定');
    } finally {
      setLoading(false);
    }
  }

  async function importData() {
    if (!selectedType || previewData.length === 0) return;
    setLoading(true);

    try {
      let endpoint = '';
      let body: any = {};

      if (selectedType === 'products') {
        endpoint = '/api/products';
        body = { action: 'bulkImport', data: previewData };
      } else if (selectedType === 'testimonials' || selectedType === 'faq') {
        endpoint = '/api/modules';
        body = { action: 'updateContent', data: { id: selectedType === 'testimonials' ? 'testimonials' : 'faq', items: previewData } };
      } else if (selectedType === 'comparison') {
        endpoint = '/api/modules';
        body = { action: 'updateContent', data: { id: 'comparison', rows: previewData } };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        showMsg('success', `✅ 成功匯入 ${previewData.length} 筆資料！`);
        setPreviewData([]);
        setSelectedType(null);
        setMode(null);
      } else {
        showMsg('error', data.error || '匯入失敗');
      }
    } catch (e) {
      showMsg('error', '❌ 匯入失敗');
    } finally {
      setLoading(false);
    }
  }

  function showMsg(type: 'success' | 'error', text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">匯入中心</h1>
        <p className="text-gray-600 mt-2">批量匯入資料 - 支援 CSV 上傳或 AI 自動生成</p>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {/* 步驟 1: 選擇資料類型 */}
      {!selectedType && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">步驟 1：選擇要匯入的資料類型</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMPORT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className="p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition text-left"
              >
                <div className="text-4xl mb-3">{type.icon}</div>
                <div className="font-semibold text-gray-900">{type.label}</div>
                <div className="text-sm text-gray-500 mt-1">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 步驟 2: 選擇匯入方式 */}
      {selectedType && !mode && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              步驟 2：選擇匯入方式 - {IMPORT_TYPES.find(t => t.id === selectedType)?.label}
            </h2>
            <button onClick={() => setSelectedType(null)} className="text-gray-500 hover:text-gray-700">
              ← 返回
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => setMode('csv')}
              className="p-8 rounded-lg border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition text-left"
            >
              <div className="text-4xl mb-3">📄</div>
              <div className="font-semibold text-gray-900 text-xl">CSV 上傳</div>
              <div className="text-gray-500 mt-2">下載模板、填寫資料、上傳匯入</div>
              <div className="mt-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">適合大量資料</span>
              </div>
            </button>
            <button
              onClick={() => setMode('ai')}
              className="p-8 rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition text-left"
            >
              <div className="text-4xl mb-3">🤖</div>
              <div className="font-semibold text-gray-900 text-xl">AI 生成</div>
              <div className="text-gray-500 mt-2">輸入產品類別，自動生成內容</div>
              <div className="mt-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">快速建站</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* CSV 模式 */}
      {selectedType && mode === 'csv' && previewData.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">CSV 上傳</h2>
            <button onClick={() => setMode(null)} className="text-gray-500 hover:text-gray-700">← 返回</button>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">1. 下載模板</h3>
              <button
                onClick={() => downloadTemplate(selectedType)}
                className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
              >
                📥 下載 {IMPORT_TYPES.find(t => t.id === selectedType)?.label} 模板
              </button>
            </div>
            <div>
              <h3 className="font-medium mb-2">2. 上傳填好的 CSV</h3>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">欄位說明</h3>
              <div className="text-sm text-gray-600 font-mono">
                {CSV_TEMPLATES[selectedType].headers.join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI 模式 */}
      {selectedType && mode === 'ai' && previewData.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">AI 自動生成</h2>
            <button onClick={() => setMode(null)} className="text-gray-500 hover:text-gray-700">← 返回</button>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                產品/主題類別
              </label>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="例如：床墊、保養品、AI 工具、藍牙耳機..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                生成數量
              </label>
              <select
                value={aiCount}
                onChange={(e) => setAiCount(parseInt(e.target.value))}
                className="px-4 py-2 border rounded-lg"
              >
                <option value={5}>5 筆</option>
                <option value={10}>10 筆</option>
                <option value={15}>15 筆</option>
              </select>
            </div>
            <button
              onClick={generateWithAI}
              disabled={!aiPrompt || loading}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 font-medium"
            >
              {loading ? '🤖 生成中...' : '🤖 開始生成'}
            </button>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              💡 請先到「網站設定」→「AI 設定」填入 OpenAI API Key
            </div>
          </div>
        </div>
      )}

      {/* 預覽資料 */}
      {previewData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">預覽資料（{previewData.length} 筆）</h2>
            <button onClick={() => { setPreviewData([]); setMode(null); }} className="text-gray-500 hover:text-gray-700">
              ✕ 取消
            </button>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {Object.keys(previewData[0]).map((key) => (
                    <th key={key} className="px-4 py-2 text-left font-medium text-gray-600">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i} className="border-t">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="px-4 py-2 max-w-xs truncate">{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => { setPreviewData([]); }}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              取消
            </button>
            <button
              onClick={importData}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '匯入中...' : `✅ 確認匯入 ${previewData.length} 筆`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
