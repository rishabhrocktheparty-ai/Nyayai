import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { assignmentId, content } = req.body;
    const d = await prisma.draft.create({ data: { assignmentId, content } });
    return res.json({ draft: d, advisory: true, requiresLegalReview: true, human_review_required: true });
  }
  if (req.method === 'GET') {
    const { id } = req.query;
    const c = await prisma.case.findUnique({ where: { id: String(id) }, include: { evidences: true, documents: true } });
    return res.json({ case: c });
  }
  return res.status(405).end();
}
