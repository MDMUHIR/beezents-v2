/**
 * Converts backend error responses into user-friendly messages and field
 * errors so the CMS never has to dump raw JSON.
 */

export interface ValidationDetailItem {
  loc: unknown[];
  msg: string;
  type?: string;
}

export interface ParsedApiError {
  /** Human readable summary shown in the form alert box. */
  message: string;
  /**
   * Field keyed errors. Keys use the backend `loc` paths with the leading
   * `payload` segment removed (e.g. `slug`, `cover_file`, `category_ids`).
   */
  fieldErrors: Record<string, string>;
  status: number;
  code: 'auth' | 'forbidden' | 'not-found' | 'conflict' | 'too-large' | 'validation' | 'server' | 'network' | 'unknown';
  detail?: unknown;
}

const statusMessage = (status: number): string => {
  switch (status) {
    case 401:
      return 'Your session has expired. Please sign in again to continue.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested item no longer exists. It may have been deleted by another admin.';
    case 409:
      return 'This item conflicts with existing data (for example, the slug may already be in use).';
    case 413:
      return 'The selected file is too large.';
    default:
      return '';
  }
};

const lastMeaningfulLoc = (loc: unknown[]): string => {
  const parts = loc
    .filter((segment): segment is string | number =>
      typeof segment === 'string' || typeof segment === 'number')
    .map((segment) => String(segment));
  // Strip the multipart wrapper field names ("payload", "body", "query").
  const meaningful = parts.filter((part) => !['payload', 'body', 'query', 'path'].includes(part));
  return meaningful.length > 0 ? meaningful.join('.') : parts.join('.');
};

const detailArrayToFieldErrors = (detail: ValidationDetailItem[]): Record<string, string> => {
  const fieldErrors: Record<string, string> = {};
  for (const item of detail) {
    const key = lastMeaningfulLoc(item.loc || []);
    if (key && !fieldErrors[key]) fieldErrors[key] = item.msg;
  }
  return fieldErrors;
};

export const parseApiError = (status: number, data: unknown): ParsedApiError => {
  // Network / timeout failures surface as status 0 from the client.
  if (status === 0) {
    const message = typeof data === 'string' && data
      ? data
      : 'Unable to reach the backend. Check that it is running and reachable.';
    return { message, fieldErrors: {}, status, code: 'network', detail: data };
  }

  const detail = (data && typeof data === 'object' && 'detail' in (data as Record<string, unknown>))
    ? (data as { detail?: unknown }).detail
    : undefined;

  // FastAPI style validation detail: [{ loc, msg, type }]
  if (status === 422 && Array.isArray(detail)) {
    const items = detail as unknown[];
    const parsedItems = items
      .filter((item): item is ValidationDetailItem =>
        typeof item === 'object' && item !== null && typeof (item as ValidationDetailItem).msg === 'string')
      .map((item) => ({ loc: item.loc || [], msg: item.msg, type: item.type }));

    const fieldErrors = detailArrayToFieldErrors(parsedItems);
    const firstMessage = parsedItems[0]?.msg;
    return {
      message: firstMessage
        ? `Please correct the highlighted fields${parsedItems.length > 1 ? ` (${parsedItems.length} issues found)` : ''}.`
        : 'Please review the highlighted fields and try again.',
      fieldErrors,
      status,
      code: 'validation',
      detail,
    };
  }

  // For 409 the backend usually explains the exact conflict (e.g. duplicate
  // slug); prefer that message over the generic text.
  const specificDetail = typeof detail === 'string' && detail.trim() ? detail : undefined;
  const message = (status === 409 && specificDetail)
    ? specificDetail
    : statusMessage(status) ||
      specificDetail ||
      (typeof data === 'string' && data.trim() ? data : undefined) ||
      `The request failed (status ${status}). Please try again.`;

  const code: ParsedApiError['code'] = status === 401
    ? 'auth'
    : status === 403
      ? 'forbidden'
      : status === 404
        ? 'not-found'
        : status === 409
          ? 'conflict'
          : status === 413
            ? 'too-large'
            : status >= 500
              ? 'server'
              : 'unknown';

  return { message, fieldErrors: {}, status, code, detail };
};
