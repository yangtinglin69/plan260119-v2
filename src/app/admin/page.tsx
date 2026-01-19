'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, modules: 0, activeModules: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pRes, mRes] = await Promise.all([fetch('/api/products'), fetch('/api/modules')]);
        const pData = await pRes.json();
        const mData = await mRes.json();
        setStats({ products: pData.data?.length || 0, modules: mData.data?.length || 0, activeModules: mData.data?.filter((m: any) => m.enabled).length || 0 });
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">儀表板</h1>
        <p className="text-gray-600 mt-2">歡迎回來！以下是網站概況</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between"><div><p className="text-gray-500 text-sm">產品總數</p><p className="text-3xl font-bold text-gray-900 mt-1">{loading ? '...' : stats.products}</p></div><div className="text-4xl">📦</div></div>
          <Link href="/admin/products" className="text-blue-600 text-sm mt-4 inline-block hover:underline">管理產品 →</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between"><div><p className="text-gray-500 text-sm">頁面模組</p><p className="text-3xl font-bold text-gray-900 mt-1">{loading ? '...' : `${stats.activeModules}/${stats.modules}`}</p></div><div className="text-4xl">🧩</div></div>
          <Link href="/admin/modules" className="text-blue-600 text-sm mt-4 inline-block hover:underline">管理模組 →</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between"><div><p className="text-gray-500 text-sm">快速匯入</p><p className="text-xl font-bold text-gray-900 mt-1">CSV / AI</p></div><div className="text-4xl">📥</div></div>
          <Link href="/admin/import" className="text-blue-600 text-sm mt-4 inline-block hover:underline">開始匯入 →</Link>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/admin/products', icon: '📦', label: '管理產品', desc: '新增/編輯產品' },
            { href: '/admin/modules', icon: '🧩', label: '管理模組', desc: '調整頁面區塊' },
            { href: '/admin/import', icon: '📥', label: '匯入資料', desc: 'CSV 或 AI 生成' },
            { href: '/admin/settings', icon: '⚙️', label: '網站設定', desc: '顏色、追蹤碼' },
          ].map((a) => (
            <Link key={a.href} href={a.href} className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition">
              <div className="text-3xl mb-2">{a.icon}</div>
              <div className="font-medium text-gray-900">{a.label}</div>
              <div className="text-sm text-gray-500">{a.desc}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-2">💡 建站流程建議</h3>
        <ol className="text-gray-600 space-y-1 text-sm">
          <li>1. 先到「網站設定」設定品牌顏色和追蹤碼</li>
          <li>2. 使用「匯入中心」快速建立產品資料（CSV 或 AI 生成）</li>
          <li>3. 在「模組管理」調整頁面區塊順序和內容</li>
          <li>4. 預覽網站，確認效果後即可推廣</li>
        </ol>
      </div>
    </div>
  );
}
