import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, title, description } = req.body;
    if (!userId || !title) return res.status(400).json({ error: 'userId and title required' });
    const citizen = await prisma.citizenProfile.findFirst({ where: { userId } });
    if (!citizen) return res.status(404).json({ error: 'Citizen profile not found' });
    const c = await prisma.case.create({ data: { title, description, citizenId: citizen.id } });
    return res.json({ case: c });
  } else if (req.method === 'GET') {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    const citizen = await prisma.citizenProfile.findFirst({ where: { userId: String(userId) } });
    if (!citizen) return res.status(404).json({ error: 'Citizen profile not found' });
    const cases = await prisma.case.findMany({ where: { citizenId: citizen.id }, orderBy: { createdAt: 'desc' } });
    return res.json({ cases });
  }
  return res.status(405).end();
}
