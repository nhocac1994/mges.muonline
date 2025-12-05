import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { getDatabasePool } from '../config/database';
import sql from 'mssql';

const router = express.Router();

// Tất cả routes cần authentication
router.use(authenticateToken);

// Get account info
router.get('/me', async (req: AuthRequest, res: Response) => {
  try {
    const pool = await getDatabasePool();
    const result = await pool.request()
      .input('accountId', sql.VarChar(10), req.user?.accountId)
      .query('SELECT memb___id, memb_name, mail_addr, tel__numb FROM MEMB_INFO WHERE memb___id = @accountId');

    if (result.recordset.length > 0) {
      res.json({
        success: true,
        data: result.recordset[0]
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy tài khoản'
      });
    }
  } catch (error) {
    console.error('Get account error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi lấy thông tin tài khoản'
    });
  }
});

export default router;

