// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase, transformProduct, transformProductToDb } from '@/lib/supabase';

// GET: 取得所有產品或單一產品
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    
    if (id) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true, data: transformProduct(data) });
    }
    
    if (slug) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      if (!data) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true, data: transformProduct(data) });
    }
    
    // 取得所有產品，按 rank 排序
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('rank', { ascending: true });
    
    if (error) throw error;
    
    const products = data.map(transformProduct);
    return NextResponse.json({ success: true, data: products });
    
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ success: false, error: 'Failed to read products' }, { status: 500 });
  }
}

// POST: 新增產品
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dbData = transformProductToDb(body);
    
    const { data, error } = await supabase
      .from('products')
      .insert(dbData)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data: transformProduct(data) });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}

// PUT: 更新產品
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, createdAt, updatedAt, ...rest } = body;
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }
    
    // Transform camelCase to snake_case for DB
    const updateData: any = {};
    if (rest.rank !== undefined) updateData.rank = rest.rank;
    if (rest.slug !== undefined) updateData.slug = rest.slug;
    if (rest.badge !== undefined) updateData.badge = rest.badge;
    if (rest.name !== undefined) updateData.name = rest.name;
    if (rest.tagline !== undefined) updateData.tagline = rest.tagline;
    if (rest.price !== undefined) updateData.price = rest.price;
    if (rest.rating !== undefined) updateData.rating = rest.rating;
    if (rest.images !== undefined) updateData.images = rest.images;
    if (rest.specs !== undefined) updateData.specs = rest.specs;
    if (rest.bestFor !== undefined) updateData.best_for = rest.bestFor;
    if (rest.notBestFor !== undefined) updateData.not_best_for = rest.notBestFor;
    if (rest.briefReview !== undefined) updateData.brief_review = rest.briefReview;
    if (rest.fullReview !== undefined) updateData.full_review = rest.fullReview;
    if (rest.materials !== undefined) updateData.materials = rest.materials;
    if (rest.scores !== undefined) updateData.scores = rest.scores;
    if (rest.pros !== undefined) updateData.pros = rest.pros;
    if (rest.cons !== undefined) updateData.cons = rest.cons;
    if (rest.faqs !== undefined) updateData.faqs = rest.faqs;
    if (rest.affiliateLink !== undefined) updateData.affiliate_link = rest.affiliateLink;
    if (rest.ctaText !== undefined) updateData.cta_text = rest.ctaText;
    if (rest.isActive !== undefined) updateData.is_active = rest.isActive;
    
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data: transformProduct(data) });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE: 刪除產品
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data: transformProduct(data) });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}

// PATCH: 批量更新（用於排序）
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;
    
    if (action === 'reorder') {
      // data 是 { id: string, rank: number }[]
      for (const item of data) {
        await supabase
          .from('products')
          .update({ rank: item.rank })
          .eq('id', item.id);
      }
      
      // 取得更新後的所有產品
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('rank', { ascending: true });
      
      if (error) throw error;
      
      return NextResponse.json({ success: true, data: products.map(transformProduct) });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Failed to process request:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}
