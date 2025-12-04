import { NextRequest, NextResponse } from 'next/server';
import { createAccount } from '@/lib/database';
import { validateAccountId, validatePassword, validateCharacterName, validateEmail, detectSQLInjection, logSuspiciousActivity } from '@/lib/security';
import { getClientIP } from '@/lib/utils';
import { securityMiddleware } from '@/lib/security-middleware';

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    // ✅ Security: Kiểm tra bảo mật tổng quát
    const securityCheck = await securityMiddleware(request, '/api/register');
    if (securityCheck && !securityCheck.allowed) {
      return NextResponse.json({ 
        success: false, 
        message: securityCheck.error || 'Request không hợp lệ' 
      }, { status: securityCheck.statusCode || 400 });
    }

    const body = await request.json();
    const { username, password, characterName, email, phone, securityQuestion, securityAnswer } = body;

    // Validate input
    if (!username || !password || !characterName || !email || !phone || !securityQuestion || !securityAnswer) {
      return NextResponse.json({ 
        success: false, 
        message: 'Vui lòng điền đầy đủ thông tin' 
      }, { status: 400 });
    }

    // ✅ Security: Validate username
    const usernameValidation = validateAccountId(username);
    if (!usernameValidation.valid) {
      logSuspiciousActivity(clientIP, '/api/register', username, 'Invalid username format');
      return NextResponse.json({ 
        success: false, 
        message: usernameValidation.error || 'Tên đăng nhập không hợp lệ' 
      }, { status: 400 });
    }

    // ✅ Security: Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      logSuspiciousActivity(clientIP, '/api/register', '***', 'Invalid password format');
      return NextResponse.json({ 
        success: false, 
        message: passwordValidation.error || 'Mật khẩu không hợp lệ' 
      }, { status: 400 });
    }

    // ✅ Security: Validate character name
    const characterNameValidation = validateCharacterName(characterName);
    if (!characterNameValidation.valid) {
      logSuspiciousActivity(clientIP, '/api/register', characterName, 'Invalid character name format');
      return NextResponse.json({ 
        success: false, 
        message: characterNameValidation.error || 'Tên nhân vật không hợp lệ' 
      }, { status: 400 });
    }

    // ✅ Security: Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      logSuspiciousActivity(clientIP, '/api/register', email, 'Invalid email format');
      return NextResponse.json({ 
        success: false, 
        message: emailValidation.error || 'Email không hợp lệ' 
      }, { status: 400 });
    }

    // ✅ Security: Detect SQL injection attempts
    const allInputs = [username, password, characterName, email, phone, securityQuestion, securityAnswer];
    if (allInputs.some(input => detectSQLInjection(input))) {
      logSuspiciousActivity(clientIP, '/api/register', username, 'SQL Injection attempt detected');
      return NextResponse.json({ 
        success: false, 
        message: 'Input chứa ký tự không hợp lệ' 
      }, { status: 400 });
    }

    // Use the createAccount function from database.ts
    const result = await createAccount({
      username,
      password,
      characterName,
      email,
      phone,
      securityQuestion,
      securityAnswer
    });

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: result.message,
        data: {
          username,
          characterName,
          email,
          phone
        }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: result.message 
      }, { status: 400 });
    }

  } catch {
    console.error('Registration error: [Hidden for security]');
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi hệ thống. Vui lòng thử lại sau.' 
    }, { status: 500 });
  }
}
