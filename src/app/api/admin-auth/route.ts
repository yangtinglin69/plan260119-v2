import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // 從環境變數取得正確密碼
    const correctPassword = process.env.ADMIN_PASSWORD;
    
    if (!correctPassword) {
      console.error('ADMIN_PASSWORD 環境變數未設定');
      return NextResponse.json(
        { success: false, error: '系統設定錯誤' },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      // 密碼正確，設定認證 cookie
      const response = NextResponse.json({ success: true });
      
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 天有效
        path: '/',
      });

      return response;
    } else {
      // 密碼錯誤
      return NextResponse.json(
        { success: false, error: '密碼錯誤' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '請求處理失敗' },
      { status: 400 }
    );
  }
}

// 登出功能
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.set('admin-auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // 立即過期
    path: '/',
  });

  return response;
}
