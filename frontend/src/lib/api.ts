const rawBaseUrl = import.meta.env.VITE_API_URL || '';

/**
 * Normalized backend API base URL (empty string uses same-origin `/api/*` on Vercel
 * and Vite dev proxy locally).
 */
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

export class ApiError extends Error {
  status: number;
  field?: string;

  constructor(message: string, status = 500, field?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.field = field;
  }
}

export async function apiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
  } catch {
    throw new ApiError(
      'Unable to reach the server. Please check your internet connection or try again shortly.',
      0
    );
  }

  let data: Record<string, unknown> = {};
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  }

  if (!response.ok) {
    const serverMessage =
      typeof data.error === 'string' && data.error.trim()
        ? data.error
        : typeof data.message === 'string' && data.message.trim()
          ? data.message
          : response.status >= 500
            ? 'Server error occurred while processing your request. Please try again.'
            : `Request failed with status ${response.status}.`;

    const field = typeof data.field === 'string' ? data.field : undefined;
    throw new ApiError(serverMessage, response.status, field);
  }

  return data as T;
}
