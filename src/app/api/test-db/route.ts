import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/database';

export async function GET() {
  try {
    const result = await testConnection();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    );
  }
}
