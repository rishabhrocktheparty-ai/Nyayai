import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, assigneeId, dueDate } = req.body;
    const t = await prisma.task.create({ data: { title, description, assigneeId, dueDate: dueDate ? new Date(dueDate) : null } });
    return res.json({ task: t });
  }
  if (req.method === 'GET') {
    const { assignee } = req.query;
    const tasks = await prisma.task.findMany({ where: { assigneeId: String(assignee) }, orderBy: { createdAt: 'desc' } });
    return res.json({ tasks });
  }
  return res.status(405).end();
}
