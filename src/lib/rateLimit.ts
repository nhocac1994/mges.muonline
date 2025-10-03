import { NextApiRequest, NextApiResponse } from 'next';

interface RateLimitData {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitData>();

export function rateLimit(
  maxRequests: number = 10,
  windowMs: number = 24 * 60 * 60 * 1000 // 24 hours
) {
  return (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const key = `rate_limit_${clientIP}`;
    
    const now = Date.now();
    const userLimit = rateLimitMap.get(key);
    
    if (!userLimit || now > userLimit.resetTime) {
      // Reset counter
      rateLimitMap.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      next();
    } else if (userLimit.count >= maxRequests) {
      // Rate limit exceeded
      res.status(429).json({
        success: false,
        message: `Bạn đã vượt quá giới hạn ${maxRequests} lần đăng nhập/ngày. Vui lòng thử lại sau 24h.`,
        resetTime: new Date(userLimit.resetTime).toISOString()
      });
    } else {
      // Increment counter
      userLimit.count++;
      rateLimitMap.set(key, userLimit);
      next();
    }
  };
}

export function getRateLimitInfo(ip: string) {
  const key = `rate_limit_${ip}`;
  const userLimit = rateLimitMap.get(key);
  
  if (!userLimit) {
    return { count: 0, resetTime: null };
  }
  
  return {
    count: userLimit.count,
    resetTime: new Date(userLimit.resetTime).toISOString()
  };
}
