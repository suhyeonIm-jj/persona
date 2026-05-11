export type Palette = 'vivid' | 'pastel' | 'mono';
export type Shape = 'mixed' | 'blob' | 'geo' | 'dot' | 'arc';

export interface SavedProfile {
  id: string;
  name: string;
  lang: 'ko' | 'en';
  palette: Palette;
  shape: Shape;
  savedAt: number;
  meaning?: string;   // 영어: "발음 · 의미"
  length?: 8 | 12;   // 한글: 글자수
}
