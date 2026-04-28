"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateProfileName, generateEnglishName } from "@/lib/generator";

type Lang = "ko" | "en";
type Length = 8 | 12;
type Phase = "idle" | "generated" | "saved";

const BG = "linear-gradient(160deg, #D8E2DC 0%, #FFE5D9 50%, #FFCAD4 100%)";

export default function GeneratorPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("ko");
  const [length, setLength] = useState<Length>(8);
  const [name, setName] = useState<string | null>(null);
  const [meaning, setMeaning] = useState<string | undefined>(undefined);
  const [phase, setPhase] = useState<Phase>("idle");
  const [isSaving, setIsSaving] = useState(false);

  function reset() {
    setName(null);
    setMeaning(undefined);
    setPhase("idle");
  }

  function handleLangChange(l: Lang) {
    setLang(l);
    reset();
  }

  function handleLengthChange(l: Length) {
    setLength(l);
    reset();
  }

  function handleGenerate() {
    if (lang === "ko") {
      setName(generateProfileName(length));
      setMeaning(undefined);
    } else {
      const result = generateEnglishName();
      setName(result.name);
      setMeaning(`${result.pronunciation} · ${result.meaning}`);
    }
    setPhase("generated");
  }

  async function handleSave() {
    if (!name) return;
    setIsSaving(true);
    try {
      await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lang,
          ...(lang === "ko" ? { length } : {}),
          ...(meaning ? { meaning } : {}),
        }),
      });
      setPhase("saved");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: BG }}>
      {/* 헤더 */}
      <header className="flex items-center justify-between px-5 pt-4 pb-3">
        <div>
          <p className="text-[#9D8189] text-xs font-semibold tracking-widest uppercase">Profile</p>
          <h1 className="text-[#2D1F25] text-lg font-bold leading-tight">페르소나 생성기</h1>
        </div>
        <button
          onClick={() => router.push("/saved")}
          className="flex items-center gap-1.5 bg-[#F4ACB7]/25 hover:bg-[#F4ACB7]/40 active:bg-[#F4ACB7]/55 text-[#9D8189] text-sm font-medium px-4 py-2 rounded-full transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          저장 목록
        </button>
      </header>

      {/* 메인 */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 gap-6">

        {/* 언어 선택 */}
        <div className="flex flex-col gap-1.5 w-full max-w-sm">
          <p className="text-[#9D8189]/70 text-xs font-medium px-1">언어</p>
          <div className="flex gap-2 rounded-2xl p-1.5" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(157,129,137,0.18)", boxShadow: "0 2px 12px rgba(157,129,137,0.12)" }}>
            {(["ko", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => handleLangChange(l)}
                className={[
                  "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                  lang === l
                    ? "bg-[#9D8189] text-white shadow-md"
                    : "text-[#9D8189]/55 hover:text-[#9D8189]/80",
                ].join(" ")}
              >
                {l === "ko" ? "한글" : "영어"}
              </button>
            ))}
          </div>
        </div>

        {/* 글자수 선택 — 한글 전용 */}
        {lang === "ko" && (
          <div className="flex flex-col gap-1.5 w-full max-w-sm">
            <p className="text-[#9D8189]/70 text-xs font-medium px-1">글자수</p>
            <div className="flex gap-2 rounded-2xl p-1.5" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(157,129,137,0.18)", boxShadow: "0 2px 12px rgba(157,129,137,0.12)" }}>
              {([8, 12] as Length[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLengthChange(l)}
                  className={[
                    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                    length === l
                      ? "bg-[#9D8189] text-white shadow-md"
                      : "text-[#9D8189]/55 hover:text-[#9D8189]/80",
                  ].join(" ")}
                >
                  {l}자
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 프로필명 카드 */}
        <div className="w-full max-w-sm">
          <div
            className="relative rounded-3xl p-8 text-center transition-all duration-300"
            style={{
              minHeight: 148,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: name ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.4)",
              border: "1px solid rgba(244,172,183,0.35)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* 저장 뱃지 */}
            {phase === "saved" && (
              <div
                className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ background: "rgba(216,226,220,0.7)", color: "#3d6048" }}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                저장됨
              </div>
            )}

            {name ? (
              <>
                <p className="text-[#2D1F25] text-2xl font-bold tracking-wide break-keep leading-snug">
                  {name}
                </p>
                {meaning && (
                  <p className="text-[#9D8189] text-sm mt-2.5 italic font-medium">{meaning}</p>
                )}
                <p className="text-[#9D8189]/50 text-xs mt-2">
                  {lang === "ko" ? `${name.length}자` : "EN"}
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(244,172,183,0.2)" }}
                >
                  <svg className="w-5 h-5 text-[#9D8189]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-[#9D8189]/50 text-sm">버튼을 눌러 프로필명을 생성하세요</p>
              </div>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          {phase === "idle" && (
            <button
              onClick={handleGenerate}
              className="w-full bg-[#9D8189] hover:bg-[#8a6e76] active:bg-[#7a5e66] active:scale-[0.98] text-white font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              style={{ boxShadow: "0 4px 20px rgba(157,129,137,0.35)" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              생성하기
            </button>
          )}

          {phase === "generated" && (
            <>
              <button
                onClick={handleGenerate}
                className="w-full active:scale-[0.98] text-[#9D8189] font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                style={{ background: "rgba(255,202,212,0.45)", border: "1px solid rgba(244,172,183,0.3)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                다시 생성
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-[#9D8189] hover:bg-[#8a6e76] active:bg-[#7a5e66] active:scale-[0.98] text-white font-semibold py-4 rounded-2xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ boxShadow: "0 4px 20px rgba(157,129,137,0.35)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {isSaving ? "저장 중..." : "저장하기"}
              </button>
            </>
          )}

          {phase === "saved" && (
            <>
              <button
                onClick={() => router.push("/saved")}
                className="w-full active:scale-[0.98] font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                style={{ background: "rgba(216,226,220,0.65)", color: "#3d6048", border: "1px solid rgba(216,226,220,0.8)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                저장 목록 보기
              </button>
              <button
                onClick={handleGenerate}
                className="w-full active:scale-[0.98] text-[#9D8189] font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                style={{ background: "rgba(255,202,212,0.45)", border: "1px solid rgba(244,172,183,0.3)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                다시 생성
              </button>
            </>
          )}
        </div>
      </main>

      <div className="pb-8" />
    </div>
  );
}
