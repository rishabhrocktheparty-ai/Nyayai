import { NextApiRequest, NextApiResponse } from 'next';
import { Queue } from 'bullmq';

const podcastQueue = new Queue('podcast', { connection: { url: process.env.REDIS_URL } });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { caseId } = req.body;
  if (!caseId) return res.status(400).json({ error: 'caseId required' });
  const job = await podcastQueue.add('podcast:generate', { caseId });
  res.json({ jobId: job.id });
}
