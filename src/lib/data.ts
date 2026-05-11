import fs from "fs";
import path from "path";
import { SavedProfile, Palette, Shape } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "saved-profiles.json");

function ensureFile(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function read(): SavedProfile[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as SavedProfile[];
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
  palette: Palette = "mono",
  shape: Shape = "mixed",
  meaning?: string,
  length?: 8 | 12,
): SavedProfile {
  const profile: SavedProfile = {
    id: crypto.randomUUID(),
    name, lang, palette, shape,
    savedAt: Date.now(),
    ...(meaning ? { meaning } : {}),
    ...(length !== undefined ? { length } : {}),
  };
  write([profile, ...read()]);
  return profile;
}

export function deleteProfile(id: string): void {
  write(read().filter((p) => p.id !== id));
}
