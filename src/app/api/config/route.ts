import { NextRequest, NextResponse } from 'next/server';
import { getSiteConfig } from '@/lib/config';
import { securityMiddleware } from '@/lib/security-middleware';

/**
 * API endpoint để lấy site configuration
 * Có thể mở rộng để lấy từ database
 */
export async function GET(request: NextRequest) {
  try {
    // ✅ Security: Kiểm tra bảo mật tổng quát
    const securityCheck = await securityMiddleware(request, '/api/config');
    if (securityCheck && !securityCheck.allowed) {
      return NextResponse.json({ 
        success: false, 
        message: securityCheck.error || 'Request không hợp lệ' 
      }, { status: securityCheck.statusCode || 400 });
    }
    const config = getSiteConfig();
    return NextResponse.json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error('Error getting config:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi lấy cấu hình'
    }, { status: 500 });
  }
}

