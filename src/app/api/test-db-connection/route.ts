import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET() {
  try {
    const config = {
      server: process.env.DB_SERVER || 'localhost',
      database: process.env.DB_NAME || 'your_database',
      user: process.env.DB_USERNAME || 'your_username',
      password: process.env.DB_PASSWORD || 'your_password',
      port: parseInt(process.env.DB_PORT || '1433'),
      options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        instanceName: process.env.DB_INSTANCE || 'SQLEXPRESS',
        connectionTimeout: 5000, // 5 seconds timeout
        requestTimeout: 5000
      }
    };

    console.log('Attempting to connect to database with config:', {
      server: config.server,
      database: config.database,
      user: config.user,
      port: config.port,
      instanceName: config.options.instanceName
    });

    const pool = await sql.connect(config);
    await pool.request().query('SELECT 1 as test');
    await pool.close();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!',
      config: {
        server: config.server,
        database: config.database,
        port: config.port,
        instanceName: config.options.instanceName
      }
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Database connection failed: ${error.message}`,
      error: error.code || 'UNKNOWN_ERROR'
    }, { status: 500 });
  }
}
