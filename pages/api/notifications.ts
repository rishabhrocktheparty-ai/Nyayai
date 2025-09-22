import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { Queue } from 'bullmq';

const notifQueue = new Queue('notification', { connection: { url: process.env.REDIS_URL } });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, type, message, meta } = req.body;
    const n = await prisma.notification.create({ data: { userId, type, message, meta, status: 'queued' } });
    await notifQueue.add('notification:send', { notificationId: n.id });
    return res.json({ notificationId: n.id });
  }
  if (req.method === 'GET') {
    const { userId } = req.query;
    const list = await prisma.notification.findMany({ where: { userId: String(userId) }, orderBy: { createdAt: 'desc' } });
    return res.json({ notifications: list });
  }
  return res.status(405).end();
}
