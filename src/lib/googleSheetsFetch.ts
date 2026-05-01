/** Default ISR when GOOGLE_SHEETS_*_REVALIDATE_SECONDS is unset (production). */
const DEFAULT_REVALIDATE_SECONDS = 300;

/**
 * Shared by all public sheet fetches. Checks `GOOGLE_SHEETS_REVALIDATE_SECONDS`, then
 * `GOOGLE_SHEETS_LINEAGE_REVALIDATE_SECONDS` for backward compatibility.
 */
export function getGoogleSheetsFetchRevalidate(): number {
  const raw =
    process.env.GOOGLE_SHEETS_REVALIDATE_SECONDS?.trim() ||
    process.env.GOOGLE_SHEETS_LINEAGE_REVALIDATE_SECONDS?.trim();
  if (raw !== undefined && raw !== "") {
    const n = Number(raw);
    if (Number.isFinite(n) && n >= 0) {
      return Math.floor(n);
    }
  }
  return process.env.NODE_ENV === "development" ? 0 : DEFAULT_REVALIDATE_SECONDS;
}

export function looksLikeHtmlResponse(text: string): boolean {
  const head = text.replace(/^\uFEFF/, "").slice(0, 400).toLowerCase();
  return head.includes("<!doctype html") || head.includes("<html");
}

export function buildGvizCsvUrl(spreadsheetId: string, gid: string): string {
  const q = new URLSearchParams({ tqx: "out:csv", gid });
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/gviz/tq?${q}`;
}

export function buildExportCsvUrl(spreadsheetId: string, gid: string): string {
  const q = new URLSearchParams({ format: "csv", gid });
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/export?${q}`;
}

export const GOOGLE_SHEETS_FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
} as const;

/** gviz first (works for anonymous server fetches), then `/export` fallback. */
export async function fetchPublicGoogleSheetCsv(
  spreadsheetId: string,
  gid: string,
): Promise<string | null> {
  const isDev = process.env.NODE_ENV === "development";
  const cacheOpt: RequestInit & {
    next?: { revalidate?: number };
    cache?: RequestCache;
  } = isDev
    ? { cache: "no-store" }
    : { next: { revalidate: getGoogleSheetsFetchRevalidate() } };

  const urls = [
    buildGvizCsvUrl(spreadsheetId, gid),
    buildExportCsvUrl(spreadsheetId, gid),
  ];

  for (const url of urls) {
    let res: Response;
    try {
      res = await fetch(url, {
        ...cacheOpt,
        headers: { ...GOOGLE_SHEETS_FETCH_HEADERS },
      });
    } catch {
      continue;
    }
    if (!res.ok) continue;
    const text = await res.text();
    if (looksLikeHtmlResponse(text)) continue;
    return text;
  }
  return null;
}

/**
 * Accepts a bare spreadsheet id or a full `docs.google.com/.../d/<id>/...` URL.
 */
export function resolveSpreadsheetFromEnv(options: {
  rawSpreadsheetInput: string | undefined;
  rawGidInput: string | undefined;
  logPrefix: string;
}): { id: string; gid: string } | null {
  const raw = options.rawSpreadsheetInput?.trim();
  if (!raw) return null;

  let gid = options.rawGidInput?.trim() || "0";

  const fromUrl = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  const id = fromUrl
    ? fromUrl[1]!
    : raw.replace(/\/.*$/, "").split("?")[0]!.trim();

  if (!id || id.length < 20) {
    console.warn(
      `${options.logPrefix} Spreadsheet id looks invalid (use the long id from the sheet URL).`,
    );
    return null;
  }

  const gidFromUrl = raw.match(/[#&?]gid=(\d+)/);
  if (gidFromUrl && !options.rawGidInput?.trim()) {
    gid = gidFromUrl[1]!;
  }

  return { id, gid };
}
