import IORedis from "ioredis";

const redis = process.env.REDIS_URL ? new IORedis(process.env.REDIS_URL) : null;

export async function checkRateLimit(key: string, limit = 10, windowSeconds = 60) {
  if (!redis) return true;
  try {
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }
    return current <= limit;
  } catch (err) {
    return true;
  }
}
