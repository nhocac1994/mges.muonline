# Hướng dẫn cấu hình SQL Server trên VPS để accept remote connections

## Vấn đề hiện tại:
- Kết nối từ xa bị timeout
- SQL Server chỉ accept localhost connections
- Cần cấu hình để accept remote connections

## Các bước cấu hình trên VPS:

### 1. Mở SQL Server Configuration Manager
- Start → SQL Server Configuration Manager
- Hoặc tìm "SQL Server Configuration Manager" trong Start Menu

### 2. Enable TCP/IP Protocol
- SQL Server Network Configuration → Protocols for SQLEXPRESS
- Right-click "TCP/IP" → Properties
- Tab "Protocol": Enabled = Yes
- Tab "IP Addresses": 
  - IPAll: TCP Port = 1433
  - IPAll: TCP Dynamic Ports = (để trống)
- Click OK

### 3. Start SQL Server Browser Service
- Services → SQL Server Browser
- Right-click → Start
- Set Startup Type = Automatic

### 4. Restart SQL Server Service
- Services → SQL Server (SQLEXPRESS)
- Right-click → Restart

### 5. Cấu hình Firewall
```cmd
netsh advfirewall firewall add rule name="SQL Server" dir=in action=allow protocol=TCP localport=1433
netsh advfirewall firewall add rule name="SQL Browser" dir=in action=allow protocol=UDP localport=1434
```

### 6. Test kết nối từ VPS
```cmd
sqlcmd -S localhost\SQLEXPRESS -U sa -P kRcxWkedQRJhSeV5
```

### 7. Test kết nối từ xa
```cmd
sqlcmd -S 103.200.20.23\SQLEXPRESS -U sa -P kRcxWkedQRJhSeV5
```

## Troubleshooting:

### Nếu vẫn timeout:
1. Kiểm tra SQL Server đang chạy: `net start | findstr SQL`
2. Kiểm tra port 1433: `netstat -an | findstr 1433`
3. Kiểm tra firewall: `netsh advfirewall show allprofiles`
4. Test telnet: `telnet 103.200.20.23 1433`

### Nếu lỗi login:
1. Kiểm tra SQL Server Authentication mode
2. Enable SQL Server Authentication
3. Tạo user mới nếu cần

## Sau khi cấu hình xong:
- Test từ ứng dụng: `node test-connection.js`
- Nếu thành công, có thể deploy ứng dụng
