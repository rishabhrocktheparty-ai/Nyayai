import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import IORedis from 'ioredis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    let redisOk = 'skipped';
    if (process.env.REDIS_URL) {
      const r = new IORedis(process.env.REDIS_URL);
      await r.ping();
      r.disconnect();
      redisOk = 'ok';
    }
    res.status(200).json({ status: 'ok', db: 'ok', redis: redisOk });
  } catch (e: any) {
    res.status(500).json({ status: 'error', error: e?.message || 'unknown' });
  }
}
