# 구현 노트

## 디렉토리 구조

```
persona/
├── data/
│   └── saved-profiles.json       # 저장된 프로필명 데이터 (서버 전용)
├── prompts/
│   ├── PRD.md                    # 기획서
│   └── IMPLEMENTATION.md         # 구현 노트 (이 파일)
└── src/
    ├── app/
    │   ├── layout.tsx             # 루트 레이아웃 (viewport 메타)
    │   ├── globals.css            # Tailwind CSS 4 import
    │   ├── page.tsx               # 메인 생성기 페이지 (Client Component)
    │   ├── saved/
    │   │   └── page.tsx           # 저장 목록 페이지 (Client Component)
    │   └── api/
    │       └── profiles/
    │           └── route.ts       # REST API (GET / POST)
    ├── lib/
    │   ├── words.ts               # 한국어 단어 풀 (카테고리별·글자수별)
    │   ├── generator.ts           # 이름 생성 로직 (클라이언트 실행)
    │   └── data.ts                # JSON 파일 I/O (서버 전용)
    └── types/
        └── index.ts               # 공유 타입 정의
```

## 단어 생성 알고리즘

### 단어 풀 구성 (`words.ts`)
카테고리와 글자수를 키로 가지는 이중 맵:
```
words.adj[2]  → 2자 형용사 배열
words.adj[3]  → 3자 형용사 배열
words.adj[4]  → 4자 형용사 배열
words.adj[5]  → 5자 형용사 배열
words.noun[2] → 2자 명사 배열
words.noun[3] → 3자 명사 배열
words.adv[4]  → 4자 부사 배열
words.verb[4] → 4자 동사(활용형) 배열
```

### 템플릿 방식 (`generator.ts`)
1. 선택된 글자수에 해당하는 템플릿 배열을 셔플
2. 각 세그먼트의 단어 풀이 모두 존재하는 첫 번째 템플릿 선택
3. 각 세그먼트에서 이미 사용된 단어를 제외하고 랜덤 선택
4. 세그먼트를 순서대로 concatenate → 프로필명 완성

### 글자수 보장
- 모든 단어는 지정된 글자수와 정확히 일치 (한글 음절 단위)
- 템플릿의 세그먼트 글자수 합계 = 목표 글자수 (설계 불변식)

## API 설계

### `GET /api/profiles`
저장된 전체 프로필명 배열 반환

### `POST /api/profiles`
Body: `{ name: string, length: 8 | 10 | 12 }`
새 프로필명 저장 후 생성된 객체 반환 (status 201)

## 데이터 모델

```typescript
interface SavedProfile {
  id: string;       // crypto.randomUUID()
  name: string;     // 생성된 프로필명
  length: 8 | 10 | 12;
  savedAt: string;  // ISO 8601
}
```

## 정렬 로직 (saved 페이지)
```typescript
data.sort((a, b) => {
  if (b.length !== a.length) return b.length - a.length; // 글자수 내림차순
  return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(); // 최신순
});
```
