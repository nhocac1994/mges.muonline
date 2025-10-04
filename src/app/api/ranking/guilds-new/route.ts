import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET(request: NextRequest) {
  try {
    const config = {
      server: '103.200.20.23',
      database: 'MuOnline',
      user: 'sa',
      password: 'kRcxWkedQRJhSeV5',
      port: 1433,
      options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        connectionTimeout: 30000,
        requestTimeout: 30000
      }
    };

    const pool = await sql.connect(config);
    
    // Lấy top 10 guild theo score
    const topGuildScore = await pool.request().query(`
      SELECT TOP 10 
        g.G_Name,
        g.G_Score,
        g.G_Master,
        g.G_Count,
        g.G_Mark
      FROM Guild g
      ORDER BY g.G_Score DESC
    `);

    // Lấy top 10 guild theo số thành viên
    const topGuildMembers = await pool.request().query(`
      SELECT TOP 10 
        g.G_Name,
        g.G_Score,
        g.G_Master,
        g.G_Count,
        g.G_Mark
      FROM Guild g
      WHERE g.G_Count > 0
      ORDER BY g.G_Count DESC, g.G_Score DESC
    `);

    await pool.close();

    return NextResponse.json({
      success: true,
      data: {
        topGuildScore: topGuildScore.recordset,
        topGuildMembers: topGuildMembers.recordset
      }
    });

  } catch (error) {
    console.error('Ranking guilds error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Lỗi lấy dữ liệu guild: ${error}` 
    }, { status: 500 });
  }
}
