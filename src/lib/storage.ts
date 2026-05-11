import { SavedProfile, Palette, Shape } from "@/types";

const KEY = "persona-profiles";

export function loadProfiles(): SavedProfile[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Record<string, unknown>[];
    return raw.map((p) => ({
      id: (p.id as string) ?? crypto.randomUUID(),
      name: (p.name as string) ?? '',
      lang: (p.lang as 'ko' | 'en') ?? 'ko',
      palette: (p.palette as Palette) ?? 'mono',
      shape: (p.shape as Shape) ?? 'mixed',
      savedAt: typeof p.savedAt === 'number'
        ? p.savedAt
        : new Date(p.savedAt as string).getTime() || Date.now(),
      ...(p.meaning ? { meaning: p.meaning as string } : {}),
      ...(p.length ? { length: p.length as 8 | 12 } : {}),
    }));
  } catch {
    return [];
  }
}

export function saveProfile(
  name: string,
  lang: 'ko' | 'en',
  palette: Palette = 'mono',
  shape: Shape = 'mixed',
  meaning?: string,
  length?: 8 | 12,
): SavedProfile {
  const profile: SavedProfile = {
    id: crypto.randomUUID(),
    name,
    lang,
    palette,
    shape,
    savedAt: Date.now(),
    ...(meaning ? { meaning } : {}),
    ...(length !== undefined ? { length } : {}),
  };
  localStorage.setItem(KEY, JSON.stringify([profile, ...loadProfiles()]));
  return profile;
}

export function deleteProfile(id: string): void {
  localStorage.setItem(KEY, JSON.stringify(loadProfiles().filter(p => p.id !== id)));
}
