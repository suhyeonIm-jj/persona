"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SavedProfile } from "@/types";
import { loadProfiles, deleteProfile } from "@/lib/storage";

const BG = "linear-gradient(160deg, #D8E2DC 0%, #FFE5D9 50%, #FFCAD4 100%)";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function groupLabel(profile: SavedProfile): string {
  if (profile.lang === "en") return "영어";
  return `${profile.length}자`;
}

function sortProfiles(data: SavedProfile[]): SavedProfile[] {
  return [...data].sort((a, b) => {
    const aIsEn = a.lang === "en";
    const bIsEn = b.lang === "en";
    if (aIsEn !== bIsEn) return aIsEn ? 1 : -1;
    if (!aIsEn && !bIsEn && a.length !== b.length) {
      return (b.length ?? 0) - (a.length ?? 0);
    }
    return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
  });
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
    </svg>
  );
}

export default function SavedPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setProfiles(sortProfiles(loadProfiles()));
    setIsLoading(false);
  }, []);

  async function handleCopy(id: string, name: string) {
    await navigator.clipboard.writeText(name);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handleDelete(id: string) {
    setDeletingIds((prev) => new Set([...prev, id]));
    deleteProfile(id);
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    setDeletingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: BG }}>
      {/* 헤더 */}
      <header className="flex items-center gap-3 px-5 pt-4 pb-4">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
          style={{ background: "rgba(244,172,183,0.25)", color: "#9D8189" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(244,172,183,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(244,172,183,0.25)")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <p className="text-[#9D8189] text-xs font-semibold tracking-widest uppercase">Saved</p>
          <h1 className="text-[#2D1F25] text-lg font-bold leading-tight">저장된 프로필명</h1>
        </div>
      </header>

      {/* 목록 */}
      <main className="flex-1 px-5 pb-10">
        {isLoading ? (
          <div className="flex items-center justify-center h-52">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#9D8189", borderTopColor: "transparent" }} />
              <p className="text-[#9D8189]/60 text-sm">불러오는 중...</p>
            </div>
          </div>
        ) : profiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-52 gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(244,172,183,0.2)" }}
            >
              <svg className="w-7 h-7 text-[#9D8189]/35" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <p className="text-[#9D8189]/60 text-sm">저장된 프로필명이 없습니다</p>
            <button
              onClick={() => router.push("/")}
              className="text-[#9D8189] text-sm font-semibold hover:text-[#7a5e66] transition-colors"
            >
              프로필명 생성하러 가기 →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <p className="text-[#9D8189]/55 text-xs font-medium px-1">총 {profiles.length}개 저장됨</p>

            {profiles.map((profile, idx) => {
              const prev = profiles[idx - 1];
              const showDivider = idx === 0 || groupLabel(profile) !== groupLabel(prev);

              return (
                <div key={profile.id}>
                  {showDivider && (
                    <div className="flex items-center gap-2 my-1 px-1">
                      <div className="flex-1 h-px" style={{ background: "rgba(157,129,137,0.2)" }} />
                      <span className="text-[#9D8189]/45 text-xs">{groupLabel(profile)}</span>
                      <div className="flex-1 h-px" style={{ background: "rgba(157,129,137,0.2)" }} />
                    </div>
                  )}

                  <div
                    className="flex items-start justify-between gap-3 rounded-2xl px-4 py-3.5 transition-all"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(244,172,183,0.3)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {/* 이름 + 의미 + 시간 */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[#2D1F25] font-semibold text-base break-keep leading-snug">
                        {profile.name}
                      </p>
                      {profile.meaning && (
                        <p className="text-[#9D8189] text-xs mt-0.5 italic">{profile.meaning}</p>
                      )}
                      <p className="text-[#9D8189]/50 text-xs mt-1">{formatDate(profile.savedAt)}</p>
                    </div>

                    {/* 뱃지 + 복사 + 삭제 */}
                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                      {profile.lang === "en" ? (
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: "rgba(216,226,220,0.6)", color: "#3d6048" }}
                        >
                          EN
                        </span>
                      ) : (
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            background: profile.length === 12
                              ? "rgba(244,172,183,0.35)"
                              : "rgba(255,202,212,0.5)",
                            color: "#9D8189",
                          }}
                        >
                          {profile.length}자
                        </span>
                      )}
                      <button
                        onClick={() => handleCopy(profile.id, profile.name)}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
                        style={{
                          background: copiedId === profile.id ? "rgba(216,226,220,0.7)" : "transparent",
                          color: copiedId === profile.id ? "#3d6048" : "rgba(157,129,137,0.4)",
                        }}
                        aria-label="복사"
                      >
                        {copiedId === profile.id ? <CheckIcon /> : <CopyIcon />}
                      </button>
                      <button
                        onClick={() => handleDelete(profile.id)}
                        disabled={deletingIds.has(profile.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-all disabled:opacity-40 text-[#9D8189]/35 hover:text-rose-400 hover:bg-rose-100/60"
                        aria-label="삭제"
                      >
                        {deletingIds.has(profile.id) ? (
                          <div
                            className="w-3.5 h-3.5 border rounded-full animate-spin"
                            style={{ borderColor: "rgba(157,129,137,0.4)", borderTopColor: "transparent" }}
                          />
                        ) : (
                          <TrashIcon />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
