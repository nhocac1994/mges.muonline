// Security validation functions (tái sử dụng từ Next.js)

export function validateAccountId(accountId: string): { valid: boolean; error?: string } {
  if (!accountId || accountId.trim().length === 0) {
    return { valid: false, error: 'Tên đăng nhập không được để trống' };
  }
  
  if (accountId.length < 4 || accountId.length > 10) {
    return { valid: false, error: 'Tên đăng nhập phải từ 4-10 ký tự' };
  }
  
  if (!/^[a-zA-Z0-9]+$/.test(accountId)) {
    return { valid: false, error: 'Tên đăng nhập chỉ được chứa chữ cái và số' };
  }
  
  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || password.trim().length === 0) {
    return { valid: false, error: 'Mật khẩu không được để trống' };
  }
  
  if (password.length < 4 || password.length > 10) {
    return { valid: false, error: 'Mật khẩu phải từ 4-10 ký tự' };
  }
  
  return { valid: true };
}

export function detectSQLInjection(input: string): boolean {
  if (!input) return false;
  
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/i,
    /(--|#|\/\*|\*\/|;)/,
    /(\bOR\b.*=.*=)/i,
    /(\bAND\b.*=.*=)/i,
    /('|"|`).*(\bor\b|\band\b).*('|"|`)/i
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

