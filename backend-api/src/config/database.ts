import sql from 'mssql';
import { loadConfig } from '../utils/config-loader';

// Load config nếu chưa load
if (!process.env.DB_SERVER) {
  loadConfig();
}

const config: sql.config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'MuOnline',
  user: process.env.DB_USERNAME || 'sa',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    instanceName: process.env.DB_INSTANCE || '',
    connectTimeout: 30000,
    requestTimeout: 30000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool: sql.ConnectionPool | null = null;

export async function getDatabasePool(): Promise<sql.ConnectionPool> {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log('✅ Đã kết nối database thành công');
    }
    return pool;
  } catch (error) {
    console.error('❌ Lỗi kết nối database:', error);
    throw new Error('Không thể kết nối đến database');
  }
}

export async function closeDatabasePool(): Promise<void> {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('✅ Đã đóng kết nối database');
    }
  } catch (error) {
    console.error('❌ Lỗi đóng kết nối database:', error);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeDatabasePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDatabasePool();
  process.exit(0);
});

