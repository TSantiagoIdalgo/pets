import rateLimit from 'express-rate-limit';

// Configuración del limitador
export const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
  message: 'To many request',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip as string,
  statusCode: 429
});