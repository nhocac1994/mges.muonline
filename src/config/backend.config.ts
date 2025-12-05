// Backend API Configuration
// URL của Backend API Server trên VPS
// Đọc từ environment variable NEXT_PUBLIC_BACKEND_API_URL
// Nếu không có, dùng giá trị mặc định
export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://14.225.208.182:56666';

/**
 * Lấy URL đầy đủ cho backend API endpoint
 * @param endpoint - API endpoint (ví dụ: '/api/auth/login')
 * @returns URL đầy đủ
 */
export const getBackendUrl = (endpoint: string): string => {
  // Đảm bảo endpoint bắt đầu bằng /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${BACKEND_API_URL}${normalizedEndpoint}`;
};

/**
 * Helper function để gọi backend API với error handling
 */
export const callBackendAPI = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = getBackendUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  return fetch(url, defaultOptions);
};

