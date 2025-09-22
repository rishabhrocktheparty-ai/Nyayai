import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const citizen = await prisma.citizenProfile.findFirst({ where: { userId: String(userId) } });
  if (!citizen) return res.status(404).json({ error: 'Citizen profile not found' });
  const entries = await prisma.notebookEntry.findMany({ where: { citizenId: citizen.id }, orderBy: { createdAt: 'desc' } });
  res.json({ entries });
}
