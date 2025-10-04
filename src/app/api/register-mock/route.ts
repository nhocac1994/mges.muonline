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

    // Mock validation
    if (username.length < 3) {
      return NextResponse.json({ 
        success: false, 
        message: 'Tên đăng nhập phải có ít nhất 3 ký tự' 
      }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ 
        success: false, 
        message: 'Mật khẩu phải có ít nhất 6 ký tự' 
      }, { status: 400 });
    }

    // Mock successful registration
    console.log('Mock account registration:', {
      username,
      characterName,
      email,
      phone,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Tạo tài khoản thành công! (Mock)',
      data: {
        username,
        characterName,
        email,
        phone
      }
    });

  } catch (error) {
    console.error('Mock registration error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi hệ thống. Vui lòng thử lại sau.' 
    }, { status: 500 });
  }
}
