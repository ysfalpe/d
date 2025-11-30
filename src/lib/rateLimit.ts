import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Redis client - Upstash env variables'dan otomatik okur
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Rate limiters
const minuteLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // Dakikada 10
  prefix: "ratelimit:minute",
});

const dailyLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 d"), // Günde 100
  prefix: "ratelimit:daily",
});

const monthlyLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1000, "30 d"), // Ayda 1000
  prefix: "ratelimit:monthly",
});

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // seconds
  limitType?: "minute" | "daily" | "monthly";
}

export async function rateLimit(userId: string): Promise<RateLimitResult> {
  try {
    // 1. Dakika limiti kontrolü
    const minuteResult = await minuteLimit.limit(userId);
    if (!minuteResult.success) {
      return {
        success: false,
        remaining: minuteResult.remaining,
        resetIn: Math.ceil((minuteResult.reset - Date.now()) / 1000),
        limitType: "minute",
      };
    }

    // 2. Günlük limit kontrolü
    const dailyResult = await dailyLimit.limit(userId);
    if (!dailyResult.success) {
      return {
        success: false,
        remaining: dailyResult.remaining,
        resetIn: Math.ceil((dailyResult.reset - Date.now()) / 1000),
        limitType: "daily",
      };
    }

    // 3. Aylık limit kontrolü
    const monthlyResult = await monthlyLimit.limit(userId);
    if (!monthlyResult.success) {
      return {
        success: false,
        remaining: monthlyResult.remaining,
        resetIn: Math.ceil((monthlyResult.reset - Date.now()) / 1000),
        limitType: "monthly",
      };
    }

    // Tüm limitler OK
    return {
      success: true,
      remaining: Math.min(
        minuteResult.remaining,
        dailyResult.remaining,
        monthlyResult.remaining
      ),
      resetIn: 0,
    };
  } catch (error) {
    console.error("Rate limit error:", error);
    // Redis hatası durumunda izin ver (fail-open)
    return { success: true, remaining: 999, resetIn: 0 };
  }
}

// Kullanım durumunu kontrol et (UI için)
export async function getRateLimitStatus(userId: string): Promise<{
  minute: { remaining: number; limit: number };
  daily: { remaining: number; limit: number };
  monthly: { remaining: number; limit: number };
}> {
  try {
    const [minuteResult, dailyResult, monthlyResult] = await Promise.all([
      minuteLimit.getRemaining(userId),
      dailyLimit.getRemaining(userId),
      monthlyLimit.getRemaining(userId),
    ]);

    return {
      minute: { remaining: minuteResult, limit: 10 },
      daily: { remaining: dailyResult, limit: 100 },
      monthly: { remaining: monthlyResult, limit: 1000 },
    };
  } catch (error) {
    console.error("Get rate limit status error:", error);
    return {
      minute: { remaining: 10, limit: 10 },
      daily: { remaining: 100, limit: 100 },
      monthly: { remaining: 1000, limit: 1000 },
    };
  }
}
