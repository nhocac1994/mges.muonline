const sql = require('mssql');

const config = {
  server: '103.200.20.23\\SQLEXPRESS', // IP VPS với instance SQLEXPRESS
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

async function testConnection() {
  try {
    console.log('🔄 Đang kết nối database...');
    console.log('Server:', config.server);
    console.log('Database:', config.database);
    console.log('User:', config.user);
    
    const pool = await sql.connect(config);
    console.log('✅ Kết nối thành công!');
    
    // Test query
    const result = await pool.request().query('SELECT 1 as test');
    console.log('✅ Query test thành công:', result.recordset[0]);
    
    // Test table exists
    const tableCheck = await pool.request().query('SELECT COUNT(*) as count FROM MEMB_INFO');
    console.log('✅ Bảng MEMB_INFO tồn tại, có', tableCheck.recordset[0].count, 'records');
    
    await pool.close();
    console.log('✅ Đóng kết nối thành công!');
    
  } catch (error) {
    console.error('❌ Lỗi kết nối database:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Gợi ý: Kiểm tra SQL Server có đang chạy không');
    } else if (error.code === 'ELOGIN') {
      console.log('💡 Gợi ý: Kiểm tra username/password');
    } else if (error.code === 'ENOTFOUND') {
      console.log('💡 Gợi ý: Kiểm tra tên server');
    } else if (error.code === 'EINSTLOOKUP') {
      console.log('💡 Gợi ý: Kiểm tra SQL Server Browser service');
    }
  }
}

testConnection();