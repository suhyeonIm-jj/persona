import fs from "fs";
import path from "path";
import { SavedProfile } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "saved-profiles.json");

function ensureFile(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function read(): SavedProfile[] {
  ensureFile();
  try {
    const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Partial<SavedProfile>[];
    return raw.map((p) => ({ lang: "ko", ...p } as SavedProfile));
  } catch {
    return [];
  }
}

function write(profiles: SavedProfile[]): void {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(profiles, null, 2), "utf-8");
}

export function getProfiles(): SavedProfile[] {
  return read();
}

export function saveProfile(
  name: string,
  lang: "ko" | "en",
  length?: 8 | 12,
  meaning?: string,
): SavedProfile {
  const profiles = read();
  const profile: SavedProfile = {
    id: crypto.randomUUID(),
    name,
    lang,
    ...(length !== undefined ? { length } : {}),
    ...(meaning ? { meaning } : {}),
    savedAt: new Date().toISOString(),
  };
  profiles.push(profile);
  write(profiles);
  return profile;
}

export function deleteProfile(id: string): void {
  write(read().filter((p) => p.id !== id));
}
