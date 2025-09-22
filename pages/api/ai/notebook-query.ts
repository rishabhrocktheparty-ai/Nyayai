import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { userId, context, question } = req.body;
  const id = `q_${Date.now()}`;
  res.json({ id, answer: 'This is an advisory answer stub.', advisory: true, requiresLegalReview: true, human_review_required: true });
}
