'use client';

import { useState } from 'react';

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: '📖 系統總覽' },
    { id: 'products', label: '📦 產品管理' },
    { id: 'modules', label: '🧩 模組管理' },
    { id: 'import', label: '📥 匯入中心' },
    { id: 'settings', label: '⚙️ 網站設定' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">使用說明</h1>
        <p className="text-gray-600 mt-2">完整的後台操作指南與欄位說明</p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-4">
            <nav className="space-y-1">
              {sections.map((s) => (
                <button key={s.id} onClick={() => setActiveSection(s.id)} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${activeSection === s.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 系統總覽</h2>
                <p className="text-gray-600 leading-relaxed">這是一套專為聯盟行銷設計的 CMS 系統，可以快速建立產品評比網站。支援 TOP 10 產品評比、客戶評價、FAQ、比較表等功能，並可透過 AI 自動生成內容。</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">🚀 建站流程</h3>
                <ol className="space-y-3 text-gray-700">
                  {['到「網站設定」設定網站名稱、顏色、追蹤碼', '到「匯入中心」用 CSV 或 AI 快速建立產品資料', '到「產品管理」微調產品內容和聯盟連結', '到「模組管理」調整頁面區塊順序和內容', '預覽網站，確認後即可推廣！'].map((text, i) => (
                    <li key={i} className="flex gap-3"><span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span><span>{text}</span></li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {activeSection === 'products' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">📦 產品管理欄位說明</h2>
              {[
                { title: '📝 基本資訊', items: ['產品名稱 - 顯示在卡片和詳細頁', 'Slug - 產品網址如 /products/winkbed', '標籤 - 如「🏆 最舒適」', '標語 - 一句話賣點', '排名 - 決定顯示順序'] },
                { title: '💰 價格與評分', items: ['原價 - 刪除線價格', '現價 - 實際售價', '評分 - 1-10 分'] },
                { title: '🖼️ 圖片', items: ['主圖網址 - 建議 800x600px'] },
                { title: '📋 規格', items: ['可新增多筆「標籤 + 數值」'] },
                { title: '✍️ 評測內容', items: ['簡短評測 - 卡片顯示', '完整評測 - 詳細頁', '適合/不適合族群'] },
                { title: '🔧 材質結構', items: ['由上到下的層結構'] },
                { title: '⭐ 評分項目', items: ['多個 1-5 星評分'] },
                { title: '👍👎 優缺點', items: ['分別列出優點和缺點'] },
                { title: '❓ 產品 FAQ', items: ['該產品專屬的常見問題'] },
                { title: '🔗 聯盟設定', items: ['聯盟連結 - 追蹤網址', 'CTA 按鈕文字'] },
              ].map((section) => (
                <div key={section.title} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 font-semibold">{section.title}</div>
                  <div className="p-4 text-sm space-y-1">{section.items.map((item, i) => <div key={i}>• {item}</div>)}</div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'modules' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">🧩 模組管理欄位說明</h2>
              {[
                { title: '🏠 首屏 Hero', items: ['標籤、主標題、副標題', '重點提示、CTA 按鈕', '背景圖片網址', '🎬 YouTube 影片連結 - 可嵌入介紹影片（支援標準連結或短連結）'] },
                { title: '😫 痛點區', items: ['標題、圖片', '痛點列表（icon + 文字）'] },
                { title: '📖 故事區', items: ['標題、圖片', '多個故事段落'] },
                { title: '🔬 方法/特色', items: ['標題、副標題', '特色列表（icon + 標題 + 說明）'] },
                { title: '📊 比較表', items: ['標題、副標題', '比較列表（族群 + 產品 + 好處）'] },
                { title: '📦 產品列表', items: ['標題、副標題', '顯示數量'] },
                { title: '💬 客戶評價', items: ['標題、副標題', '評價列表（頭像 + 姓名 + 產品 + 評分 + 內容）'] },
                { title: '❓ FAQ', items: ['標題、副標題', '問答列表'] },
              ].map((section) => (
                <div key={section.title} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 font-semibold">{section.title}</div>
                  <div className="p-4 text-sm space-y-1">{section.items.map((item, i) => <div key={i}>• {item}</div>)}</div>
                </div>
              ))}
              
              {/* YouTube 連結使用說明 */}
              <div className="border-2 border-red-200 rounded-lg overflow-hidden bg-red-50/30">
                <div className="bg-red-100 px-4 py-3 font-semibold text-red-800">🎬 YouTube 影片嵌入說明</div>
                <div className="p-4 text-sm space-y-3">
                  <div>
                    <h4 className="font-medium text-red-900 mb-2">支援的連結格式</h4>
                    <div className="bg-white rounded p-3 space-y-2 text-gray-700">
                      <div>• 標準連結：<code className="bg-gray-100 px-2 py-1 rounded text-xs">https://www.youtube.com/watch?v=VIDEO_ID</code></div>
                      <div>• 短連結：<code className="bg-gray-100 px-2 py-1 rounded text-xs">https://youtu.be/VIDEO_ID</code></div>
                      <div>• 嵌入連結：<code className="bg-gray-100 px-2 py-1 rounded text-xs">https://www.youtube.com/embed/VIDEO_ID</code></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-900 mb-2">使用建議</h4>
                    <div className="bg-white rounded p-3 text-gray-700">
                      <div>• 影片會自動嵌入 Hero 區塊中顯示</div>
                      <div>• 建議使用產品介紹或品牌形象影片</div>
                      <div>• 留空則不顯示影片區塊</div>
                      <div>• 影片將以響應式設計呈現，適配各種螢幕</div>
                    </div>
                  </div>
                  <p className="text-red-700 text-xs">💡 提示：複製 YouTube 網址欄的連結直接貼上即可，系統會自動解析</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'import' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">📥 匯入中心說明</h2>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-green-50 px-4 py-3 font-semibold text-green-800">📄 CSV 上傳</div>
                <div className="p-4 text-sm">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>下載對應的 CSV 模板</li>
                    <li>用 Excel 或 Google Sheets 填寫</li>
                    <li>儲存為 CSV 格式</li>
                    <li>上傳並預覽</li>
                    <li>確認後匯入</li>
                  </ol>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-purple-50 px-4 py-3 font-semibold text-purple-800">🤖 AI 生成</div>
                <div className="p-4 text-sm">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>先到「網站設定」填入 OpenAI API Key</li>
                    <li>選擇要生成的資料類型</li>
                    <li>輸入產品類別（如：床墊、保養品）</li>
                    <li>選擇生成數量</li>
                    <li>預覽並微調後匯入</li>
                  </ol>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                ⚠️ AI 生成的內容建議人工審核、產品圖片需自己上傳、聯盟連結需手動填入
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">⚙️ 網站設定欄位說明</h2>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">📝 基本資訊</div>
                <div className="p-4 text-sm space-y-1">
                  <div>• 網站名稱 - 顯示在 Logo 旁和瀏覽器標籤</div>
                  <div>• 網站標語 - 一句話描述網站</div>
                  <div>• Logo 網址 - 建議 200x50px PNG/SVG</div>
                  <div>• Favicon 網址 - 建議 32x32px ICO/PNG</div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">🔍 SEO 設定</div>
                <div className="p-4 text-sm space-y-1">
                  <div>• 頁面標題 - 建議 50-60 字元</div>
                  <div>• Meta 描述 - 建議 150-160 字元</div>
                  <div>• 關鍵字 - 逗號分隔，建議 5-10 個</div>
                  <div>• OG Image - 社群分享圖，建議 1200x630px</div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">📊 追蹤碼</div>
                <div className="p-4 text-sm space-y-1">
                  <div>• Google Analytics 4 - 格式 G-XXXXXXXXXX</div>
                  <div>• Google Tag Manager - 格式 GTM-XXXXXXX</div>
                  <div>• Facebook Pixel ID - 15-16 位數字</div>
                  <div>• 自訂 Head 程式碼 - TikTok Pixel、Line Tag 等</div>
                </div>
              </div>

              <div className="border-2 border-blue-300 rounded-lg overflow-hidden bg-blue-50/30">
                <div className="bg-blue-100 px-4 py-3 font-semibold text-blue-800">🎨 顏色設定（10 種可自訂）</div>
                <div className="p-4 text-sm space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">品牌色彩（3 種）</h4>
                    <div className="grid grid-cols-3 gap-2 text-gray-700">
                      <div className="bg-white rounded p-2">主色 - 導航列、標題、連結</div>
                      <div className="bg-white rounded p-2">副色 - 深色背景區塊</div>
                      <div className="bg-white rounded p-2">強調色 - 連結、重點標示</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">頁首/Hero 區（2 種）</h4>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      <div className="bg-white rounded p-2">背景色</div>
                      <div className="bg-white rounded p-2">文字色</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">頁尾（2 種）</h4>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      <div className="bg-white rounded p-2">背景色</div>
                      <div className="bg-white rounded p-2">文字色</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">CTA 按鈕（3 種）</h4>
                    <div className="grid grid-cols-3 gap-2 text-gray-700">
                      <div className="bg-white rounded p-2">背景色</div>
                      <div className="bg-white rounded p-2">文字色</div>
                      <div className="bg-white rounded p-2">Hover 色</div>
                    </div>
                  </div>
                  <p className="text-blue-700 text-xs">💡 可直接輸入 HEX 色碼（如 #1e3a5f）或使用顏色選擇器，有即時預覽</p>
                </div>
              </div>

              <div className="border-2 border-purple-300 rounded-lg overflow-hidden bg-purple-50/30">
                <div className="bg-purple-100 px-4 py-3 font-semibold text-purple-800">✏️ 文字風格（4 項可自訂）</div>
                <div className="p-4 text-sm space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded p-3">
                      <div className="font-medium text-purple-900 mb-1">標題字重</div>
                      <div className="text-gray-600 text-xs">Regular(400) / Medium(500) / Semi Bold(600) / Bold(700) / Extra Bold(800) / Black(900)</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="font-medium text-purple-900 mb-1">內文字重</div>
                      <div className="text-gray-600 text-xs">Light(300) / Regular(400) / Medium(500) / Semi Bold(600)</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="font-medium text-purple-900 mb-1">標題斜體</div>
                      <div className="text-gray-600 text-xs">開 / 關</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="font-medium text-purple-900 mb-1">內文斜體</div>
                      <div className="text-gray-600 text-xs">開 / 關</div>
                    </div>
                  </div>
                  <p className="text-purple-700 text-xs">💡 數字越大字體越粗，有即時預覽</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">🤖 AI 設定</div>
                <div className="p-4 text-sm space-y-1">
                  <div>• OpenAI API Key - 從 platform.openai.com 取得</div>
                  <div>• 模型 - GPT-4o-mini（推薦）/ GPT-4o / GPT-4 Turbo</div>
                  <div>• 生成語言 - English / 繁體中文 / 日本語</div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">📄 頁尾設定</div>
                <div className="p-4 text-sm space-y-1">
                  <div>• 免責聲明 - FTC 規範的佣金揭露</div>
                  <div>• 版權宣告 - © 2025 Your Site</div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">💰 AdSense</div>
                <div className="p-4 text-sm space-y-1">
                  <div>• 啟用開關</div>
                  <div>• Publisher ID - ca-pub-XXXXXXXXXXXXXXXX</div>
                  <div>• 廣告版位 ID - 頁首、側邊欄、列表內、文章內、頁尾</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
