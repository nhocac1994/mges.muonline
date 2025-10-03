export function logSecurityEvent(event: string, ip: string, details: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    ip,
    details,
    userAgent: details.userAgent || 'Unknown'
  };
  
  console.log('🔒 Security Event:', logEntry);
  
  // Log to file or external service
  // fs.appendFileSync('security.log', JSON.stringify(logEntry) + '\n');
}

export function logDatabaseEvent(event: string, query: string, duration: number, success: boolean) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    query: query.substring(0, 100), // Truncate long queries
    duration,
    success
  };
  
  console.log('📊 Database Event:', logEntry);
}

export function logRateLimitEvent(ip: string, endpoint: string, count: number) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: 'RATE_LIMIT',
    ip,
    endpoint,
    count
  };
  
  console.log('⏱️ Rate Limit Event:', logEntry);
}
