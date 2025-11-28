// Simple in-memory rate limiter
// Not perfect for serverless but provides basic protection

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // seconds
}

export function rateLimit(
  identifier: string, 
  limit: number = 10, 
  windowMs: number = 60000 // 1 minute
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || record.resetTime < now) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return { success: true, remaining: limit - 1, resetIn: Math.ceil(windowMs / 1000) };
  }

  if (record.count >= limit) {
    // Rate limited
    const resetIn = Math.ceil((record.resetTime - now) / 1000);
    return { success: false, remaining: 0, resetIn };
  }

  // Increment count
  record.count++;
  const resetIn = Math.ceil((record.resetTime - now) / 1000);
  return { success: true, remaining: limit - record.count, resetIn };
}

