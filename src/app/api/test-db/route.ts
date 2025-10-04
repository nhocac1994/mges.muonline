import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/database';

export async function GET() {
  try {
    const result = await testConnection();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Test database error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Lỗi kiểm tra database: ${error}` 
    }, { status: 500 });
  }
}
