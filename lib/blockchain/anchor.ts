import { prisma } from "../prisma";
import crypto from "crypto";

export async function anchorEvidence(hash: string) {
  const anchorId = crypto.randomUUID();
  await prisma.auditLog.create({
    data: {
      action: "anchor_created",
      details: `Anchor created for hash ${hash}`,
    },
  });
  await prisma.evidence.updateMany({ where: { hash }, data: { anchorId } });
  return { anchorId, txid: null };
}
