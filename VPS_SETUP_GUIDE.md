# Hướng dẫn cấu hình VPS để kết nối database

## Vấn đề hiện tại:
- Lỗi timeout khi kết nối đến VPS
- Có thể VPS chưa mở port 1433
- SQL Server chưa được cấu hình để accept remote connections

## Các bước cấu hình trên VPS:

### 1. Kiểm tra SQL Server đang chạy:
```bash
# Trên VPS Windows
net start | findstr SQL
```

### 2. Mở port 1433 trên firewall:
```bash
# Windows Firewall
netsh advfirewall firewall add rule name="SQL Server" dir=in action=allow protocol=TCP localport=1433
```

### 3. Cấu hình SQL Server để accept remote connections:
- Mở SQL Server Configuration Manager
- Enable TCP/IP protocol
- Restart SQL Server service

### 4. Kiểm tra SQL Server Browser service:
- Đảm bảo SQL Server Browser service đang chạy
- Service này cần thiết để kết nối đến named instance

### 5. Test kết nối từ VPS:
```bash
# Trên VPS, test kết nối local
sqlcmd -S localhost\SQLEXPRESS -U sa -P kRcxWkedQRJhSeV5
```

### 6. Kiểm tra port 1433:
```bash
# Trên VPS
netstat -an | findstr 1433
```

## Cấu hình database cho ứng dụng:

### File `.env.local`:
```bash
DB_SERVER=103.200.20.23\\SQLEXPRESS
DB_NAME=MuOnline
DB_USERNAME=sa
DB_PASSWORD=kRcxWkedQRJhSeV5
DB_PORT=1433
NEXT_TELEMETRY_DISABLED=1
```

## Troubleshooting:
- Nếu vẫn timeout: Kiểm tra firewall và SQL Server configuration
- Nếu lỗi login: Kiểm tra username/password
- Nếu lỗi instance: Kiểm tra SQL Server Browser service
