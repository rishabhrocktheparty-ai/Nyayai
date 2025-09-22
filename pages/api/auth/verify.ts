import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { signToken, setAuthCookie } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, otp } = req.body;
  const log = await prisma.auditLog.findFirst({ where: { action: "otp_generated", details: { contains: email } }, orderBy: { createdAt: "desc" } });
  if (!log) return res.status(400).json({ error: "No OTP found" });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });
  const token = signToken({ userId: user.id, role: user.role });
  setAuthCookie(res, token);
  return res.json({ ok: true, advisory: true, requiresLegalReview: true, human_review_required: true });
}
