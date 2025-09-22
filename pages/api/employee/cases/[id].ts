import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { Queue } from 'bullmq';

const notifQueue = new Queue('notification', { connection: { url: process.env.REDIS_URL } });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'POST') {
    const { action } = req.body;
    if (action === 'mark-attendance') {
      const { hearingId, userId, status } = req.body;
      const att = await prisma.attendance.create({ data: { hearingId, userId, status } });
      return res.json({ attendance: att });
    }
    if (action === 'send-reminder') {
      const { userId, message } = req.body;
      const n = await prisma.notification.create({ data: { userId, type: 'reminder', message, status: 'queued' } });
      await notifQueue.add('notification:send', { notificationId: n.id });
      return res.json({ notificationId: n.id });
    }
  }
  return res.status(405).end();
}
