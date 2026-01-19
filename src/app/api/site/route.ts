// src/app/api/site/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: 取得網站設定
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Failed to fetch site config:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to read site configuration'
    }, { status: 500 });
  }
}

// PUT: 更新網站設定
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...updateData } = body;
    
    const { data, error } = await supabase
      .from('site_config')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Failed to update site config:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update site configuration'
    }, { status: 500 });
  }
}
