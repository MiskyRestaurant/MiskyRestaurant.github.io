// Lógica de sesión pura (sólo jose) — segura para edge runtime / middleware.
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "misky_session";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "insecure-dev-secret-change-me-please-32chars",
);

export type SessionPayload = {
  userId: number;
  email: string;
  name: string;
};

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
