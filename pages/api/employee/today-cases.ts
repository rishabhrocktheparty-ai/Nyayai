import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const { courtId } = req.query;
  const today = new Date();
  today.setHours(0,0,0,0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const hearings = await prisma.hearing.findMany({
    where: { date: { gte: today, lt: tomorrow }, ...(courtId ? { judge: { user: { id: String(courtId) } } } : {}) },
    include: { case: true, judge: true }
  });
  res.json({ hearings });
}
