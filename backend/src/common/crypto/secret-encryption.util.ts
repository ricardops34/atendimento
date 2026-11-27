import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from 'crypto';

/**
 * Criptografia simétrica (AES-256-GCM) usada para guardar segredos em repouso no banco
 * (arquivo .pfx do certificado A1 e a senha dele). A chave vem de CERT_ENCRYPTION_KEY
 * (.env); se ausente, cai para JWT_SECRET só para não quebrar ambientes antigos sem a
 * variável configurada — em produção, configure CERT_ENCRYPTION_KEY com um valor próprio.
 *
 * Formato do buffer criptografado: [iv(12)][authTag(16)][ciphertext].
 */
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

function resolveKey(): Buffer {
  const secret = process.env.CERT_ENCRYPTION_KEY || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      'CERT_ENCRYPTION_KEY (ou JWT_SECRET) não configurada para criptografar dados sensíveis.',
    );
  }
  // SHA-256 do segredo configurado => sempre 32 bytes, independente do tamanho da string original.
  return createHash('sha256').update(secret).digest();
}

// Devolvido como Uint8Array "puro" (não Buffer) porque é isso que o client do Prisma espera
// para colunas `Bytes` nas tipagens geradas.
export function encryptBuffer(plain: Buffer): Uint8Array<ArrayBuffer> {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, resolveKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plain), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const out = new Uint8Array(
    new ArrayBuffer(iv.length + authTag.length + encrypted.length),
  );
  out.set(iv, 0);
  out.set(authTag, iv.length);
  out.set(encrypted, iv.length + authTag.length);
  return out;
}

export function decryptBuffer(payload: Buffer | Uint8Array): Buffer {
  const buf = Buffer.from(payload);
  const iv = buf.subarray(0, IV_LENGTH);
  const authTag = buf.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const encrypted = buf.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
  const decipher = createDecipheriv(ALGORITHM, resolveKey(), iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}

export function encryptText(plain: string): Uint8Array<ArrayBuffer> {
  return encryptBuffer(Buffer.from(plain, 'utf8'));
}

export function decryptText(payload: Buffer | Uint8Array): string {
  return decryptBuffer(payload).toString('utf8');
}
