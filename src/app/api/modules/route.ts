// src/app/api/modules/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase, transformModule } from '@/lib/supabase';

// GET: 取得所有模組或單一模組
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) {
        return NextResponse.json({ success: false, error: 'Module not found' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true, data: transformModule(data) });
    }
    
    // 取得所有模組，按 display_order 排序
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    
    const modules = data.map(transformModule);
    return NextResponse.json({ success: true, data: modules });
    
  } catch (error) {
    console.error('Failed to fetch modules:', error);
    return NextResponse.json({ success: false, error: 'Failed to read modules' }, { status: 500 });
  }
}

// PUT: 更新模組
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, order, ...rest } = body;
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Module ID required' }, { status: 400 });
    }
    
    const updateData: any = {};
    if (rest.enabled !== undefined) updateData.enabled = rest.enabled;
    if (order !== undefined) updateData.display_order = order;
    if (rest.content !== undefined) updateData.content = rest.content;
    
    const { data, error } = await supabase
      .from('modules')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data: transformModule(data) });
  } catch (error) {
    console.error('Failed to update module:', error);
    return NextResponse.json({ success: false, error: 'Failed to update module' }, { status: 500 });
  }
}

// PATCH: 批量更新（用於排序和啟用/停用）
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;
    
    if (action === 'reorder') {
      // data 是 { id: string, order: number }[]
      for (const item of data) {
        await supabase
          .from('modules')
          .update({ display_order: item.order })
          .eq('id', item.id);
      }
      
      const { data: modules, error } = await supabase
        .from('modules')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      return NextResponse.json({ success: true, data: modules.map(transformModule) });
    }
    
    if (action === 'toggle') {
      // data 是 { id: string, enabled: boolean }
      const { error } = await supabase
        .from('modules')
        .update({ enabled: data.enabled })
        .eq('id', data.id);
      
      if (error) throw error;
      
      const { data: modules, error: fetchError } = await supabase
        .from('modules')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      return NextResponse.json({ success: true, data: modules.map(transformModule) });
    }
    
    if (action === 'bulkUpdate') {
      // data 是完整的 modules 陣列
      for (const module of data) {
        await supabase
          .from('modules')
          .update({
            enabled: module.enabled,
            display_order: module.order,
            content: module.content
          })
          .eq('id', module.id);
      }
      
      return NextResponse.json({ success: true, data });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Failed to process request:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}
