import express, { Request, Response } from 'express';
import { getDatabasePool } from '../config/database';
import sql from 'mssql';
import { generateToken } from '../middleware/auth';
import { validateAccountId, validatePassword, detectSQLInjection } from '../utils/security';

const router = express.Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { username, password } = req.body;
    console.log(`🔐 [AUTH] Login attempt: ${username}`);

    // Validation
    if (!username || !password) {
      console.log(`⚠️ [AUTH] Login failed: Missing credentials`);
      return res.status(400).json({
        success: false,
        message: 'Tên đăng nhập và mật khẩu không được để trống'
      });
    }

    // Security checks
    if (detectSQLInjection(username) || detectSQLInjection(password)) {
      console.log(`🚨 [AUTH] Login blocked: SQL Injection detected for ${username}`);
      return res.status(400).json({
        success: false,
        message: 'Input không hợp lệ'
      });
    }

    const usernameValidation = validateAccountId(username);
    if (!usernameValidation.valid) {
      console.log(`⚠️ [AUTH] Login failed: Invalid username format - ${username}`);
      return res.status(400).json({
        success: false,
        message: usernameValidation.error || 'Tên đăng nhập không hợp lệ'
      });
    }

    // Database query
    console.log(`📊 [AUTH] Querying database for user: ${username}`);
    const pool = await getDatabasePool();
    const result = await pool.request()
      .input('username', sql.VarChar(10), username)
      .input('password', sql.VarChar(10), password)
      .query('SELECT memb___id, memb_name FROM MEMB_INFO WHERE memb___id = @username AND memb__pwd = @password');

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      const token = generateToken(user.memb___id, user.memb_name);
      const duration = Date.now() - startTime;
      console.log(`✅ [AUTH] Login successful: ${username} (${duration}ms)`);

      res.json({
        success: true,
        message: 'Đăng nhập thành công!',
        token,
        user: {
          accountId: user.memb___id,
          username: user.memb_name
        }
      });
    } else {
      const duration = Date.now() - startTime;
      console.log(`❌ [AUTH] Login failed: Invalid credentials for ${username} (${duration}ms)`);
      res.status(401).json({
        success: false,
        message: 'Tên đăng nhập hoặc mật khẩu không đúng!'
      });
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`💥 [AUTH] Login error (${duration}ms):`, error);
    res.status(500).json({
      success: false,
      message: 'Lỗi đăng nhập. Vui lòng thử lại sau.'
    });
  }
});

// Register
router.post('/register', async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { username, password, characterName, email, phone } = req.body;
    console.log(`📝 [AUTH] Register attempt: ${username}, character: ${characterName}`);

    // Validation
    if (!username || !password || !characterName || !email) {
      console.log(`⚠️ [AUTH] Register failed: Missing required fields`);
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin'
      });
    }

    // Security checks
    if (detectSQLInjection(username) || detectSQLInjection(password) || detectSQLInjection(characterName)) {
      console.log(`🚨 [AUTH] Register blocked: SQL Injection detected for ${username}`);
      return res.status(400).json({
        success: false,
        message: 'Input không hợp lệ'
      });
    }

    const usernameValidation = validateAccountId(username);
    if (!usernameValidation.valid) {
      return res.status(400).json({
        success: false,
        message: usernameValidation.error || 'Tên đăng nhập không hợp lệ'
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.error || 'Mật khẩu không hợp lệ'
      });
    }

    // Check if username exists
    const pool = await getDatabasePool();
    const checkUser = await pool.request()
      .input('username', sql.VarChar(10), username)
      .query('SELECT COUNT(*) as count FROM MEMB_INFO WHERE memb___id = @username');

    if (checkUser.recordset[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Tên đăng nhập đã tồn tại!'
      });
    }

    // Create account
    await pool.request()
      .input('username', sql.VarChar(10), username)
      .input('password', sql.VarChar(10), password)
      .input('characterName', sql.VarChar(10), characterName)
      .input('email', sql.VarChar(50), email)
      .input('phone', sql.VarChar(20), phone || '')
      .query(`
        INSERT INTO MEMB_INFO (
          memb___id, memb__pwd, memb_name, sno__numb, mail_addr, tel__numb,
          appl_days, bloc_code, ctl1_code, AccountLevel, AccountExpireDate
        ) VALUES (
          @username, @password, @characterName, '000000000000000000', @email, @phone,
          GETDATE(), '0', '0', 0, '2079-06-06'
        )
      `);

    res.json({
      success: true,
      message: 'Tạo tài khoản thành công!'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi tạo tài khoản. Vui lòng thử lại sau.'
    });
  }
});

export default router;

