import "server-only";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  signToken,
  verifyToken,
  type SessionPayload,
} from "./session";

/** Firma un JWT y lo guarda en una cookie httpOnly. */
export async function createSession(payload: SessionPayload) {
  const token = await signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

/** Lee y verifica la sesión actual. Devuelve null si no hay sesión válida. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export type { SessionPayload };
