import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, characterName, email, phone, securityQuestion, securityAnswer } = body;

    // Validate input
    if (!username || !password || !characterName || !email || !phone || !securityQuestion || !securityAnswer) {
      return NextResponse.json({ 
        success: false, 
        message: 'Vui lòng điền đầy đủ thông tin' 
      }, { status: 400 });
    }

    // Simulate account creation (without database)
    console.log('Account registration attempt:', {
      username,
      characterName,
      email,
      phone
    });

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Tạo tài khoản thành công! (Demo mode - không lưu database)' 
    });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi xử lý đăng ký. Vui lòng thử lại sau.' 
    }, { status: 500 });
  }
}
