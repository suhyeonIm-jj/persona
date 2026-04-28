import { words, WordCategory, enWords } from "./words";

interface Segment {
  type: WordCategory;
  count: number;
}

type Template = Segment[];

// ─── 한글 템플릿 ───────────────────────────────────────────────────────────
// 구조가 항상 [성격/상황] + [배경] + [동물] 순으로 의미가 자연스럽게 연결됨
// 예: "수줍은달빛고양이", "사랑스런봄날아침반딧불이", "수줍은봄날의다정한고양이"

const templates: Record<8 | 12, Template[]> = {
  8: [
    // 사랑스런 + 달빛 + 여우 → "사랑스런달빛여우"
    [{ type: "personality", count: 4 }, { type: "nature", count: 2 }, { type: "creature", count: 2 }],
    // 수줍은 + 하얀 + 고양이 → "수줍은하얀고양이"
    [{ type: "personality", count: 3 }, { type: "color", count: 2 }, { type: "creature", count: 3 }],
    // 사랑스런 + 반딧불이 → "사랑스런반딧불이"
    [{ type: "personality", count: 4 }, { type: "creature", count: 4 }],
    // 봄날 + 엉뚱한 + 다람쥐 → "봄날엉뚱한다람쥐"
    [{ type: "nature", count: 2 }, { type: "personality", count: 3 }, { type: "creature", count: 3 }],
    // 수줍은 + 달빛 + 고양이 → "수줍은달빛고양이"
    [{ type: "personality", count: 3 }, { type: "nature", count: 2 }, { type: "creature", count: 3 }],
  ],
  12: [
    // 사랑스런 + 달빛아래 + 반딧불이 → "사랑스런달빛아래반딧불이"
    [{ type: "personality", count: 4 }, { type: "nature", count: 4 }, { type: "creature", count: 4 }],
    // 달빛아래 + 사랑스런 + 반딧불이 → "달빛아래사랑스런반딧불이"
    [{ type: "nature", count: 4 }, { type: "personality", count: 4 }, { type: "creature", count: 4 }],
    // 수줍은 + 봄날의 + 다정한 + 고양이 → "수줍은봄날의다정한고양이"
    [{ type: "personality", count: 3 }, { type: "nature", count: 3 }, { type: "personality", count: 3 }, { type: "creature", count: 3 }],
    // 수줍은 + 달빛 + 다정한 + 반딧불이 → "수줍은달빛다정한반딧불이"
    [{ type: "personality", count: 3 }, { type: "nature", count: 2 }, { type: "personality", count: 3 }, { type: "creature", count: 4 }],
    // 사랑스런 + 포근하고 + 반딧불이 → "사랑스런포근하고반딧불이"
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
  return template
    .map((seg) => {
      const pool = getPool(seg.type, seg.count);
      const available = pool.filter((w) => !used.has(w));
      const word = available.length > 0 ? randomPick(available) : randomPick(pool);
      used.add(word);
      return word;
    })
    .join("");
}

export function generateProfileName(length: 8 | 12): string {
  const list = [...templates[length]].sort(() => Math.random() - 0.5);

  for (const template of list) {
    if (template.every((seg) => getPool(seg.type, seg.count).length > 0)) {
      const name = applyTemplate(template);
      if (name.length === length) return name;
    }
  }

  // 폴백: personality(4) + nature(2) + creature(2) or personality(4) + nature(4) + creature(4)
  const p4 = randomPick(getPool("personality", 4));
  if (length === 8) {
    return p4 + randomPick(getPool("nature", 2)) + randomPick(getPool("creature", 2));
  }
  return p4 + randomPick(getPool("nature", 4)) + randomPick(getPool("creature", 4));
}

// ─── 영어: 단일 단어 ──────────────────────────────────────────────────────

export interface EnglishResult {
  name: string;
  meaning: string;
  pronunciation: string;
}

export function generateEnglishName(): EnglishResult {
  const picked = randomPick(enWords);
  return {
    name: picked.word,
    meaning: picked.meaning,
    pronunciation: picked.pronunciation,
  };
}
