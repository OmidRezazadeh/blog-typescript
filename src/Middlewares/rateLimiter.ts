import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 3, 
  message: {
    status: 429,
    message: 'درخواست‌های زیادی ارسال شده است، لطفاً بعداً امتحان کنید',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
