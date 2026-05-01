import { parse } from "csv-parse/sync";
import {
  fetchPublicGoogleSheetCsv,
  resolveSpreadsheetFromEnv,
} from "@/lib/googleSheetsFetch";
import {
  executiveBoard as staticExecutiveBoard,
  executiveBoardHeadshots,
  type ExecutiveBoardMember,
} from "@/site/content";

function normalizeHeaderCell(raw: string): string {
  return raw.replace(/^\uFEFF+/, "").trim().toLowerCase();
}

/** Word-safe match so "composition" etc. don’t count as Position. */
function isPositionLikeHeader(c: string): boolean {
  if (
    c === "position" ||
    c === "positions" ||
    c === "role" ||
    c === "title" ||
    c === "office" ||
    c === "rank"
  ) {
    return true;
  }
  return /\bpositions?\b/.test(c);
}

function isNameLikeHeader(c: string): boolean {
  return (
    c === "name" ||
    c === "full name" ||
    c === "brother" ||
    c === "member" ||
    /\bname\b/.test(c)
  );
}

/** First row is a real header (labels, not a data row). */
function isExecutiveBoardHeaderRow(row: string[]): boolean {
  const joined = row.map(normalizeHeaderCell);
  if (joined.filter((c) => c.length > 0).length < 2) return false;
  return joined.some(isNameLikeHeader) && joined.some(isPositionLikeHeader);
}

/** Row is literally "Name" / "Position" (or swapped) — some exports only match this. */
function rowIsNamePositionColumnLabels(row: string[]): boolean {
  const a = normalizeHeaderCell(row[0] ?? "");
  const b = normalizeHeaderCell(row[1] ?? "");
  return (
    (a === "name" && b === "position") || (a === "position" && b === "name")
  );
}

function lookupHeadshot(name: string): string | null {
  const key = name.trim().toLowerCase();
  const path = executiveBoardHeadshots[key];
  return path ?? null;
}

function parseExecutiveBoardCsv(csvText: string): ExecutiveBoardMember[] {
  const text = csvText.replace(/^\uFEFF/, "");

  let records: string[][];
  try {
    records = parse(text, {
      columns: false,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    }) as string[][];
  } catch (e) {
    console.warn("[executiveBoard] Could not parse CSV from sheet.", e);
    return [];
  }

  if (records.length === 0) return [];

  const headerRow = records[0]!;
  const useHeader =
    isExecutiveBoardHeaderRow(headerRow) ||
    rowIsNamePositionColumnLabels(headerRow);
  const cells = headerRow.map(normalizeHeaderCell);

  let nameIdx = 0;
  let positionIdx = 1;
  let photoIdx: number | null = null;

  if (useHeader) {
    if (rowIsNamePositionColumnLabels(headerRow)) {
      const a = normalizeHeaderCell(headerRow[0] ?? "");
      const b = normalizeHeaderCell(headerRow[1] ?? "");
      if (a === "name" && b === "position") {
        nameIdx = 0;
        positionIdx = 1;
      } else {
        nameIdx = 1;
        positionIdx = 0;
      }
    } else {
      const nIdx = cells.findIndex(isNameLikeHeader);
      const pIdx = cells.findIndex(isPositionLikeHeader);
      if (nIdx >= 0) nameIdx = nIdx;
      if (pIdx >= 0) positionIdx = pIdx;
    }

    const ph = cells.findIndex(
      (c) =>
        c === "photo" ||
        c === "headshot" ||
        c === "image" ||
        (c.includes("photo") && !isPositionLikeHeader(c)),
    );
    photoIdx = ph >= 0 ? ph : null;
  }

  const startIndex = useHeader ? 1 : 0;
  const out: ExecutiveBoardMember[] = [];

  for (let r = startIndex; r < records.length; r++) {
    const row = records[r]!;
    if (rowIsNamePositionColumnLabels(row)) continue;

    const name = (row[nameIdx] ?? "").trim();
    const position = (row[positionIdx] ?? "").trim();
    if (!name && !position) continue;
    if (!name || !position) continue;

    let photo: string | null = null;
    if (photoIdx != null) {
      const fromSheet = (row[photoIdx] ?? "").trim();
      if (fromSheet) photo = fromSheet;
    }
    if (photo == null) {
      photo = lookupHeadshot(name);
    }

    out.push({ name, position, photo });
  }

  return out;
}

function resolveExecutiveBoardSheetEnv(): { id: string; gid: string } | null {
  return resolveSpreadsheetFromEnv({
    rawSpreadsheetInput: process.env.GOOGLE_SHEETS_EXECUTIVE_BOARD_SPREADSHEET_ID,
    rawGidInput: process.env.GOOGLE_SHEETS_EXECUTIVE_BOARD_GID,
    logPrefix: "[executiveBoard]",
  });
}

/**
 * Executive board for the Leadership section. Uses `GOOGLE_SHEETS_EXECUTIVE_BOARD_*`
 * when set; otherwise `executiveBoard` in `src/site/content.ts`.
 */
export async function getExecutiveBoard(): Promise<ExecutiveBoardMember[]> {
  const resolved = resolveExecutiveBoardSheetEnv();

  if (!resolved) {
    return [...staticExecutiveBoard];
  }

  const { id, gid } = resolved;

  try {
    const text = await fetchPublicGoogleSheetCsv(id, gid);
    if (text == null) {
      console.warn(
        "[executiveBoard] Could not load CSV (tried gviz + export). Share the sheet: Anyone with the link → Viewer. Using static fallback.",
      );
      return [...staticExecutiveBoard];
    }

    const rows = parseExecutiveBoardCsv(text);
    if (rows.length === 0 && text.length > 50) {
      console.warn(
        "[executiveBoard] Sheet loaded but no rows parsed — use row 1 headers Name | Position (optional Photo).",
      );
    }
    return rows.length > 0 ? rows : [...staticExecutiveBoard];
  } catch (err) {
    console.warn("[executiveBoard] Could not load sheet; using static fallback.", err);
    return [...staticExecutiveBoard];
  }
}
