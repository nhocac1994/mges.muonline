# 🔧 Hướng Dẫn Cấu Hình Database

## 📋 **Bước 1: Cấu Hình Environment Variables**

Tạo file `.env.local` trong thư mục gốc của project:

```env
# Database Configuration
DB_SERVER=your-vps-ip-address
DB_NAME=MuOnline
DB_USER=sa
DB_PASSWORD=your-sql-server-password
DB_PORT=1433
```

**Ví dụ:**
```env
DB_SERVER=192.168.1.100
DB_NAME=MuOnline
DB_USER=sa
DB_PASSWORD=YourStrongPassword123
DB_PORT=1433
```

## 🗄️ **Bước 2: Cấu Hình SQL Server**

### **2.1. Mở SQL Server Management Studio**
- Kết nối đến SQL Server trên VPS
- Tạo database `MuOnline` nếu chưa có

### **2.2. Tạo Bảng MEMB_INFO**
```sql
USE MuOnline;
GO

CREATE TABLE MEMB_INFO (
    memb___id VARCHAR(10) PRIMARY KEY,
    memb__pwd VARCHAR(10) NOT NULL,
    mail_addr VARCHAR(50),
    phone VARCHAR(15),
    bloc_code INT DEFAULT 0,
    ctlcode INT DEFAULT 0,
    sno__numb VARCHAR(13) DEFAULT '0000000000000',
    chrt_id VARCHAR(10),
    ques_answ VARCHAR(50),
    answ_numb VARCHAR(50)
);
GO
```

### **2.3. Cấu Hình SQL Server Authentication**
1. **Mở SQL Server Configuration Manager**
2. **Enable TCP/IP Protocol:**
   - SQL Server Network Configuration → Protocols for MSSQLSERVER
   - Right-click TCP/IP → Properties → Enabled = Yes
   - Restart SQL Server service

3. **Cấu hình Firewall:**
   - Mở port 1433 trên Windows Firewall
   - Allow SQL Server through firewall

4. **Cấu hình SQL Server Authentication:**
   - SQL Server Management Studio → Security → Logins
   - Right-click → New Login
   - Login name: `sa`
   - Password: `your-strong-password`
   - Server roles: `sysadmin`

## 🌐 **Bước 3: Cấu Hình VPS**

### **3.1. Mở Port 1433**
```bash
# Windows Firewall
netsh advfirewall firewall add rule name="SQL Server" dir=in action=allow protocol=TCP localport=1433

# Hoặc qua Windows Firewall GUI
# Control Panel → System and Security → Windows Defender Firewall
# Advanced settings → Inbound Rules → New Rule
# Port → TCP → Specific local ports: 1433
```

### **3.2. Cấu Hình SQL Server**
```sql
-- Enable remote connections
EXEC sp_configure 'remote access', 1;
RECONFIGURE;

-- Enable TCP/IP
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'remote access', 1;
RECONFIGURE;
```

## 🔧 **Bước 4: Test Kết Nối**

### **4.1. Test từ VPS**
```bash
# Test telnet
telnet localhost 1433

# Test SQL Server
sqlcmd -S localhost -U sa -P your-password
```

### **4.2. Test từ Website**
1. Khởi động website: `npm run dev`
2. Truy cập: `http://localhost:3000/register`
3. Thử đăng ký tài khoản mới
4. Kiểm tra database có dữ liệu không

## 🚨 **Troubleshooting**

### **Lỗi Kết Nối Database:**
```bash
# Kiểm tra SQL Server service
net start MSSQLSERVER

# Kiểm tra port
netstat -an | findstr 1433

# Test kết nối
sqlcmd -S your-vps-ip -U sa -P password
```

### **Lỗi Authentication:**
- Kiểm tra username/password
- Kiểm tra SQL Server Authentication mode
- Kiểm tra user permissions

### **Lỗi Network:**
- Kiểm tra firewall
- Kiểm tra port forwarding
- Kiểm tra IP address

## 📝 **Ghi Chú**

- **Security:** Sử dụng password mạnh cho SQL Server
- **Backup:** Backup database thường xuyên
- **Monitoring:** Monitor database performance
- **SSL:** Cân nhắc enable SSL cho production

## 🔗 **Liên Kết Hữu Ích**

- [SQL Server Configuration](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/)
- [SQL Server Security](https://docs.microsoft.com/en-us/sql/relational-databases/security/)
- [Firewall Configuration](https://docs.microsoft.com/en-us/sql/sql-server/install/configure-the-windows-firewall/)
