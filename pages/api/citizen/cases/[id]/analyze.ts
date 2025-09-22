import { NextApiRequest, NextApiResponse } from 'next';
import { Queue } from 'bullmq';

const analysisQueue = new Queue('analysis', { connection: { url: process.env.REDIS_URL } });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { id } = req.query;
  const job = await analysisQueue.add('analysis:run', { caseId: id });
  return res.json({ jobId: job.id });
}
