import { CookieOptions } from 'express';

export const ACCESS_TOKEN_COOKIE = 'access_token';

// Mesma lógica de leitura do JWT_EXPIRES_IN usada em auth.module.ts,
// convertida para milissegundos (maxAge do cookie).
function parseExpiresInToMs(expiresIn: string): number {
  const match = /^(\d+)(s|m|h|d)?$/.exec(expiresIn);
  if (!match) return 24 * 60 * 60 * 1000; // fallback: 1 dia

  const value = Number(match[1]);
  const unit = match[2];
  const unitMs: Record<string, number> = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return value * (unit ? unitMs[unit] : 1000);
}

export function buildAccessTokenCookieOptions(): CookieOptions {
  const envExpiresIn = process.env.JWT_EXPIRES_IN
    ? process.env.JWT_EXPIRES_IN.trim().replace(/['"]/g, '')
    : '1d';

  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: parseExpiresInToMs(envExpiresIn),
  };
}
