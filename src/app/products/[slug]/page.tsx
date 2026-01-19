// src/app/products/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Product, SiteConfig } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [site, setSite] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['materials', 'scores']));

  useEffect(() => {
    async function fetchData() {
      try {
        const [productRes, siteRes] = await Promise.all([
          fetch(`/api/products?slug=${params.slug}`),
          fetch('/api/site'),
        ]);
        
        const productData = await productRes.json();
        const siteData = await siteRes.json();
        
        if (productData.success) setProduct(productData.data);
        if (siteData.success) setSite(siteData.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [params.slug]);

  function toggleSection(section: string) {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  }

  function renderStars(score: number) {
    const fullStars = Math.floor(score);
    const hasHalf = score % 1 >= 0.5;
    return '★'.repeat(fullStars) + (hasHalf ? '½' : '') + '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</div>
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header 
        className="py-4 text-white"
        style={{ backgroundColor: site?.colors.primary || '#1e3a5f' }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">{site?.name || 'BestMattressLab'}</Link>
          <Link href="/" className="text-white/80 hover:text-white">← Back to Rankings</Link>
        </div>
      </header>

      {/* Product Hero */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/#products" className="hover:text-gray-700">Top 10</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{product.name}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Image */}
              <div>
                <div className="bg-slate-50 rounded-2xl p-8">
                  <img 
                    src={product.images.main} 
                    alt={product.name}
                    className="w-full rounded-xl"
                  />
                </div>
                {/* Gallery thumbnails would go here */}
              </div>

              {/* Info */}
              <div>
                <span 
                  className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
                  style={{ backgroundColor: `${site?.colors.accent || '#f59e0b'}20`, color: site?.colors.accent || '#f59e0b' }}
                >
                  #{product.rank} {product.badge}
                </span>
                
                <h1 
                  className="text-4xl font-bold mb-3"
                  style={{ color: site?.colors.primary || '#1e3a5f' }}
                >
                  {product.name}
                </h1>
                <p className="text-xl text-gray-500 mb-6">{product.tagline}</p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="text-4xl font-bold"
                    style={{ color: site?.colors.accent || '#f59e0b' }}
                  >
                    {product.rating}
                  </div>
                  <div>
                    <div className="text-amber-400 text-xl tracking-wider">
                      {renderStars(product.rating / 2)}
                    </div>
                    <div className="text-sm text-gray-500">Our Score</div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-green-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-gray-400 line-through text-xl">${product.price.original}</span>
                    <span className="text-3xl font-bold text-green-600">${product.price.current}</span>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save ${product.price.original - product.price.current}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Free shipping • Trial period included</p>
                </div>

                {/* CTA */}
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="block w-full text-center py-4 px-8 rounded-full font-bold text-white text-lg transition hover:-translate-y-1 hover:shadow-lg mb-4"
                  style={{ backgroundColor: '#10b981' }}
                >
                  {product.ctaText}
                </a>
                <p className="text-center text-sm text-gray-500">
                  Clicking this link may earn us a commission at no cost to you
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
                      <div className="font-semibold">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Best For */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('bestfor')}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition"
              >
                <span className="text-xl font-bold" style={{ color: site?.colors.primary || '#1e3a5f' }}>
                  🎯 Who Is It Best For?
                </span>
                <span className="text-2xl">{expandedSections.has('bestfor') ? '−' : '+'}</span>
              </button>
              {expandedSections.has('bestfor') && (
                <div className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">✓ Best For</h4>
                      <ul className="space-y-2">
                        {product.bestFor.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-3">✗ Not Ideal For</h4>
                      <ul className="space-y-2">
                        {product.notBestFor.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-700">
                            <span className="text-red-500">✗</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Full Review */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('review')}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition"
              >
                <span className="text-xl font-bold" style={{ color: site?.colors.primary || '#1e3a5f' }}>
                  📝 Full Review
                </span>
                <span className="text-2xl">{expandedSections.has('review') ? '−' : '+'}</span>
              </button>
              {expandedSections.has('review') && (
                <div className="px-6 pb-6">
                  <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.fullReview}
                  </div>
                </div>
              )}
            </div>

            {/* Materials */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('materials')}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition"
              >
                <span className="text-xl font-bold" style={{ color: site?.colors.primary || '#1e3a5f' }}>
                  🔧 Materials & Construction
                </span>
                <span className="text-2xl">{expandedSections.has('materials') ? '−' : '+'}</span>
              </button>
              {expandedSections.has('materials') && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {product.materials.map((material, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: site?.colors.primary || '#1e3a5f' }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{material.layer}</div>
                          <div className="text-gray-600">{material.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Scores */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('scores')}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition"
              >
                <span className="text-xl font-bold" style={{ color: site?.colors.primary || '#1e3a5f' }}>
                  ⭐ Detailed Ratings
                </span>
                <span className="text-2xl">{expandedSections.has('scores') ? '−' : '+'}</span>
              </button>
              {expandedSections.has('scores') && (
                <div className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.scores.map((score, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-semibold">{score.label}</div>
                          {score.description && (
                            <div className="text-sm text-gray-500">{score.description}</div>
                          )}
                        </div>
                        <div className="text-right">
                          <div style={{ color: site?.colors.accent || '#f59e0b' }} className="text-lg">
                            {renderStars(score.score)}
                          </div>
                          <div className="text-sm text-gray-500">{score.score}/5</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pros & Cons */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('proscons')}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition"
              >
                <span className="text-xl font-bold" style={{ color: site?.colors.primary || '#1e3a5f' }}>
                  ⚖️ Pros & Cons
                </span>
                <span className="text-2xl">{expandedSections.has('proscons') ? '−' : '+'}</span>
              </button>
              {expandedSections.has('proscons') && (
                <div className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-xl p-5">
                      <h4 className="font-bold text-green-700 mb-4">👍 Pros</h4>
                      <ul className="space-y-3">
                        {product.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <span className="text-green-500 mt-1">✓</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-xl p-5">
                      <h4 className="font-bold text-red-700 mb-4">👎 Cons</h4>
                      <ul className="space-y-3">
                        {product.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <span className="text-red-500 mt-1">✗</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('faq')}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition"
              >
                <span className="text-xl font-bold" style={{ color: site?.colors.primary || '#1e3a5f' }}>
                  ❓ Frequently Asked Questions
                </span>
                <span className="text-2xl">{expandedSections.has('faq') ? '−' : '+'}</span>
              </button>
              {expandedSections.has('faq') && (
                <div className="px-6 pb-6 space-y-4">
                  {product.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Final CTA */}
            <div 
              className="rounded-2xl p-8 text-center text-white"
              style={{ backgroundColor: site?.colors.primary || '#1e3a5f' }}
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Try {product.name}?</h3>
              <p className="text-white/80 mb-6">
                Get the best price with our exclusive link. Risk-free trial included.
              </p>
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="nofollow sponsored"
                className="inline-block py-4 px-10 rounded-full font-bold text-lg transition hover:-translate-y-1"
                style={{ backgroundColor: site?.colors.accent || '#f59e0b', color: site?.colors.secondary || '#0f172a' }}
              >
                {product.ctaText}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white/70" style={{ backgroundColor: site?.colors.secondary || '#0f172a' }}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm mb-4">{site?.footer.disclaimer}</p>
          <p className="text-sm text-white/50">{site?.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
