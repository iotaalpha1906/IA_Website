import { parse } from "csv-parse/sync";
import {
  fetchPublicGoogleSheetCsv,
  resolveSpreadsheetFromEnv,
} from "@/lib/googleSheetsFetch";
import {
  chapterLineage as staticChapterLineage,
  type ChapterLineageEntry,
} from "@/site/content";

function resolveLineageSheetEnv(): { id: string; gid: string } | null {
  return resolveSpreadsheetFromEnv({
    rawSpreadsheetInput: process.env.GOOGLE_SHEETS_LINEAGE_SPREADSHEET_ID,
    rawGidInput: process.env.GOOGLE_SHEETS_LINEAGE_GID,
    logPrefix: "[chapterLineage]",
  });
}

/** Strip BOM (Google CSV often starts with FEFF) and tidy cells. */
function normalizeHeaderCell(raw: string): string {
  return raw.replace(/^\uFEFF+/, "").trim().toLowerCase();
}

function isMemberHeader(cell: string): boolean {
  return (
    /^member\s*\d+\s*$/.test(cell) ||
    /^member\d+\s*$/.test(cell) ||
    /^brother\s*\d+\s*$/.test(cell) ||
    /^brother\d+\s*$/.test(cell)
  );
}

/** Row 1 of the sheet — Line Name, Semester/Year, Member 1…, optional Dean. */
function isHeaderRow(row: string[]): boolean {
  const cells = row.map(normalizeHeaderCell);
  if (cells.some((c) => isMemberHeader(c))) {
    return true;
  }
  const a = cells[0] ?? "";
  if (a.includes("line") && a.includes("name")) return true;
  if (a.replace(/\s/g, "") === "linename") return true;
  const b = cells[1] ?? "";
  if (b === "dean" || b.startsWith("dean ")) return true;
  if (b.includes("semester") || b.includes("year")) return true;
  return false;
}

function buildColumnMap(headerRow: string[]): {
  lineIdx: number;
  semesterIdx: number | null;
  deanIdx: number | null;
  memberIndices: number[];
} {
  const cells = headerRow.map(normalizeHeaderCell);

  let lineIdx = cells.findIndex(
    (c) => c === "line name" || (c.includes("line") && c.includes("name")),
  );
  if (lineIdx < 0) lineIdx = 0;

  const semesterIdxRaw = cells.findIndex(
    (c) =>
      c === "semester/year" ||
      c === "semester year" ||
      (c.includes("semester") && c.includes("year")) ||
      c === "semester" ||
      c === "term",
  );
  const semesterIdx = semesterIdxRaw >= 0 ? semesterIdxRaw : null;

  const deanIdxRaw = cells.findIndex(
    (c) => c === "dean" || c.startsWith("dean "),
  );
  const deanIdx = deanIdxRaw >= 0 ? deanIdxRaw : null;

  const memberIndices: number[] = [];
  headerRow.forEach((raw, i) => {
    const c = normalizeHeaderCell(raw);
    if (isMemberHeader(c)) {
      memberIndices.push(i);
    }
  });

  if (memberIndices.length === 0) {
    const fixed = [lineIdx, semesterIdx ?? -1, deanIdx ?? -1].filter(
      (x) => x >= 0,
    );
    const start = Math.max(-1, ...fixed) + 1;
    for (let i = start; i < headerRow.length; i++) {
      if (i !== lineIdx && i !== semesterIdx && i !== deanIdx) {
        memberIndices.push(i);
      }
    }
  } else {
    memberIndices.sort((a, b) => a - b);
  }

  return { lineIdx, semesterIdx, deanIdx, memberIndices };
}

function parseLineageCsv(csvText: string): ChapterLineageEntry[] {
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
    console.warn("[chapterLineage] Could not parse CSV from sheet.", e);
    return [];
  }

  if (records.length === 0) return [];

  const headerRow = records[0]!;
  const useHeader = isHeaderRow(headerRow);
  const colMap = useHeader ? buildColumnMap(headerRow) : null;
  const startIndex = useHeader ? 1 : 0;
  const entries: ChapterLineageEntry[] = [];

  for (let r = startIndex; r < records.length; r++) {
    const row = records[r]!;

    if (colMap) {
      const rawLine = (row[colMap.lineIdx] ?? "").trim();
      const semester =
        colMap.semesterIdx != null
          ? (row[colMap.semesterIdx] ?? "").trim()
          : "";
      const lineName = semester ? `${semester}: ${rawLine}` : rawLine;
      const members = colMap.memberIndices
        .map((i) => (row[i] ?? "").trim())
        .filter(Boolean);
      if (!lineName) continue;
      entries.push({ lineName, members });
      continue;
    }

    const rawLine = (row[0] ?? "").trim();
    const semester = (row[1] ?? "").trim();
    const lineName = semester ? `${semester}: ${rawLine}` : rawLine;
    if (!rawLine) continue;
    const members = row
      .slice(2)
      .map((cell) => (cell ?? "").trim())
      .filter(Boolean);
    entries.push({ lineName, members });
  }

  return entries;
}

/**
 * Chapter lineage for the About section.
 *
 * When `GOOGLE_SHEETS_LINEAGE_SPREADSHEET_ID` is set, loads CSV via Google’s
 * spreadsheet API (gviz `out:csv`, with `/export` as fallback). Otherwise uses
 * `chapterLineage` in `src/site/content.ts`.
 */
export async function getChapterLineage(): Promise<ChapterLineageEntry[]> {
  const resolved = resolveLineageSheetEnv();

  if (!resolved) {
    return [...staticChapterLineage];
  }

  const { id: spreadsheetId, gid } = resolved;

  try {
    const text = await fetchPublicGoogleSheetCsv(spreadsheetId, gid);
    if (text == null) {
      console.warn(
        "[chapterLineage] Could not load CSV (tried gviz + export). Share the sheet: Anyone with the link → Viewer. Using static fallback.",
      );
      return [...staticChapterLineage];
    }

    const rows = parseLineageCsv(text);
    if (rows.length === 0 && text.length > 50) {
      console.warn(
        "[chapterLineage] Sheet loaded but no data rows parsed — check row 1 headers (Line Name, Semester/Year, Member 1, …) and that data starts on row 2.",
      );
    }
    return rows;
  } catch (err) {
    console.warn("[chapterLineage] Could not load sheet; using static fallback.", err);
    return [...staticChapterLineage];
  }
}
