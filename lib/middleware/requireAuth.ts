import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../auth";

export function requireAuth(handler: (req: NextApiRequest & { user?: any }, res: NextApiResponse) => any) {
  return async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
    const token = (req as any).cookies?.NYAY_TOKEN;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const payload = verifyToken(token as string);
      (req as any).user = payload;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
