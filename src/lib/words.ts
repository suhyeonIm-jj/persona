// ─── 한글 단어 풀 (글자수 기반 템플릿용) ──────────────────────────────────

export type WordCategory = "personality" | "color" | "nature" | "creature";

export const words: Record<WordCategory, Record<number, string[]>> = {
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
  color: {
    2: ["하얀", "붉은", "푸른", "검은", "노란", "분홍", "연한", "짙은"],
  },
  nature: {
    2: ["달빛", "별빛", "봄날", "숲속", "새벽", "노을", "꽃길", "바람"],
    3: ["봄날의", "달빛의", "별빛의", "숲속의", "강가의", "꽃밭의", "들판의", "새벽의"],
    4: ["달빛아래", "별빛속의", "봄날아침", "숲속깊이", "꽃밭속의", "노을지는", "새벽이슬", "강가에서"],
  },
  creature: {
    2: ["여우", "토끼", "나비", "늑대", "사슴", "고래", "수달", "펭귄"],
    3: ["고양이", "다람쥐", "올빼미", "반딧불", "호박벌", "너구리"],
    4: ["반딧불이", "고슴도치"],
  },
};

// ─── 영어 단어 풀 (단일 단어 + 발음 + 의미) ────────────────────────────────

export interface EnWord {
  word: string;
  meaning: string;
  pronunciation: string;
}

