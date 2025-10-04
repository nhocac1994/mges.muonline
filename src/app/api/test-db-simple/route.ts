import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test environment variables
    const env = {
      DB_SERVER: process.env.DB_SERVER || 'not_set',
      DB_NAME: process.env.DB_NAME || 'not_set',
      DB_USERNAME: process.env.DB_USERNAME || 'not_set',
      DB_PASSWORD: process.env.DB_PASSWORD ? '***hidden***' : 'not_set',
      DB_PORT: process.env.DB_PORT || 'not_set',
      DB_INSTANCE: process.env.DB_INSTANCE || 'not_set'
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Environment variables loaded',
      config: env,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Error loading environment',
      error: String(error)
    }, { status: 500 });
  }
}
