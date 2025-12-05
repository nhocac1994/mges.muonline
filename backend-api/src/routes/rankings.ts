import express, { Request, Response } from 'express';
import { getDatabasePool } from '../config/database';
import sql from 'mssql';

const router = express.Router();

// Level Rankings - Top 100 theo ResetCount
router.get('/level', async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    console.log(`📊 [RANKINGS] Lấy top 100 level rankings`);
    const pool = await getDatabasePool();
    const result = await pool.request().query(`
      SELECT TOP 100 
        c.AccountID,
        c.Name,
        c.Class,
        ISNULL(c.ResetCount, 0) as ResetCount,
        c.cLevel,
        ISNULL(ms.ConnectStat, 0) as IsOnline
      FROM Character c
      LEFT JOIN MEMB_STAT ms ON c.AccountID = ms.memb___id
      WHERE (c.CtlCode < 8 OR c.CtlCode IS NULL)
      ORDER BY ISNULL(c.ResetCount, 0) DESC, c.cLevel DESC
    `);

    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('Get level rankings error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi lấy bảng xếp hạng'
    });
  }
});

// Guild Rankings
router.get('/guild', async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    console.log(`📊 [GUILD] Lấy top 100 guild rankings`);
    const pool = await getDatabasePool();
    const result = await pool.request().query(`
      SELECT TOP 100 
        G_Name, G_Master, G_Score, G_Count, G_Notice
      FROM Guild 
      ORDER BY G_Score DESC
    `);

    const duration = Date.now() - startTime;
    console.log(`✅ [GUILD] Lấy thành công ${result.recordset.length} guilds (${duration}ms)`);

    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ [GUILD] Lỗi lấy bảng xếp hạng guild (${duration}ms):`, error);
    res.status(500).json({
      success: false,
      message: 'Lỗi lấy bảng xếp hạng guild'
    });
  }
});

// Character Search by Name
router.get('/search', async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const pool = await getDatabasePool();
    const { name } = req.query;
    
    console.log(`🔍 [SEARCH] Bắt đầu tìm kiếm character: "${name}"`);
    
    if (!name || typeof name !== 'string' || !name.trim()) {
      console.log(`⚠️ [SEARCH] Validation failed: Tên nhân vật trống`);
      return res.status(400).json({
        success: false,
        message: 'Tên nhân vật không được để trống'
      });
    }

    const characterName = name.trim();
    
    // Security: Basic validation
    if (characterName.length > 10) {
      console.log(`⚠️ [SEARCH] Validation failed: Tên nhân vật quá dài (${characterName.length} chars)`);
      return res.status(400).json({
        success: false,
        message: 'Tên nhân vật quá dài'
      });
    }

    console.log(`📊 [SEARCH] Thực hiện query database cho: "${characterName}"`);
    const result = await pool.request()
      .input('characterName', sql.VarChar(10), `%${characterName}%`)
      .query(`
        SELECT TOP 100
          c.AccountID as account,
          c.Name as character,
          c.Class as class,
          ISNULL(c.ResetCount, 0) as resets,
          c.cLevel as level,
          c.PkCount as pkcount,
          ISNULL(ms.ConnectStat, 0) as isOnline
        FROM Character c
        LEFT JOIN MEMB_STAT ms ON c.AccountID = ms.memb___id
        WHERE c.Name LIKE @characterName 
        AND (c.CtlCode < 8 OR c.CtlCode IS NULL)
        ORDER BY ISNULL(c.ResetCount, 0) DESC, c.cLevel DESC
      `);

    const duration = Date.now() - startTime;
    console.log(`✅ [SEARCH] Tìm thấy ${result.recordset.length} kết quả cho "${characterName}" (${duration}ms)`);

    res.json({
      success: true,
      data: result.recordset,
      message: `Tìm thấy ${result.recordset.length} kết quả cho "${characterName}"`
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ [SEARCH] Lỗi khi tìm kiếm nhân vật (${duration}ms):`, error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tìm kiếm nhân vật'
    });
  }
});

export default router;

