# Mu Online Backend API Server

Backend API server để bảo mật kết nối database, thay thế việc Next.js kết nối trực tiếp với SQL Server.

## 🎯 Mục Đích

- **Bảo mật**: Đóng port 1433 ra internet, chỉ backend kết nối localhost
- **Authentication**: JWT token cho mọi request
- **Rate Limiting**: Chống brute force, DDoS
- **Centralized**: Tập trung logic database ở một nơi

## 🚀 Cài Đặt

```bash
cd backend-api
npm install
```

## ⚙️ Cấu Hình

1. Copy `.env.example` thành `.env`:
```bash
cp .env.example .env
```

2. Cập nhật các giá trị trong `.env`:
- `DB_SERVER`: localhost (không đổi)
- `DB_NAME`: Tên database
- `DB_USERNAME`: Username SQL Server
- `DB_PASSWORD`: Password SQL Server
- `FRONTEND_URL`: URL Vercel của bạn
- `JWT_SECRET`: Secret key cho JWT (tạo random string)

## 🏃 Chạy Server

### Development:
```bash
npm run dev
```

### Production:
```bash
npm run build
npm start
```

### Production với PM2:
```bash
npm install -g pm2
pm2 start dist/server.js --name mu-backend-api
pm2 save
pm2 startup
```

## 🔒 Firewall Configuration

Trên VPS, chỉ mở port 443 (HTTPS) cho backend:

```bash
# Chỉ mở port 443
ufw allow 443/tcp

# Đóng port 1433 (SQL Server)
ufw deny 1433/tcp

# Đóng port 3000 nếu không dùng (hoặc chỉ localhost)
ufw deny 3000/tcp

ufw enable
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký

### Accounts (Cần JWT)
- `GET /api/accounts/me` - Lấy thông tin tài khoản

### Characters (Cần JWT)
- `GET /api/characters` - Lấy danh sách nhân vật

### Rankings (Public)
- `GET /api/rankings/level` - Bảng xếp hạng level
- `GET /api/rankings/guild` - Bảng xếp hạng guild

## 🔐 JWT Authentication

1. Login để lấy token:
```bash
POST /api/auth/login
{
  "username": "testuser",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

2. Sử dụng token trong header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔄 Cập Nhật Next.js

Thay vì gọi database trực tiếp, Next.js API routes sẽ gọi backend API:

```typescript
// src/app/api/login/route.ts
export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  const response = await fetch('https://your-backend-api.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  return Response.json(await response.json());
}
```

## 📝 Next Steps

1. Deploy backend lên VPS
2. Cấu hình Nginx reverse proxy (HTTPS)
3. Cập nhật Next.js API routes
4. Test và monitor

