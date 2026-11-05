import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { logger } from './config/logger';
import { healthRouter } from './routes/health';
import { contactRouter } from './routes/contact';
import { dataRouter } from './routes/data';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Security middleware
app.use(helmet({ contentSecurityPolicy: false }));

// CORS configuration
app.use(
  cors({
    origin: [env.CLIENT_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Global request rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', generalLimiter);

// Strict rate limiter for contact endpoint
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 6, // max 6 submissions per hour
  message: {
    success: false,
    error: 'Too many messages sent. Please wait before submitting another inquiry.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/contact', contactLimiter);

// Body parsers
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true, limit: '15kb' }));

// Request logging via Morgan & Winston
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// API Routing
app.use('/api/health', healthRouter);
app.use('/api/contact', contactRouter);
app.use('/api', dataRouter);

// 404 handler for unrecognized API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
  });
});

// Centralized error handling middleware
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(env.PORT, () => {
    logger.info(`⚡ Devang Chaudhari Portfolio Server listening on port ${env.PORT}`);
    logger.info(`⚡ Running in ${env.NODE_ENV} mode`);
    logger.info(`⚡ Allowed Client Origin: ${env.CLIENT_URL}`);
  });
}

export default app;
