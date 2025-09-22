import { Worker } from 'bullmq';
import { prisma } from '../lib/prisma';
import { sendSMS } from '../lib/notify/provider';

const worker = new Worker('notification', async job => {
  const { notificationId } = job.data as any;
  const n = await prisma.notification.findUnique({ where: { id: String(notificationId) }, include: { user: true } });
  if (!n) return;
  try {
    await sendSMS(n.user?.phone || '', n.message);
    await prisma.notification.update({ where: { id: n.id }, data: { status: 'sent', sentAt: new Date() } });
  } catch (e: any) {
    await prisma.notification.update({ where: { id: n.id }, data: { status: 'failed', meta: { error: e?.message } as any } });
  }
}, { connection: { url: process.env.REDIS_URL } });

worker.on('failed', (job, err) => console.error('notification failed', job?.id, err));
