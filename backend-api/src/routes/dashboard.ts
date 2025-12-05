import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { getDatabasePool } from '../config/database';
import sql from 'mssql';

const router = express.Router();

// Tất cả routes cần authentication
router.use(authenticateToken);

// Get dashboard data
router.get('/', async (req: AuthRequest, res: Response) => {
  const startTime = Date.now();
  try {
    const accountId = req.user?.accountId;
    if (!accountId) {
      console.log(`⚠️ [DASHBOARD] Request không có accountId`);
      return res.status(400).json({
        success: false,
        message: 'Account ID không hợp lệ'
      });
    }

    console.log(`📊 [DASHBOARD] Lấy dashboard data cho account: ${accountId}`);
    const pool = await getDatabasePool();

    // Lấy thông tin character chính
    const characterQuery = `
      SELECT TOP 1 
        c.Name,
        c.cLevel,
        c.Experience,
        c.Class,
        c.Strength,
        c.Dexterity,
        c.Vitality,
        c.Energy,
        c.Leadership,
        c.Money,
        c.Life,
        c.MaxLife,
        c.Mana,
        c.MaxMana,
        c.MapNumber,
        c.MapPosX,
        c.MapPosY,
        c.PkCount,
        c.PkLevel,
        c.ResetCount,
        c.MasterResetCount
      FROM Character c
      WHERE c.AccountID = @accountId
      ORDER BY c.cLevel DESC, c.Experience DESC
    `;

    const characterResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(characterQuery);

    if (characterResult.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy nhân vật'
      });
    }

    const character = characterResult.recordset[0];

    // Lấy thông tin account
    const accountQuery = `
      SELECT 
        memb___id as Username,
        memb_name as CharacterName,
        mail_addr as Email,
        appl_days as CreatedDate,
        bloc_code as BlockStatus,
        AccountLevel,
        AccountExpireDate
      FROM MEMB_INFO 
      WHERE memb___id = @accountId
    `;

    const accountResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(accountQuery);

    const accountInfo = accountResult.recordset[0];

    res.json({
      success: true,
      data: {
        character,
        account: accountInfo
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi lấy thông tin dashboard'
    });
  }
});

export default router;

