import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const { judgeId } = req.query as { judgeId: string };
  const hearings = await prisma.hearing.findMany({ where: { judgeId }, orderBy: { date: 'asc' }, include: { case: true } });
  res.json({ hearings });
}
