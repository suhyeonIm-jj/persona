export interface SavedProfile {
  id: string;
  name: string;
  length?: 8 | 12;   // 영어는 길이 없음
  lang: "ko" | "en";
  meaning?: string;
  savedAt: string;
}
