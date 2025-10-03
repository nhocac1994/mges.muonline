import sql from 'mssql';
import { getConnectionPool } from './database';

export async function safeLoginQuery(username: string, password: string) {
  const pool = await getConnectionPool();
  
  try {
    // Use parameterized queries to prevent SQL injection
    const result = await pool.request()
      .input('username', sql.VarChar(10), username)
      .input('password', sql.VarChar(10), password)
      .query(`
        SELECT memb___id, memb_name 
        FROM MEMB_INFO 
        WHERE memb___id = @username 
        AND memb__pwd = @password
        AND memb__pwd IS NOT NULL
        AND LEN(memb__pwd) > 0
      `);
    
    return result.recordset;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database connection failed');
  }
}

export async function safeRegisterQuery(userData: any) {
  const pool = await getConnectionPool();
  
  try {
    // Validate input data
    if (!userData.username || userData.username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }
    
    if (!userData.password || userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Check if username already exists
    const existingUser = await pool.request()
      .input('username', sql.VarChar(10), userData.username)
      .query('SELECT memb___id FROM MEMB_INFO WHERE memb___id = @username');
    
    if (existingUser.recordset.length > 0) {
      throw new Error('Username already exists');
    }
    
    // Insert new user with parameterized query
    const result = await pool.request()
      .input('username', sql.VarChar(10), userData.username)
      .input('password', sql.VarChar(10), userData.password)
      .input('email', sql.VarChar(50), userData.email)
      .input('phone', sql.VarChar(15), userData.phone)
      .query(`
        INSERT INTO MEMB_INFO (memb___id, memb__pwd, mail_addr, phone)
        VALUES (@username, @password, @email, @phone)
      `);
    
    return result;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function safeCheckUsername(username: string): Promise<boolean> {
  const pool = await getConnectionPool();
  
  try {
    const result = await pool.request()
      .input('username', sql.VarChar(10), username)
      .query('SELECT memb___id FROM MEMB_INFO WHERE memb___id = @username');
    
    return result.recordset.length > 0;
  } catch (error) {
    console.error('Username check error:', error);
    throw new Error('Database connection failed');
  }
}
