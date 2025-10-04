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
    
    // Lấy top 10 nhân vật theo level
    const topLevel = await pool.request().query(`
      SELECT TOP 10 
        c.Name, 
        c.cLevel, 
        c.Class,
        c.Experience,
        c.ResetCount,
        c.MasterResetCount,
        c.PkCount,
        c.Money,
        c.Strength,
        c.Dexterity,
        c.Vitality,
        c.Energy,
        c.Leadership
      FROM Character c
      ORDER BY c.cLevel DESC, c.Experience DESC
    `);

    // Lấy top 10 nhân vật theo Master Reset
    const topMasterReset = await pool.request().query(`
      SELECT TOP 10 
        c.Name, 
        c.cLevel, 
        c.Class,
        c.MasterResetCount,
        c.ResetCount,
        c.Experience
      FROM Character c
      WHERE c.MasterResetCount > 0
      ORDER BY c.MasterResetCount DESC, c.cLevel DESC
    `);

    // Lấy top 10 nhân vật theo Reset
    const topReset = await pool.request().query(`
      SELECT TOP 10 
        c.Name, 
        c.cLevel, 
        c.Class,
        c.ResetCount,
        c.MasterResetCount,
        c.Experience
      FROM Character c
      WHERE c.ResetCount > 0
      ORDER BY c.ResetCount DESC, c.cLevel DESC
    `);

    // Lấy top 10 nhân vật theo PK
    const topPk = await pool.request().query(`
      SELECT TOP 10 
        c.Name, 
        c.cLevel, 
        c.Class,
        c.PkCount,
        c.PkLevel,
        c.Experience
      FROM Character c
      WHERE c.PkCount > 0
      ORDER BY c.PkCount DESC, c.cLevel DESC
    `);

    await pool.close();

    return NextResponse.json({
      success: true,
      data: {
        topLevel: topLevel.recordset,
        topMasterReset: topMasterReset.recordset,
        topReset: topReset.recordset,
        topPk: topPk.recordset
      }
    });

  } catch (error) {
    console.error('Ranking characters error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Lỗi lấy dữ liệu xếp hạng: ${error}` 
    }, { status: 500 });
  }
}
