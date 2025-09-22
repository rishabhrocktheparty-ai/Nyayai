import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { sha256FromBuffer } from '../../../lib/hash';
import { anchorEvidence } from '../../../lib/blockchain/anchor';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { caseId } = req.query;
  const { filename, url, userId, file } = req.body;
  if (!filename || !url || !userId || !file) return res.status(400).json({ error: 'filename, url, userId, file required' });
  const fileBuffer = Buffer.from(file, 'base64');
  const hash = sha256FromBuffer(fileBuffer);

  const latest = await prisma.document.findFirst({ where: { caseId: String(caseId), filename }, orderBy: { version: 'desc' } });
  const version = latest ? latest.version + 1 : 1;
  const doc = await prisma.document.create({ data: { caseId: String(caseId), filename, url, hash, uploadedById: userId, version } });
  const evidence = await prisma.evidence.create({ data: { caseId: String(caseId), hash } });
  const anchor = await anchorEvidence(hash);
  await prisma.evidence.update({ where: { id: evidence.id }, data: { anchorId: anchor.anchorId, anchoredAt: anchor.txid ? new Date() : null } });
  return res.json({ doc, evidence, anchor });
}
