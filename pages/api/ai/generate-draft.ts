import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { caseId, prompt } = req.body || {};
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
    });
    const text = response.choices?.[0]?.message?.content || '';
    res.json({ draft: text, advisory: true, requiresLegalReview: true, human_review_required: true });
  } catch (err: any) {
    res.json({ text: 'Stub summary: ' + String(prompt || '').slice(0, 500), advisory: true, requiresLegalReview: true, error: err.message });
  }
}
