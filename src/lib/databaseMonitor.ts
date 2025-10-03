import { getConnectionPool } from './database';

export async function checkDatabaseHealth() {
  const pool = await getConnectionPool();
  
  try {
    // Check connection count
    const connectionCount = await pool.request()
      .query('SELECT COUNT(*) as connections FROM sys.dm_exec_connections');
    
    // Check active queries
    const activeQueries = await pool.request()
      .query('SELECT COUNT(*) as active_queries FROM sys.dm_exec_requests');
    
    // Check database size
    const dbSize = await pool.request()
      .query('SELECT SUM(size) * 8 / 1024 as size_mb FROM sys.database_files');
    
    return {
      connections: connectionCount.recordset[0].connections,
      activeQueries: activeQueries.recordset[0].active_queries,
      dbSize: dbSize.recordset[0].size_mb,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Database health check failed:', error);
    throw error;
  }
}

export async function getDatabaseStats() {
  const pool = await getConnectionPool();
  
  try {
    // Get database statistics
    const stats = await pool.request()
      .query(`
        SELECT 
          DB_NAME() as database_name,
          COUNT(*) as total_users,
          SUM(CASE WHEN memb__pwd IS NOT NULL THEN 1 ELSE 0 END) as users_with_password
        FROM MEMB_INFO
      `);
    
    return stats.recordset[0];
  } catch (error) {
    console.error('Database stats failed:', error);
    throw error;
  }
}
