/**
 * Minimal, dependency-free CSV serialisation for admin exports.
 * RFC-4180-ish: fields containing comma, quote, or newline are wrapped
 * in double quotes with internal quotes doubled. Values are coerced to
 * string; null/undefined become empty cells.
 */
function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: { key: keyof T; header: string }[],
): string {
  const head = columns.map((c) => escapeCell(c.header)).join(',');
  const body = rows
    .map((row) => columns.map((c) => escapeCell(row[c.key])).join(','))
    .join('\r\n');
  return body ? `${head}\r\n${body}` : head;
}

/** Build the headers for a CSV download response. */
export function csvHeaders(filename: string): HeadersInit {
  return {
    'content-type': 'text/csv; charset=utf-8',
    'content-disposition': `attachment; filename="${filename}"`,
    'cache-control': 'no-store',
  };
}
