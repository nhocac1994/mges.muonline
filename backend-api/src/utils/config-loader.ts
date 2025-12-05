import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

/**
 * Load config from .env hoặc config.txt
 * Ưu tiên .env, nếu không có thì đọc từ config.txt
 */
export function loadConfig() {
  const envPath = path.join(process.cwd(), '.env');
  const configTxtPath = path.join(process.cwd(), 'config.txt');

  // Thử load .env trước
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log('✅ Đã load config từ .env');
    return;
  }

  // Nếu không có .env, thử load từ config.txt
  if (fs.existsSync(configTxtPath)) {
    const configContent = fs.readFileSync(configTxtPath, 'utf-8');
    const lines = configContent.split('\n');

    lines.forEach((line) => {
      // Bỏ qua comment và dòng trống
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const equalIndex = trimmedLine.indexOf('=');
        if (equalIndex > 0) {
          const key = trimmedLine.substring(0, equalIndex).trim();
          const value = trimmedLine.substring(equalIndex + 1).trim();
          
          // Loại bỏ quotes nếu có
          const cleanValue = value.replace(/^["']|["']$/g, '');
          
          // Set environment variable
          if (!process.env[key]) {
            process.env[key] = cleanValue;
          }
        }
      }
    });

    console.log('✅ Đã load config từ config.txt');
    return;
  }

  console.log('⚠️  Không tìm thấy .env hoặc config.txt, sử dụng giá trị mặc định');
}

