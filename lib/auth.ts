import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const COOKIE_NAME = "NYAY_TOKEN";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function setAuthCookie(res: NextApiResponse, token: string) {
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : " ";
  const cookie = `${COOKIE_NAME}=${token}; Max-Age=${COOKIE_MAX_AGE}; Path=/; HttpOnly; SameSite=Strict;${secure}`;
  res.setHeader("Set-Cookie", cookie);
}

export function clearAuthCookie(res: NextApiResponse) {
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : " ";
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=deleted; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;${secure}`);
}
