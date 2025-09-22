import { NextApiRequest, NextApiResponse } from 'next';
import { getPresignedUploadUrl } from '../../../../../lib/s3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { filename, contentType } = req.body;
  if (!filename) return res.status(400).json({ error: 'filename required' });
  const key = `cases/${Date.now()}-${filename}`;
  const url = await getPresignedUploadUrl(key, contentType);
  const publicUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
  return res.json({ url, key, publicUrl });
}
