import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, phone, password, role = "CITIZEN", name } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "User exists" });

  const user = await prisma.user.create({ data: { email, password, role } });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await prisma.auditLog.create({ data: { action: "otp_generated", details: `OTP for ${email}: ${otp}` } });
  return res.json({ userId: user.id, otp });
}
