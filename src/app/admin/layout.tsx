'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navItems = [
    { href: '/admin', label: '📊 儀表板', exact: true },
    { href: '/admin/products', label: '📦 產品管理' },
    { href: '/admin/modules', label: '🧩 模組管理' },
    { href: '/admin/import', label: '📥 匯入中心' },
    { href: '/admin/settings', label: '⚙️ 網站設定' },
    { href: '/admin/guide', label: '📖 使用說明' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold text-gray-900">🎯 後台管理</Link>
              <nav className="hidden md:flex gap-1">
                {navItems.map((item) => {
                  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                  return (<Link key={item.href} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>{item.label}</Link>);
                })}
              </nav>
            </div>
            <Link href="/" target="_blank" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">👁️ 預覽網站</Link>
          </div>
        </div>
      </header>
      <nav className="md:hidden bg-white border-b border-gray-100 px-4 py-2 overflow-x-auto">
        <div className="flex gap-2">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (<Link key={item.href} href={item.href} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600'}`}>{item.label}</Link>);
          })}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
