import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const c = await prisma.case.findUnique({ where: { id: String(id) }, include: { documents: true, analyses: true } });
    if (!c) return res.status(404).json({ error: 'Case not found' });
    return res.json({ case: c, documents: c.documents, analyses: c.analyses });
  }
  return res.status(405).end();
}
