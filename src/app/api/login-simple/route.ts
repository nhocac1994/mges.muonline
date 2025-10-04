import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Vui lòng nhập đầy đủ thông tin' 
      }, { status: 400 });
    }

    // Simulate login (without database)
    console.log('Login attempt:', { username });

    // Return success response for demo
    return NextResponse.json({ 
      success: true, 
      message: 'Đăng nhập thành công! (Demo mode)',
      data: {
        memb___id: username,
        memb_name: 'Demo User'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi đăng nhập. Vui lòng thử lại sau.' 
    }, { status: 500 });
  }
}
