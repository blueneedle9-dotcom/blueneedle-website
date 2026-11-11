import crypto from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(crypto.scrypt);
const SCRYPT_KEY_LENGTH = 64;

function getTokenSecret() {
  return (
    process.env.AUTH_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'blueneedle-local-dev-secret-change-me'
  );
}

export function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function validatePassword(password) {
  if (typeof password !== 'string' || password.length === 0) {
    return 'Password is required.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (password.length > 128) {
    return 'Password must be 128 characters or fewer.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must include at least one lowercase letter.';
  }
  if (!/\d/.test(password)) {
    return 'Password must include at least one number.';
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return 'Password must include at least one special character (e.g. ! @ # $).';
  }
  return null;
}

/**
 * Hashes a plaintext password using Node's native crypto.scrypt + 16-byte random salt.
 * Format: scrypt$<32-char-hex-salt>$<128-char-hex-derived-key>
 */
export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(password, salt, SCRYPT_KEY_LENGTH);
  return `scrypt$${salt}$${Buffer.from(derivedKey).toString('hex')}`;
}

/**
 * Constant-time password verification against a stored scrypt hash.
 */
export async function verifyPassword(password, storedHash) {
  if (typeof password !== 'string' || typeof storedHash !== 'string') {
    return false;
  }

  const parts = storedHash.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') {
    return false;
  }

  const [, salt, hashHex] = parts;
  if (!salt || !hashHex) {
    return false;
  }

  try {
    const keyBuffer = Buffer.from(hashHex, 'hex');
    const derivedKey = Buffer.from(
      await scryptAsync(password, salt, keyBuffer.length)
    );
    if (keyBuffer.length !== derivedKey.length) {
      return false;
    }
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

export function signAuthToken(user, rememberMe = true) {
  const ttlMs = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 12 * 60 * 60 * 1000;
  const payload = {
    sub: user.id,
    email: user.email,
    fullName: user.full_name,
    role: user.role || 'user',
    exp: Date.now() + ttlMs,
  };

  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getTokenSecret())
    .update(payloadEncoded)
    .digest('base64url');

  return `${payloadEncoded}.${signature}`;
}

export function verifyAuthToken(token) {
  if (typeof token !== 'string' || !token.includes('.')) {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return null;
  }

  const [payloadEncoded, providedSignature] = parts;
  if (!payloadEncoded || !providedSignature) {
    return null;
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', getTokenSecret())
      .update(payloadEncoded)
      .digest('base64url');

    const providedBuf = Buffer.from(providedSignature);
    const expectedBuf = Buffer.from(expectedSignature);
    if (
      providedBuf.length !== expectedBuf.length ||
      !crypto.timingSafeEqual(providedBuf, expectedBuf)
    ) {
      return null;
    }

    const decoded = JSON.parse(
      Buffer.from(payloadEncoded, 'base64url').toString('utf8')
    );
    if (!decoded || typeof decoded.exp !== 'number' || decoded.exp <= Date.now()) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function sanitizeUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    role: row.role || 'user',
    accountType: row.account_type || 'b2b',
    verificationStatus: row.verification_status || 'verified',
    isActive: row.is_active !== false,
    lastLoginAt: row.last_login_at || null,
    createdAt: row.created_at || null,
  };
}
