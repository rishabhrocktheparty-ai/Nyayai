import { Worker } from 'bullmq';
import { prisma } from '../lib/prisma';

const worker = new Worker('analysis', async job => {
  const { caseId } = job.data as any;
  const result = `Auto-analysis for case ${caseId} generated at ${new Date().toISOString()}`;
  await prisma.analysis.create({ data: { caseId: String(caseId), result, meta: { advisory: true, requiresLegalReview: true } as any } });
}, { connection: { url: process.env.REDIS_URL } });

worker.on('failed', (job, err) => {
  console.error('Job failed', job?.id, err);
});
