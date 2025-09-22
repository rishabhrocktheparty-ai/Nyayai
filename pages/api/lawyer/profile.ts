import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const { userId } = req.query as { userId: string };
  const profile = await prisma.lawyerProfile.findFirst({ where: { userId }, include: { subscription: true } });
  res.json({ profile });
}
