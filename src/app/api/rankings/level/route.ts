import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { securityMiddleware } from '@/lib/security-middleware';

export async function GET(request: NextRequest) {
  try {
    // ✅ Security: Kiểm tra bảo mật tổng quát
    const securityCheck = await securityMiddleware(request, '/api/rankings/level');
    if (securityCheck && !securityCheck.allowed) {
      return NextResponse.json({ 
        success: false, 
        message: securityCheck.error || 'Request không hợp lệ' 
      }, { status: securityCheck.statusCode || 400 });
    }

    const pool = await connectToDatabase();
    
    // Lấy top 100 characters theo ResetCount từ bảng Character
    const result = await pool.request().query(`
      SELECT TOP 100 
        AccountID as account,
        Name as character,
        Class as class,
        ResetCount as resets
      FROM Character 
      WHERE CtlCode < 8 OR CtlCode IS NULL 
      ORDER BY ResetCount DESC
    `);
    
    await pool.close();
    
    return NextResponse.json({
      success: true,
      data: result.recordset,
      message: 'Lấy danh sách ranking thành công!'
    });
    
  } catch (error) {
    console.error('Ranking error:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi lấy danh sách ranking'
    }, { status: 500 });
  }
}
