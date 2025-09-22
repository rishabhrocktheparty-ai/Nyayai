import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { userId, provider = 'demo' } = req.body;
  const lp = await prisma.lawyerProfile.findFirst({ where: { userId } });
  if (!lp) return res.status(404).json({ error: 'profile not found' });
  const sub = await prisma.subscription.upsert({
    where: { lawyerId: lp.id },
    update: { status: 'active', provider },
    create: { lawyerId: lp.id, provider, status: 'active' }
  });
  res.json({ subscription: sub });
}
