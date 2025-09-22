import { Worker } from 'bullmq';
import { prisma } from '../lib/prisma';

const worker = new Worker('anchor', async job => {
  const { evidenceId } = job.data as any;
  const e = await prisma.evidence.findUnique({ where: { id: String(evidenceId) } });
  if (!e) return;
  // no-op stub for on-chain anchor finalization
  return { ok: true };
}, { connection: { url: process.env.REDIS_URL } });

worker.on('failed', (job, err) => console.error('anchor failed', job?.id, err));
