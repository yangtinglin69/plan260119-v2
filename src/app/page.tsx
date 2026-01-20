// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Module {
  id: string;
  enabled: boolean;
  order: number;
  content: any;
}

interface Product {
  id: string;
  rank: number;
  slug: string;
  badge: string;
  name: string;
  tagline: string;
  price: { original: number; current: number; currency: string };
  rating: number;
  images: { main: string };
  specs: { label: string; value: string }[];
  bestFor: string[];
  notBestFor: string[];
  briefReview: string;
  scores: { label: string; score: number }[];
  affiliateLink: string;
  ctaText: string;
  isActive: boolean;
}

interface SiteConfig {
  name: string;
  seo: { title: string; description: string };
  colors: { primary: string; secondary: string; accent: string };
  adsense: { enabled: boolean; publisherId: string };
  footer: { disclaimer: string; copyright: string };
}

export default function HomePage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [site, setSite] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const [modulesRes, productsRes, siteRes] = await Promise.all([
          fetch('/api/modules'),
          fetch('/api/products'),
          fetch('/api/site'),
        ]);
        
        const modulesData = await modulesRes.json();
        const productsData = await productsRes.json();
        const siteData = await siteRes.json();
        
        if (modulesData.success) setModules(modulesData.data.filter((m: Module) => m.enabled));
        if (productsData.success) setProducts(productsData.data.filter((p: Product) => p.isActive));
        if (siteData.success) setSite(siteData.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  function toggleProductDetail(productId: string) {
    setExpandedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }

  function renderStars(score: number) {
    const fullStars = Math.floor(score);
    const hasHalf = score % 1 >= 0.5;
    return '★'.repeat(fullStars) + (hasHalf ? '½' : '') + '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
  }

  function getModule(id: string): Module | undefined {
    return modules.find(m => m.id === id);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const heroModule = getModule('hero');
  const painPointsModule = getModule('painPoints');
  const storyModule = getModule('story');
  const methodModule = getModule('method');
  const comparisonModule = getModule('comparison');
  const productsModule = getModule('products');
  const testimonialsModule = getModule('testimonials');
  const faqModule = getModule('faq');

  return (
    <div className="min-h-screen bg-[#fefdfb]">
      {/* Hero Section */}
      {heroModule && (
        <section 
          className="min-h-screen flex items-center relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${site?.colors.primary || '#1e3a5f'} 0%, ${site?.colors.secondary || '#0f172a'} 100%)` 
          }}
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
              backgroundImage: `url(${heroModule.content.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center py-20">
              {/* 左側文字 */}
              <div>
                <span 
                  className="inline-block px-6 py-2 rounded-full text-sm font-bold mb-8"
                  style={{ backgroundColor: site?.colors.accent || '#f59e0b', color: site?.colors.secondary || '#0f172a' }}
                >
                  {heroModule.content.badge}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  {heroModule.content.headline}
                </h1>
                <p className="text-xl text-white/85 mb-8 whitespace-pre-line leading-relaxed">
                  {heroModule.content.subheadline}
                </p>
                <div 
                  className="text-xl font-bold mb-10 p-6 rounded-r-xl border-l-4 whitespace-pre-line"
                  style={{ 
                    borderColor: site?.colors.accent || '#f59e0b',
                    backgroundColor: `${site?.colors.accent || '#f59e0b'}20`,
                    color: site?.colors.accent || '#f59e0b'
                  }}
                >
                  {heroModule.content.highlight}
                </div>
                <a 
                  href={heroModule.content.ctaLink}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-1"
                  style={{ 
                    backgroundColor: site?.colors.accent || '#f59e0b',
                    color: site?.colors.secondary || '#0f172a',
                    boxShadow: `0 4px 20px ${site?.colors.accent || '#f59e0b'}66`
                  }}
                >
                  {heroModule.content.ctaText}
                </a>
              </div>

              {/* 右側 YouTube 影片 */}
              {heroModule.content.youtubeUrl ? (
                <div className="hidden md:block">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={heroModule.content.youtubeUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
                      title="Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="hidden md:block" />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Pain Points Section */}
      {painPointsModule && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img 
                  src={painPointsModule.content.image} 
                  alt="Pain points"
                  className="rounded-2xl shadow-2xl"
                />
                <div 
                  className="absolute -top-5 -left-5 w-full h-full rounded-2xl -z-10 opacity-30"
                  style={{ backgroundColor: site?.colors.accent || '#f59e0b' }}
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-8" style={{ color: site?.colors.primary || '#1e3a5f' }}>
                  {painPointsModule.content.title}
                </h2>
                <div className="space-y-6">
                  {painPointsModule.content.points.map((point: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                        {point.icon}
                      </span>
                      <p className="text-lg text-gray-700 leading-relaxed">{point.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Story Section */}
      {storyModule && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-16">
              <div className="md:sticky md:top-24 self-start">
                <img 
                  src={storyModule.content.image} 
                  alt="About"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-8" style={{ color: site?.colors.primary || '#1e3a5f' }}>
                  {storyModule.content.title}
                </h2>
                {storyModule.content.paragraphs.map((paragraph: string, index: number) => (
                  <p 
                    key={index} 
                    className={`text-lg leading-loose mb-6 ${index === 0 ? 'text-xl font-medium' : 'text-gray-700'}`}
                    style={index === 0 ? { color: site?.colors.primary || '#1e3a5f' } : {}}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Method Section */}
      {methodModule && (
        <section className="py-20 text-white" style={{ backgroundColor: site?.colors.primary || '#1e3a5f' }}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4">{methodModule.content.title}</h2>
            <p className="text-xl text-center text-white/80 mb-12 max-w-3xl mx-auto">
              {methodModule.content.subtitle}
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              {methodModule.content.features.map((feature: any, index: number) => (
                <div 
                  key={index} 
                  className="bg-white/10 rounded-2xl p-8 text-center hover:bg-white/15 transition hover:-translate-y-1"
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table Section */}
      {comparisonModule && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: site?.colors.primary || '#1e3a5f' }}>
              {comparisonModule.content.title}
            </h2>
            <p className="text-xl text-center text-gray-500 mb-12">{comparisonModule.content.subtitle}</p>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div 
                className="grid grid-cols-3 gap-4 p-5 text-white font-bold"
                style={{ backgroundColor: site?.colors.primary || '#1e3a5f' }}
              >
                <span>Your Type</span>
                <span>Best Match</span>
                <span>Benefit</span>
              </div>
              {comparisonModule.content.rows.map((row: any, index: number) => (
                <div 
                  key={index} 
                  className="grid grid-cols-3 gap-4 p-5 border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <span className="font-semibold">{row.type}</span>
                  <span className="font-bold" style={{ color: site?.colors.primary || '#1e3a5f' }}>{row.product}</span>
                  <span className="text-green-600 font-medium">{row.benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section - TOP 10 */}
      {productsModule && (
        <section id="products" className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: site?.colors.primary || '#1e3a5f' }}>
              {productsModule.content.title}
            </h2>
            <p className="text-xl text-center text-gray-500 mb-12">{productsModule.content.subtitle}</p>
            
            <div className="max-w-5xl mx-auto space-y-8">
              {products.slice(0, productsModule.content.showCount || 10).map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  {/* Product Header */}
                  <div 
                    className="flex justify-between items-center px-6 py-4 text-white"
                    style={{ backgroundColor: site?.colors.primary || '#1e3a5f' }}
                  >
                    <span className="font-bold">{product.badge}</span>
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-2xl font-bold"
                        style={{ color: site?.colors.accent || '#f59e0b' }}
                      >
                        {product.rating}
                      </span>
                      <span className="text-white/70 text-sm">/10 Score</span>
                    </div>
                  </div>

                  {/* Product Body */}
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Image & CTA */}
                    <div className="bg-slate-50 p-8 flex flex-col items-center justify-center">
                      <img 
                        src={product.images.main} 
                        alt={product.name}
                        className="rounded-xl mb-6 max-h-48 object-contain"
                      />
                      
                        href={product.affiliateLink}
                        target="_blank"
                        rel="nofollow sponsored"
                        className="w-full text-center py-3 px-6 rounded-full font-bold text-white transition hover:-translate-y-1"
                        style={{ backgroundColor: '#10b981' }}
                      >
                        {product.ctaText}
                      </a>
                    </div>

                    {/* Product Info */}
                    <div className="md:col-span-2 p-8">
                      <h3 
                        className="text-2xl font-bold mb-2"
                        style={{ color: site?.colors.primary || '#1e3a5f' }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-gray-500 mb-6">{product.tagline}</p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-4 border-y border-gray-100 mb-6">
                        <div className="text-center">
                          <div className="text-xs text-gray-400 mb-1">Price</div>
                          <div className="font-semibold text-green-600">
                            <span className="text-gray-300 line-through text-sm mr-1">
                              ${product.price.original}
                            </span>
                            ${product.price.current}
                          </div>
                        </div>
                        {product.specs.slice(0, 3).map((spec, i) => (
                          <div key={i} className="text-center">
                            <div className="text-xs text-gray-400 mb-1">{spec.label}</div>
                            <div className="font-semibold text-sm">{spec.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Details */}
                      <div className="space-y-3">
                        {/* Best For */}
                        <div className="border rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleProductDetail(`${product.id}-bestfor`)}
                            className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition"
                          >
                            <span className="font-semibold">🎯 Best For</span>
                            <span>{expandedProducts.has(`${product.id}-bestfor`) ? '−' : '+'}</span>
                          </button>
                          {expandedProducts.has(`${product.id}-bestfor`) && (
                            <div className="px-5 py-4">
                              <div className="flex flex-wrap gap-2">
                                {product.bestFor.map((item, i) => (
                                  <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                    ✓ {item}
                                  </span>
                                ))}
                                {product.notBestFor.map((item, i) => (
                                  <span key={i} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">
                                    ✗ {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Review */}
                        <div className="border rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleProductDetail(`${product.id}-review`)}
                            className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition"
                          >
                            <span className="font-semibold">💬 Our Take</span>
                            <span>{expandedProducts.has(`${product.id}-review`) ? '−' : '+'}</span>
                          </button>
                          {expandedProducts.has(`${product.id}-review`) && (
                            <div className="px-5 py-4">
                              <p className="text-gray-700 leading-relaxed">{product.briefReview}</p>
                            </div>
                          )}
                        </div>

                        {/* Scores */}
                        <div className="border rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleProductDetail(`${product.id}-scores`)}
                            className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition"
                          >
                            <span className="font-semibold">⭐ Detailed Scores</span>
                            <span>{expandedProducts.has(`${product.id}-scores`) ? '−' : '+'}</span>
                          </button>
                          {expandedProducts.has(`${product.id}-scores`) && (
                            <div className="px-5 py-4">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {product.scores.map((score, i) => (
                                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">{score.label}</span>
                                    <span style={{ color: site?.colors.accent || '#f59e0b' }}>
                                      {renderStars(score.score)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Detail Link */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 mt-6 font-semibold hover:gap-4 transition-all"
                        style={{ color: site?.colors.primary || '#1e3a5f' }}
                      >
                        View Full Review →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonialsModule && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: site?.colors.primary || '#1e3a5f' }}>
              {testimonialsModule.content.title}
            </h2>
            <p className="text-xl text-center text-gray-500 mb-12">{testimonialsModule.content.subtitle}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {testimonialsModule.content.items.map((item: any, index: number) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 relative">
                  <div className="absolute top-4 left-6 text-6xl text-amber-200 font-serif">"</div>
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: site?.colors.primary || '#1e3a5f' }}
                    >
                      {item.avatar}
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.product}</div>
                    </div>
                  </div>
                  <div className="text-amber-400 mb-3 tracking-widest">
                    {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                  </div>
                  <p className="text-gray-700 leading-relaxed relative z-10">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqModule && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: site?.colors.primary || '#1e3a5f' }}>
              {faqModule.content.title}
            </h2>
            <p className="text-xl text-center text-gray-500 mb-12">{faqModule.content.subtitle}</p>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqModule.content.items.map((item: any, index: number) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleProductDetail(`faq-${index}`)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold hover:bg-slate-50 transition"
                  >
                    <span>{item.question}</span>
                    <span 
                      className="text-xl"
                      style={{ color: site?.colors.primary || '#1e3a5f' }}
                    >
                      {expandedProducts.has(`faq-${index}`) ? '−' : '+'}
                    </span>
                  </button>
                  {expandedProducts.has(`faq-${index}`) && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 text-white/70" style={{ backgroundColor: site?.colors.secondary || '#0f172a' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/5 rounded-xl p-6 mb-8">
              <p className="text-sm leading-relaxed">
                <strong className="text-white">Disclosure:</strong> {site?.footer.disclaimer}
              </p>
            </div>
            <p className="text-sm text-white/50">{site?.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
