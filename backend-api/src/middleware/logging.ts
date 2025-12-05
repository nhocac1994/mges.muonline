import { Request, Response, NextFunction } from 'express';

/**
 * Get client IP address from request
 */
function getClientIP(req: Request): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

/**
 * Format timestamp for logging
 */
function formatTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * Logging middleware để log tất cả API requests
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const clientIP = getClientIP(req);
  const timestamp = formatTimestamp();
  
  // Log request info
  const method = req.method;
  const path = req.path;
  const query = Object.keys(req.query).length > 0 ? JSON.stringify(req.query) : '';
  const body = req.body && Object.keys(req.body).length > 0 
    ? JSON.stringify(req.body).substring(0, 200) // Limit body log to 200 chars
    : '';
  
  // Log request
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📥 [${timestamp}] ${method} ${path}`);
  console.log(`   IP: ${clientIP}`);
  if (query) {
    console.log(`   Query: ${query}`);
  }
  if (body && method !== 'GET') {
    console.log(`   Body: ${body}${body.length >= 200 ? '...' : ''}`);
  }
  console.log(`${'='.repeat(80)}`);

  // Capture response
  const originalSend = res.send;
  res.send = function (data: any) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const statusEmoji = statusCode >= 500 ? '❌' : statusCode >= 400 ? '⚠️' : '✅';
    
    // Log response
    console.log(`\n${'='.repeat(80)}`);
    console.log(`${statusEmoji} [${formatTimestamp()}] ${method} ${path} - ${statusCode} (${duration}ms)`);
    console.log(`   IP: ${clientIP}`);
    
    // Log response data if error or small response
    if (statusCode >= 400) {
      try {
        const responseData = typeof data === 'string' ? JSON.parse(data) : data;
        if (responseData.message) {
          console.log(`   Error: ${responseData.message}`);
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
    
    console.log(`${'='.repeat(80)}\n`);
    
    return originalSend.call(this, data);
  };

  next();
}

/**
 * Error logging middleware
 */
export function errorLogger(err: Error, req: Request, res: Response, next: NextFunction) {
  const clientIP = getClientIP(req);
  const timestamp = formatTimestamp();
  const method = req.method;
  const path = req.path;
  
  console.error(`\n${'='.repeat(80)}`);
  console.error(`💥 [${timestamp}] ERROR: ${method} ${path}`);
  console.error(`   IP: ${clientIP}`);
  console.error(`   Error: ${err.message}`);
  console.error(`   Stack: ${err.stack}`);
  console.error(`${'='.repeat(80)}\n`);
  
  next(err);
}

