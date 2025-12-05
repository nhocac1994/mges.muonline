import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth';
import accountsRoutes from './routes/accounts';
import charactersRoutes from './routes/characters';
import rankingsRoutes from './routes/rankings';
import dashboardRoutes from './routes/dashboard';
import { loadConfig } from './utils/config-loader';
import { requestLogger, errorLogger } from './middleware/logging';

// Load environment variables từ .env hoặc config.txt
loadConfig();

const app = express();
const PORT = parseInt(process.env.PORT || '56666', 10); // Port mặc định cho VPS
const NODE_ENV = process.env.NODE_ENV || 'production';

// Logging Middleware - Phải đặt trước các middleware khác
app.use(requestLogger);

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Cho phép tất cả origins (có thể restrict sau)
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Quá nhiều requests từ IP này, vui lòng thử lại sau.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/characters', charactersRoutes);
app.use('/api/rankings', rankingsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint không tồn tại' 
  });
});

// Error Handler - Sử dụng errorLogger
app.use(errorLogger);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ 
    success: false, 
    message: 'Lỗi server nội bộ' 
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend API Server đang chạy trên port ${PORT}`);
  console.log(`📡 Environment: ${NODE_ENV}`);
  console.log(`🔒 Security: Enabled`);
  console.log(`🌐 Server accessible at: http://0.0.0.0:${PORT}`);
});

