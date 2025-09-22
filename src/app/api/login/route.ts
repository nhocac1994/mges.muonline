import { NextRequest, NextResponse } from 'next/server';
import { loginAccount } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await loginAccount(body.username, body.password);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    );
  }
}
