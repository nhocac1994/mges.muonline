import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { getDatabasePool } from '../config/database';
import sql from 'mssql';

const router = express.Router();

// Tất cả routes cần authentication
router.use(authenticateToken);

// Get characters by account
router.get('/', async (req: AuthRequest, res: Response) => {
  const startTime = Date.now();
  const accountId = req.user?.accountId;
  try {
    console.log(`👤 [CHARACTERS] Lấy danh sách characters cho account: ${accountId}`);
    const pool = await getDatabasePool();
    const result = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(`
        SELECT Name, cLevel, Class, Strength, Dexterity, Vitality, Energy, 
               Money, MapNumber, PkLevel, CtlCode
        FROM Character 
        WHERE AccountID = @accountId
        ORDER BY cLevel DESC
      `);

    const duration = Date.now() - startTime;
    console.log(`✅ [CHARACTERS] Lấy thành công ${result.recordset.length} characters cho ${accountId} (${duration}ms)`);

    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ [CHARACTERS] Lỗi lấy danh sách nhân vật cho ${accountId} (${duration}ms):`, error);
    res.status(500).json({
      success: false,
      message: 'Lỗi lấy danh sách nhân vật'
    });
  }
});

export default router;

