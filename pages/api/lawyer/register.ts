import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { userId, barId } = req.body;
  const profile = await prisma.lawyerProfile.upsert({
    where: { userId },
    update: { barId },
    create: { userId, barId }
  });
  res.json({ profile });
}
