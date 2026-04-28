// ─── 한글 단어 풀 ──────────────────────────────────────────────────────────
// 구조: [성격형용사] + [자연배경/색깔] + [동물/캐릭터]
// 이 조합은 항상 "○○한 ○○ 속의 ○○" 처럼 의미가 자연스럽게 연결됨

export type WordCategory = "personality" | "color" | "nature" | "creature";

export const words: Record<WordCategory, Record<number, string[]>> = {
  // 성격·감성 형용사
  personality: {
    3: [
      "수줍은", "엉뚱한", "느긋한", "다정한", "용감한",
      "씩씩한", "명랑한", "순수한", "신중한", "따뜻한",
      "자유로", "포근한", "활발한", "소심한", "의젓한",
    ],
    4: [
      "사랑스런", "아름다운", "반짝이는", "따사로운",
      "보드라운", "향기로운", "눈부시게", "꿈결같은",
      "설레이는", "꿈꾸듯이",
    ],
  },
  // 색깔·외형 형용사 (동물 앞에 바로 붙어 자연스럽게 수식)
  color: {
    2: [
      "하얀", "붉은", "푸른", "검은", "노란",
      "분홍", "연한", "짙은",
    ],
  },
  // 자연 배경·계절·장소 (이야기의 배경이 됨)
  nature: {
    2: [
      "달빛", "별빛", "봄날", "숲속", "새벽",
      "노을", "꽃길", "바람",
    ],
    3: [
      "봄날의", "달빛의", "별빛의", "숲속의",
      "강가의", "꽃밭의", "들판의", "새벽의",
    ],
    4: [
      "달빛아래", "별빛속의", "봄날아침", "숲속깊이",
      "꽃밭속의", "노을지는", "새벽이슬", "강가에서",
    ],
  },
  // 동물·캐릭터 (닉네임의 주인공)
  creature: {
    2: [
      "여우", "토끼", "나비", "늑대", "사슴",
      "고래", "수달", "펭귄",
    ],
    3: [
      "고양이", "다람쥐", "올빼미", "반딧불",
      "호박벌", "너구리",
    ],
    4: [
      "반딧불이", "고슴도치",
    ],
  },
};

// ─── 영어 단어 풀 (단일 단어 닉네임) ──────────────────────────────────────

export interface EnWord {
  word: string;
  meaning: string;
  pronunciation: string;
}

