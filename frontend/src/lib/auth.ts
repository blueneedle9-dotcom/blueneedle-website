export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin' | string;
  accountType: string;
  verificationStatus: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string | null;
}

export interface AuthResponse {
  message?: string;
  token: string;
  user: AuthUser;
}

const STORAGE_KEY = 'blueneedle_auth_session';
export const AUTH_CHANGE_EVENT = 'blueneedle-auth-change';

function emitAuthChange(): void {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getStoredAuth(): { token: string; user: AuthUser } | null {
  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { token?: unknown; user?: unknown };
    if (
      typeof parsed?.token === 'string' &&
      parsed.token.length > 0 &&
      parsed.user &&
      typeof parsed.user === 'object'
    ) {
      return {
        token: parsed.token,
        user: parsed.user as AuthUser,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function saveAuth(
  token: string,
  user: AuthUser,
  rememberMe = true
): void {
  const payload = JSON.stringify({ token, user });
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);

  if (rememberMe) {
    window.localStorage.setItem(STORAGE_KEY, payload);
  } else {
    window.sessionStorage.setItem(STORAGE_KEY, payload);
  }
  emitAuthChange();
}

export function clearAuth(): void {
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
  emitAuthChange();
}

export function getAuthHeader(): Record<string, string> {
  const auth = getStoredAuth();
  return auth?.token ? { Authorization: `Bearer ${auth.token}` } : {};
}

export function validateEmailInput(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return 'Please enter a valid email address.';
  }
  return null;
}

export function validateNameInput(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return 'Full name or username is required.';
  if (trimmed.length < 2) return 'Name must be at least 2 characters long.';
  if (trimmed.length > 100) return 'Name must be 100 characters or fewer.';
  return null;
}

export function validatePasswordInput(password: string): string | null {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters long.';
  if (password.length > 128) return 'Password must be 128 characters or fewer.';
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
