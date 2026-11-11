const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Normalized backend API base URL (no trailing slash).
 * Set VITE_API_URL in Vercel Frontend Environment Variables.
 */
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

export async function apiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `API request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}
