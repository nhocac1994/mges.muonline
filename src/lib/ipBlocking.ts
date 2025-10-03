interface BlockedIP {
  ip: string;
  reason: string;
  blockedAt: Date;
  expiresAt: Date;
}

const blockedIPs = new Set<string>();
const suspiciousIPs = new Map<string, { count: number; lastSeen: Date }>();

export function isIPBlocked(ip: string): boolean {
  return blockedIPs.has(ip);
}

export function addSuspiciousActivity(ip: string, reason: string) {
  const now = new Date();
  const suspicious = suspiciousIPs.get(ip);
  
  if (suspicious) {
    suspicious.count++;
    suspicious.lastSeen = now;
    
    // Block IP if too many suspicious activities
    if (suspicious.count >= 5) {
      blockedIPs.add(ip);
      console.log(`🚫 IP ${ip} blocked due to suspicious activity: ${reason}`);
    }
  } else {
    suspiciousIPs.set(ip, { count: 1, lastSeen: now });
  }
}

export function getBlockedIPs(): string[] {
  return Array.from(blockedIPs);
}

export function getSuspiciousIPs(): Array<{ip: string, count: number, lastSeen: Date}> {
  return Array.from(suspiciousIPs.entries()).map(([ip, data]) => ({
    ip,
    count: data.count,
    lastSeen: data.lastSeen
  }));
}

export function unblockIP(ip: string): boolean {
  if (blockedIPs.has(ip)) {
    blockedIPs.delete(ip);
    suspiciousIPs.delete(ip);
    console.log(`✅ IP ${ip} unblocked`);
    return true;
  }
  return false;
}
