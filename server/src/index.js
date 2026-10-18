import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import contactRouter from './routes/contact.js';
import portfolioRouter from './routes/portfolio.js';

const app = express();
const port = Number(process.env.PORT) || 5000;
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
  }),
);
app.use(express.json({ limit: '20kb' }));

app.use(
  '/api/contact',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, errors: ['Too many messages. Please try again later.'] },
  }),
);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-api', env: process.env.NODE_ENV || 'development' });
});

app.use('/api/portfolio', portfolioRouter);
app.use('/api/contact', contactRouter);

app.use((err, _req, res, _next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ ok: false, errors: ['Origin not allowed.'] });
  }
  console.error(err);
  return res.status(500).json({ ok: false, errors: ['Unexpected server error.'] });
});

app.listen(port, () => {
  console.log(`Portfolio API listening on port ${port} (${isProduction ? 'production' : 'development'})`);
});
