import { Worker } from 'bullmq';
import { prisma } from '../lib/prisma';

const worker = new Worker('podcast', async job => {
  const { caseId } = job.data as any;
  const url = `https://cdn.example.com/podcasts/${caseId}-${Date.now()}.mp3`;
  // store in podcast table by citizen lookup via case
  const c = await prisma.case.findUnique({ where: { id: String(caseId) }, include: { citizen: true } });
  if (c) {
    await prisma.podcast.create({ data: { citizenId: c.citizenId, url } });
  }
  return { url };
}, { connection: { url: process.env.REDIS_URL } });

worker.on('failed', (job, err) => console.error('podcast failed', job?.id, err));
