import { SavedProfile } from "@/types";

const KEY = "persona-profiles";

export function loadProfiles(): SavedProfile[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveProfile(
  name: string,
  lang: "ko" | "en",
  length?: 8 | 12,
  meaning?: string
): SavedProfile {
  const profile: SavedProfile = {
    id: crypto.randomUUID(),
    name,
    lang,
    ...(length !== undefined ? { length } : {}),
    ...(meaning ? { meaning } : {}),
    savedAt: new Date().toISOString(),
  };
  const profiles = loadProfiles();
  profiles.push(profile);
  localStorage.setItem(KEY, JSON.stringify(profiles));
  return profile;
}

export function deleteProfile(id: string): void {
  const profiles = loadProfiles().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(profiles));
}