export const enWords: EnWord[] = [
  // 별자리 · 천체
  { word: "Nova",     meaning: "폭발하듯 빛나는 별",        pronunciation: "노바" },
  { word: "Luna",     meaning: "달",                        pronunciation: "루나" },
  { word: "Orion",    meaning: "오리온자리",                 pronunciation: "오리온" },
  { word: "Vega",     meaning: "밤하늘의 밝은 별",           pronunciation: "베가" },
  { word: "Lyra",     meaning: "거문고자리",                 pronunciation: "리라" },
  { word: "Sirius",   meaning: "가장 밝은 별",               pronunciation: "시리우스" },
  { word: "Altair",   meaning: "독수리자리의 별",             pronunciation: "알타이르" },
  { word: "Comet",    meaning: "혜성",                       pronunciation: "코멧" },
  { word: "Atlas",    meaning: "세상을 지탱하는 존재",        pronunciation: "아틀라스" },
  { word: "Pulsar",   meaning: "빠르게 회전하는 별",          pronunciation: "펄서" },
  { word: "Vesper",   meaning: "저녁별",                     pronunciation: "베스퍼" },
  { word: "Celeste",  meaning: "하늘의",                     pronunciation: "셀레스트" },
  { word: "Cosmos",   meaning: "우주",                       pronunciation: "코스모스" },
  { word: "Lux",      meaning: "빛",                         pronunciation: "럭스" },
  { word: "Aurora",   meaning: "새벽빛, 오로라",             pronunciation: "오로라" },
  { word: "Elara",    meaning: "목성의 달",                  pronunciation: "엘라라" },
  { word: "Selene",   meaning: "달의 여신",                  pronunciation: "셀레네" },
  { word: "Theia",    meaning: "빛을 낳은 여신",             pronunciation: "테이아" },
  { word: "Aether",   meaning: "하늘의 순수한 공기",          pronunciation: "에테르" },
  { word: "Caelum",   meaning: "하늘",                       pronunciation: "케일럼" },
  { word: "Soleil",   meaning: "태양",                       pronunciation: "솔레이" },
  { word: "Elio",     meaning: "태양의 빛",                  pronunciation: "엘리오" },

  // 자연 · 원소
  { word: "Ember",    meaning: "잔불",                       pronunciation: "엠버" },
  { word: "Frost",    meaning: "서리",                       pronunciation: "프로스트" },
  { word: "Blaze",    meaning: "활활 타오르는 불꽃",          pronunciation: "블레이즈" },
  { word: "Storm",    meaning: "폭풍",                       pronunciation: "스톰" },
  { word: "Gale",     meaning: "강풍",                       pronunciation: "게일" },
  { word: "Tide",     meaning: "조류, 파도",                  pronunciation: "타이드" },
  { word: "Ash",      meaning: "재",                         pronunciation: "애쉬" },
  { word: "River",    meaning: "강",                         pronunciation: "리버" },
  { word: "Vale",     meaning: "아늑한 계곡",                 pronunciation: "베일" },
  { word: "Ridge",    meaning: "산등성이",                    pronunciation: "릿지" },
  { word: "Crest",    meaning: "정상",                       pronunciation: "크레스트" },
  { word: "Bolt",     meaning: "번개",                       pronunciation: "볼트" },
  { word: "Spark",    meaning: "불꽃, 섬광",                  pronunciation: "스파크" },
  { word: "Breeze",   meaning: "산들바람",                    pronunciation: "브리즈" },
  { word: "Dusk",     meaning: "황혼",                       pronunciation: "더스크" },
  { word: "Shore",    meaning: "해변",                       pronunciation: "쇼어" },
  { word: "Cinder",   meaning: "잔불 속 잿더미",              pronunciation: "신더" },
  { word: "Amber",    meaning: "호박빛",                      pronunciation: "앰버" },
  { word: "Crimson",  meaning: "진홍색",                      pronunciation: "크림슨" },
  { word: "Indigo",   meaning: "남색",                       pronunciation: "인디고" },
  { word: "Azure",    meaning: "하늘빛",                      pronunciation: "아주르" },
  { word: "Zephyr",   meaning: "부드러운 서풍",               pronunciation: "제피르" },
  { word: "Lark",     meaning: "새벽을 여는 종달새",           pronunciation: "라크" },
  { word: "Glen",     meaning: "아늑한 산골짜기",              pronunciation: "글렌" },
  { word: "Cove",     meaning: "조용한 작은 만",              pronunciation: "코브" },
  { word: "Dawn",     meaning: "여명, 새로운 시작",            pronunciation: "던" },

  // 식물 · 생명
  { word: "Sage",     meaning: "현자, 지혜로운 자",           pronunciation: "세이지" },
  { word: "Ivy",      meaning: "담쟁이덩굴",                  pronunciation: "아이비" },
  { word: "Wren",     meaning: "작고 강인한 굴뚝새",           pronunciation: "렌" },
  { word: "Flora",    meaning: "꽃의 여신",                   pronunciation: "플로라" },
  { word: "Iris",     meaning: "무지개의 여신",               pronunciation: "아이리스" },
  { word: "Fern",     meaning: "고사리, 자연의 생명력",        pronunciation: "펀" },
  { word: "Rowan",    meaning: "붉은 열매의 마가목",           pronunciation: "로완" },
  { word: "Hazel",    meaning: "개암나무, 따뜻한 갈색",        pronunciation: "헤이즐" },
  { word: "Briar",    meaning: "들장미",                      pronunciation: "브라이어" },
  { word: "Clover",   meaning: "행운의 네잎클로버",            pronunciation: "클로버" },

  // 판타지 · 신화
  { word: "Phoenix",  meaning: "불사조",                      pronunciation: "피닉스" },
  { word: "Raven",    meaning: "까마귀",                      pronunciation: "레이븐" },
  { word: "Shadow",   meaning: "그림자",                      pronunciation: "쉐도우" },
  { word: "Phantom",  meaning: "환영",                        pronunciation: "팬텀" },
  { word: "Ghost",    meaning: "유령",                        pronunciation: "고스트" },
  { word: "Falcon",   meaning: "매",                          pronunciation: "팰컨" },
  { word: "Lynx",     meaning: "스라소니",                    pronunciation: "링크스" },
  { word: "Drake",    meaning: "용",                          pronunciation: "드레이크" },
  { word: "Titan",    meaning: "압도적인 힘의 존재",           pronunciation: "타이탄" },
  { word: "Echo",     meaning: "메아리",                      pronunciation: "에코" },
  { word: "Mira",     meaning: "경이로운",                    pronunciation: "미라" },
  { word: "Seraph",   meaning: "빛을 가진 천사",              pronunciation: "세라프" },
  { word: "Nyx",      meaning: "밤의 여신",                   pronunciation: "닉스" },
  { word: "Dorian",   meaning: "아름다운, 영원한",             pronunciation: "도리안" },
  { word: "Zion",     meaning: "평화로운 땅",                 pronunciation: "자이온" },
  { word: "Caspian",  meaning: "바다처럼 넓은",               pronunciation: "캐스피안" },
  { word: "Elysia",   meaning: "낙원, 이상향",                pronunciation: "엘리시아" },

  // 감성 실제 이름
  { word: "Aria",     meaning: "서정적인 선율",              pronunciation: "아리아" },
  { word: "Vera",     meaning: "진실, 믿음",                pronunciation: "베라" },
  { word: "Nora",     meaning: "빛, 명예",                  pronunciation: "노라" },
  { word: "Eden",     meaning: "낙원",                      pronunciation: "에덴" },
  { word: "Faye",     meaning: "요정, 믿음",                pronunciation: "페이" },
  { word: "Blythe",   meaning: "기쁨, 명랑한",              pronunciation: "블라이스" },
  { word: "Seren",    meaning: "별, 고요한",                pronunciation: "세렌" },
  { word: "Cora",     meaning: "소녀, 순수함",              pronunciation: "코라" },
  { word: "Zara",     meaning: "빛나는, 꽃",               pronunciation: "자라" },
  { word: "Rory",     meaning: "붉은 왕, 명성",            pronunciation: "로리" },
  { word: "Asher",    meaning: "행복한, 축복받은",          pronunciation: "애셔" },
  { word: "Soren",    meaning: "위엄 있는",                pronunciation: "소렌" },
  { word: "Arlo",     meaning: "언덕 위의 요새",           pronunciation: "알로" },
  { word: "Cael",     meaning: "하늘",                     pronunciation: "케일" },

  // 보석 · 색감
  { word: "Onyx",     meaning: "검은 보석",                   pronunciation: "오닉스" },
  { word: "Jade",     meaning: "비취",                        pronunciation: "제이드" },
  { word: "Opal",     meaning: "오팔",                        pronunciation: "오팔" },
  { word: "Cobalt",   meaning: "짙은 파란빛",                 pronunciation: "코발트" },
  { word: "Flare",    meaning: "강렬한 섬광",                 pronunciation: "플레어" },
  { word: "Nimbus",   meaning: "빛의 후광",                   pronunciation: "님버스" },
  { word: "Sable",    meaning: "흑담비, 우아한 어둠",          pronunciation: "세이블" },
  { word: "Garnet",   meaning: "진한 붉은 보석",              pronunciation: "가넷" },
  { word: "Pearl",    meaning: "진주, 순수함",                pronunciation: "펄" },

  // 모던 · 테크
  { word: "Neo",      meaning: "새로운",                      pronunciation: "네오" },
  { word: "Cipher",   meaning: "비밀 암호",                   pronunciation: "사이퍼" },
  { word: "Neon",     meaning: "네온빛",                      pronunciation: "네온" },
  { word: "Pixel",    meaning: "빛의 최소 단위",              pronunciation: "픽셀" },
  { word: "Flux",     meaning: "끊임없는 변화",               pronunciation: "플럭스" },
  { word: "Sterling", meaning: "순수한, 진짜의",              pronunciation: "스털링" },
  { word: "Sylvan",   meaning: "숲의",                        pronunciation: "실번" },
  { word: "Axiom",    meaning: "변하지 않는 진리",             pronunciation: "액시엄" },

  // 덕목 · 감성 분위기
  { word: "Halo",     meaning: "빛의 후광",                   pronunciation: "헤일로" },
  { word: "Aura",     meaning: "독특한 기운",                 pronunciation: "오라" },
  { word: "Drift",    meaning: "바람에 흘러가다",              pronunciation: "드리프트" },
  { word: "Bliss",    meaning: "순수한 기쁨",                 pronunciation: "블리스" },
  { word: "Zenith",   meaning: "정점, 최고조",                pronunciation: "제니스" },
  { word: "Ace",      meaning: "최고",                        pronunciation: "에이스" },
  { word: "Lyric",    meaning: "서정적인 선율",               pronunciation: "리릭" },
  { word: "Haven",    meaning: "안식처",                      pronunciation: "헤이븐" },
  { word: "Valor",    meaning: "용맹, 용기",                  pronunciation: "밸러" },
  { word: "Hope",     meaning: "희망",                        pronunciation: "호프" },
  { word: "Grace",    meaning: "우아함, 은총",                pronunciation: "그레이스" },
  { word: "Solace",   meaning: "위안, 안도",                  pronunciation: "솔라스" },
  { word: "Reverie",  meaning: "달콤한 몽상",                 pronunciation: "레버리" },
  { word: "Serene",   meaning: "고요하고 평화로운",            pronunciation: "서린" },
  { word: "Lumen",    meaning: "빛의 밝기",                   pronunciation: "루멘" },
];
