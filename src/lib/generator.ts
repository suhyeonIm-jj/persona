import { words, WordCategory, enWords } from "./words";

// ─── 한글 (8자 / 12자 템플릿) ──────────────────────────────────────────────

interface Segment { type: WordCategory; count: number; }
type Template = Segment[];

const templates: Record<8 | 12, Template[]> = {
  8: [
    [{ type: "personality", count: 4 }, { type: "nature", count: 2 }, { type: "creature", count: 2 }],
    [{ type: "personality", count: 3 }, { type: "color", count: 2 }, { type: "creature", count: 3 }],
    [{ type: "personality", count: 4 }, { type: "creature", count: 4 }],
    [{ type: "nature", count: 2 }, { type: "personality", count: 3 }, { type: "creature", count: 3 }],
    [{ type: "personality", count: 3 }, { type: "nature", count: 2 }, { type: "creature", count: 3 }],
  ],
  12: [
    [{ type: "personality", count: 4 }, { type: "nature", count: 4 }, { type: "creature", count: 4 }],
    [{ type: "nature", count: 4 }, { type: "personality", count: 4 }, { type: "creature", count: 4 }],
    [{ type: "personality", count: 3 }, { type: "nature", count: 3 }, { type: "personality", count: 3 }, { type: "creature", count: 3 }],
    [{ type: "personality", count: 3 }, { type: "nature", count: 2 }, { type: "personality", count: 3 }, { type: "creature", count: 4 }],
    [{ type: "personality", count: 4 }, { type: "personality", count: 4 }, { type: "creature", count: 4 }],
  ],
};

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getPool(type: WordCategory, count: number): string[] {
  return words[type][count] ?? [];
}

function applyTemplate(template: Template): string {
  const used = new Set<string>();
  return template.map((seg) => {
    const pool = getPool(seg.type, seg.count);
    const available = pool.filter((w) => !used.has(w));
    const word = available.length > 0 ? randomPick(available) : randomPick(pool);
    used.add(word);
    return word;
  }).join("");
}

export function generateProfileName(length: 8 | 12): string {
  const list = [...templates[length]].sort(() => Math.random() - 0.5);
  for (const template of list) {
    if (template.every((seg) => getPool(seg.type, seg.count).length > 0)) {
      const name = applyTemplate(template);
      if (name.length === length) return name;
    }
  }
  // 폴백
  const p4 = randomPick(getPool("personality", 4));
  if (length === 8) return p4 + randomPick(getPool("nature", 2)) + randomPick(getPool("creature", 2));
  return p4 + randomPick(getPool("nature", 4)) + randomPick(getPool("creature", 4));
}

// ─── 영어 (단일 단어 + 발음 + 의미) ───────────────────────────────────────

export interface EnglishResult {
  name: string;
  meaning: string;
  pronunciation: string;
}

export function generateEnglishName(): EnglishResult {
  const picked = randomPick(enWords);
  return { name: picked.word, meaning: picked.meaning, pronunciation: picked.pronunciation };
}