export const enWords: EnWord[] = [
  // 별자리 · 천체
  { word: "Nova",     meaning: "폭발하듯 빛나는 별",   pronunciation: "노바" },
  { word: "Luna",     meaning: "달",                   pronunciation: "루나" },
  { word: "Orion",    meaning: "오리온자리",             pronunciation: "오리온" },
  { word: "Vega",     meaning: "밤하늘의 밝은 별",       pronunciation: "베가" },
  { word: "Lyra",     meaning: "거문고자리",              pronunciation: "리라" },
  { word: "Sirius",   meaning: "가장 밝은 별",           pronunciation: "시리우스" },
  { word: "Altair",   meaning: "독수리자리의 별",         pronunciation: "알타이르" },
  { word: "Comet",    meaning: "혜성",                  pronunciation: "코멧" },
  { word: "Atlas",    meaning: "세상을 지탱하는 존재",    pronunciation: "아틀라스" },
  { word: "Pulsar",   meaning: "빠르게 회전하는 별",     pronunciation: "펄서" },
  { word: "Vesper",   meaning: "저녁별",                 pronunciation: "베스퍼" },
  { word: "Celeste",  meaning: "하늘의",                 pronunciation: "셀레스트" },
  { word: "Cosmos",   meaning: "우주",                   pronunciation: "코스모스" },
  { word: "Lux",      meaning: "빛",                    pronunciation: "럭스" },

  // 자연 · 원소
  { word: "Ember",    meaning: "잔불",                  pronunciation: "엠버" },
  { word: "Frost",    meaning: "서리",                   pronunciation: "프로스트" },
  { word: "Blaze",    meaning: "활활 타오르는 불꽃",      pronunciation: "블레이즈" },
  { word: "Storm",    meaning: "폭풍",                   pronunciation: "스톰" },
  { word: "Gale",     meaning: "강풍",                   pronunciation: "게일" },
  { word: "Tide",     meaning: "조류, 파도",              pronunciation: "타이드" },
  { word: "Ash",      meaning: "재",                    pronunciation: "애쉬" },
  { word: "River",    meaning: "강",                    pronunciation: "리버" },
  { word: "Vale",     meaning: "아늑한 계곡",             pronunciation: "베일" },
  { word: "Ridge",    meaning: "산등성이",                pronunciation: "릿지" },
  { word: "Crest",    meaning: "정상",                   pronunciation: "크레스트" },
  { word: "Bolt",     meaning: "번개",                   pronunciation: "볼트" },
  { word: "Spark",    meaning: "불꽃, 섬광",              pronunciation: "스파크" },
  { word: "Breeze",   meaning: "산들바람",                pronunciation: "브리즈" },
  { word: "Dusk",     meaning: "황혼",                   pronunciation: "더스크" },
  { word: "Shore",    meaning: "해변",                   pronunciation: "쇼어" },
  { word: "Cinder",   meaning: "잔불 속 잿더미",          pronunciation: "신더" },
  { word: "Amber",    meaning: "호박빛",                  pronunciation: "앰버" },
  { word: "Crimson",  meaning: "진홍색",                  pronunciation: "크림슨" },
  { word: "Indigo",   meaning: "남색",                   pronunciation: "인디고" },
  { word: "Azure",    meaning: "하늘빛",                  pronunciation: "아주르" },

  // 식물 · 생명
  { word: "Sage",     meaning: "현자, 지혜로운 자",       pronunciation: "세이지" },
  { word: "Ivy",      meaning: "담쟁이덩굴",              pronunciation: "아이비" },
  { word: "Wren",     meaning: "작고 강인한 굴뚝새",      pronunciation: "렌" },
  { word: "Flora",    meaning: "꽃의 여신",               pronunciation: "플로라" },
  { word: "Iris",     meaning: "무지개의 여신",            pronunciation: "아이리스" },

  // 판타지 · 게임
  { word: "Phoenix",  meaning: "불사조",                  pronunciation: "피닉스" },
  { word: "Raven",    meaning: "까마귀",                  pronunciation: "레이븐" },
  { word: "Shadow",   meaning: "그림자",                  pronunciation: "쉐도우" },
  { word: "Phantom",  meaning: "환영",                   pronunciation: "팬텀" },
  { word: "Ghost",    meaning: "유령",                   pronunciation: "고스트" },
  { word: "Falcon",   meaning: "매",                    pronunciation: "팰컨" },
  { word: "Lynx",     meaning: "스라소니",                pronunciation: "링크스" },
  { word: "Drake",    meaning: "용",                    pronunciation: "드레이크" },
  { word: "Titan",    meaning: "압도적인 힘의 존재",       pronunciation: "타이탄" },
  { word: "Echo",     meaning: "메아리",                  pronunciation: "에코" },
  { word: "Mira",     meaning: "경이로운",                pronunciation: "미라" },

  // 보석 · 색감
  { word: "Onyx",     meaning: "검은 보석",               pronunciation: "오닉스" },
  { word: "Jade",     meaning: "비취",                   pronunciation: "제이드" },
  { word: "Opal",     meaning: "오팔",                   pronunciation: "오팔" },
  { word: "Cobalt",   meaning: "짙은 파란빛",             pronunciation: "코발트" },
  { word: "Flare",    meaning: "강렬한 섬광",              pronunciation: "플레어" },
  { word: "Nimbus",   meaning: "빛의 후광",               pronunciation: "님버스" },

  // 모던 · 테크
  { word: "Neo",      meaning: "새로운",                  pronunciation: "네오" },
  { word: "Cipher",   meaning: "비밀 암호",               pronunciation: "사이퍼" },
  { word: "Neon",     meaning: "네온빛",                  pronunciation: "네온" },
  { word: "Pixel",    meaning: "빛의 최소 단위",           pronunciation: "픽셀" },
  { word: "Flux",     meaning: "끊임없는 변화",            pronunciation: "플럭스" },
  { word: "Arctic",   meaning: "극지의 차가운 힘",         pronunciation: "아틱" },
  { word: "Sterling", meaning: "순수한, 진짜의",           pronunciation: "스털링" },
  { word: "Sylvan",   meaning: "숲의",                   pronunciation: "실번" },

  // 감성 · 분위기
  { word: "Halo",     meaning: "빛의 후광",               pronunciation: "헤일로" },
  { word: "Aura",     meaning: "독특한 기운",              pronunciation: "오라" },
  { word: "Drift",    meaning: "바람에 흘러가다",           pronunciation: "드리프트" },
  { word: "Bliss",    meaning: "순수한 기쁨",              pronunciation: "블리스" },
  { word: "Zenith",   meaning: "정점, 최고조",             pronunciation: "제니스" },
  { word: "Ace",      meaning: "최고",                   pronunciation: "에이스" },
  { word: "Lyric",    meaning: "서정적인 선율",            pronunciation: "리릭" },
  { word: "Haven",    meaning: "안식처",                  pronunciation: "헤이븐" },
];
