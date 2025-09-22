import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'POST') {
    const { content } = req.body;
    const latest = await prisma.hearing.findFirst({ where: { caseId: String(id) }, orderBy: { date: 'desc' } });
    if (!latest) return res.status(404).json({ error: 'No hearing found' });
    const updated = await prisma.hearing.update({ where: { id: latest.id }, data: { minutes: content } });
    return res.json({ hearing: updated, advisory: true, requiresLegalReview: true, human_review_required: true });
  }
  if (req.method === 'GET') {
    const c = await prisma.case.findUnique({ where: { id: String(id) }, include: { analyses: true } });
    return res.json({ case: c, summary: c?.analyses?.[0]?.result || 'No summary', advisory: true, requiresLegalReview: true, human_review_required: true });
  }
  return res.status(405).end();
}
