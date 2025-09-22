import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import Redis from 'ioredis';

type Status = {
  app: 'ok';
  env: Record<string, boolean>;
  db: { ok: boolean; error?: string };
  redis: { ok: true } | { ok: false; skipped?: true; error?: string };
  uptime: number;
};

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Status>) {
  const env = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    JWT_SECRET: !!process.env.JWT_SECRET,
    REDIS_URL: !!process.env.REDIS_URL,
    S3_BUCKET: !!process.env.S3_BUCKET,
    S3_REGION: !!process.env.S3_REGION,
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_APP_NAME: !!process.env.NEXT_PUBLIC_APP_NAME,
  } as const;

  let dbOk = false;
  let dbErr: string | undefined;
  try {
    await prisma.$queryRawUnsafe('SELECT 1');
    try {
      await prisma.$queryRawUnsafe('SELECT 1 FROM "_prisma_migrations" LIMIT 1');
    } catch (e: any) {
      dbErr = `migrations_check: ${e?.message || 'unknown'}`;
    }
    dbOk = true;
  } catch (e: any) {
    dbOk = false;
    dbErr = e?.message || 'unknown';
  }

  let redis: Status['redis'];
  if (!process.env.REDIS_URL) {
    redis = { ok: false, skipped: true };
  } else {
    try {
      const r = new Redis(process.env.REDIS_URL, { lazyConnect: true, maxRetriesPerRequest: 1 } as any);
      await r.connect();
      await r.ping();
      await r.quit();
      redis = { ok: true };
    } catch (e: any) {
      redis = { ok: false, error: e?.message || 'unknown' };
    }
  }

  res.status(200).json({ app: 'ok', env, db: { ok: dbOk, error: dbErr }, redis, uptime: process.uptime() });
}
