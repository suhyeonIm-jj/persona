"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { loadProfiles, saveProfile, deleteProfile } from "@/lib/storage";
import { SavedProfile, Palette, Shape } from "@/types";
import { generateProfileName, generateEnglishName } from "@/lib/generator";

const DEFAULT_PALETTE: Palette = 'mono';
const DEFAULT_SHAPE: Shape = 'mixed';

// ─── Icons ────────────────────────────────────────────────────────────────────

function RefreshIcon({ size = 22, spinning = false }: { size?: number; spinning?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', animation: spinning ? 'spin 0.5s linear infinite' : 'none' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 12a9 9 0 0 1 15.5-6.3M21 4v5h-5M21 12a9 9 0 0 1-15.5 6.3M3 20v-5h5"
          stroke="#0F0F0F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function HeartIcon({ filled = false, size = 22, color = '#0F0F0F' }: { filled?: boolean; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <path d="M12 21s-7.5-4.6-7.5-11A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7.5 4c0 6.4-7.5 11-7.5 11Z"
        stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon({ size = 20, color = '#0F0F0F' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke={color} strokeWidth="2.4" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ size = 22, color = '#0F0F0F' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon({ size = 18, color = '#0F0F0F' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon({ size = 14, color = '#0F0F0F' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7z" />
    </svg>
  );
}

function CloseIcon({ size = 18, color = '#0F0F0F' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 5l14 14M19 5L5 19" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// ─── Action Button ────────────────────────────────────────────────────────────

function ActionButton({ children, onClick, color = '#FAF6EE' }: {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const press = () => { if (ref.current) { ref.current.style.transform = 'translate(2px,2px)'; ref.current.style.boxShadow = '1px 1px 0 #0F0F0F'; } };
  const release = () => { if (ref.current) { ref.current.style.transform = 'translate(0,0)'; ref.current.style.boxShadow = '3px 3px 0 #0F0F0F'; } };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseDown={press} onMouseUp={release} onMouseLeave={release}
      onTouchStart={press} onTouchEnd={release}
      style={{
        flex: 1, height: 56,
        background: color,
        border: '2.5px solid #0F0F0F',
        borderRadius: 16,
        boxShadow: '3px 3px 0 #0F0F0F',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        cursor: 'pointer',
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontWeight: 700, color: '#0F0F0F', letterSpacing: '-0.01em',
        transition: 'transform 90ms ease, box-shadow 90ms ease, background 200ms ease',
      }}
    >
      {children}
    </button>
  );
}

// ─── Pill Switcher (공용) ─────────────────────────────────────────────────────

function PillSwitcher<T extends string | number>({ options, value, onChange, label }: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: (v: T) => string;
}) {
  return (
    <div style={{ display: 'inline-flex', padding: 4, background: '#0F0F0F', borderRadius: 999 }}>
      {options.map((opt) => (
        <button
          key={String(opt)}
          onClick={() => onChange(opt)}
          style={{
            border: 'none', outline: 'none',
            background: value === opt ? '#FAF6EE' : 'transparent',
            color: value === opt ? '#0F0F0F' : '#FAF6EE',
            padding: '9px 0',
            minWidth: 96,
            textAlign: 'center',
            borderRadius: 999,
            fontFamily: 'Pretendard, system-ui, sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            transition: 'all 180ms ease',
          }}
        >
          {label(opt)}
        </button>
      ))}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div style={{
      position: 'fixed', left: '50%', bottom: 92,
      transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
      opacity: visible ? 1 : 0,
      transition: 'opacity 240ms ease, transform 240ms ease',
      background: '#0F0F0F', color: '#FAF6EE',
      padding: '10px 18px', borderRadius: 999,
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontWeight: 600, letterSpacing: '-0.01em',
      zIndex: 90, pointerEvents: 'none', whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  );
}

// ─── Utils ────────────────────────────────────────────────────────────────────

function fmtTime(ms: number): string {
  const diff = Date.now() - ms;
  if (diff < 60_000) return '방금';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}분 전`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}시간 전`;
  return `${Math.floor(diff / 86_400_000)}일 전`;
}

// ─── Saved Sheet ──────────────────────────────────────────────────────────────

function SavedSheet({ open, onClose, items, onDelete }: {
  open: boolean;
  onClose: () => void;
  items: SavedProfile[];
  onDelete: (id: string) => void;
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (item: SavedProfile) => {
    try { await navigator.clipboard.writeText(item.name); } catch {}
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1100);
  };

  return (
    <>
      {/* Backdrop: full screen */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15,15,15,0.32)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 240ms ease', zIndex: 70,
      }} />

      {/* Sheet: constrained to content width */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        width: '100%',
        maxWidth: 430,
        maxHeight: '78%',
        background: '#FAF6EE',
        borderTop: '2.5px solid #0F0F0F',
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        transform: open
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(105%)',
        transition: 'transform 320ms cubic-bezier(.22,1,.36,1)',
        zIndex: 80,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.12)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 44, height: 5, borderRadius: 3, background: '#0F0F0F', opacity: 0.4 }} />
        </div>

        {/* Header */}
        <div style={{ padding: '8px 22px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h2 style={{ margin: 0, fontFamily: 'Pretendard, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', color: '#0F0F0F' }}>
              저장한 이름
            </h2>
            <span style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 12, color: '#0F0F0F', opacity: 0.55 }}>
              {items.length}
            </span>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: '#0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <CloseIcon color="#FAF6EE" />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 60px' }}>
          {items.length === 0 ? (
            <div style={{ padding: '40px 16px', textAlign: 'center', fontFamily: 'Pretendard, system-ui, sans-serif', color: '#0F0F0F', opacity: 0.5, lineHeight: 1.6 }}>
              아직 저장한 이름이 없어요.<br />
              마음에 드는 이름을 ♥ 버튼으로 저장해보세요.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((item) => {
                const isCopied = copiedId === item.id;
                return (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff', border: '2px solid #0F0F0F', borderRadius: 16, boxShadow: '3px 3px 0 #0F0F0F' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: item.lang === 'en' ? '"Archivo Black", system-ui' : 'Pretendard, system-ui, sans-serif', fontWeight: item.lang === 'en' ? 400 : 800, letterSpacing: '-0.02em', color: '#0F0F0F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 10, letterSpacing: '0.1em', color: '#0F0F0F', opacity: 0.5, textTransform: 'uppercase', marginTop: 2 }}>
                        {item.lang === 'ko' ? `KO · ${item.length ?? ''}자` : 'EN'} · {fmtTime(item.savedAt)}
                      </div>
                      {item.meaning && (
                        <div style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 10, letterSpacing: '0.06em', color: '#0F0F0F', opacity: 0.4, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.meaning}
                        </div>
                      )}
                    </div>
                    <button onClick={() => handleCopy(item)} style={{ width: 36, height: 36, borderRadius: 10, background: isCopied ? '#C9F23D' : '#FAF6EE', border: '1.5px solid #0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms ease', flexShrink: 0 }}>
                      {isCopied ? <CheckIcon size={18} /> : <CopyIcon size={16} />}
                    </button>
                    <button onClick={() => onDelete(item.id)} style={{ width: 36, height: 36, borderRadius: 10, background: '#FAF6EE', border: '1.5px solid #0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                      <TrashIcon size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GeneratorPage() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [koLength, setKoLength] = useState<8 | 12>(8);
  const [name, setName] = useState('');
  const [meaning, setMeaning] = useState<string | undefined>(undefined);
  const [rolling, setRolling] = useState(false);
  const [saved, setSaved] = useState<SavedProfile[]>([]);
  const [copied, setCopied] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const rollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSaved(loadProfiles());
  }, []);

  useEffect(() => {
    setName('');
    setMeaning(undefined);
    setCopied(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (lang !== 'ko' || !name) return;
    setName(generateProfileName(koLength));
    setMeaning(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [koLength]);

  useEffect(() => () => { if (rollRef.current) clearTimeout(rollRef.current); }, []);

  const isSaved = saved.some(s => s.name === name && s.lang === lang);

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 1500);
  }, []);

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setCopied(false);
    setMeaning(undefined);
    const start = Date.now();
    const duration = 720;

    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed < duration) {
        setName(lang === 'ko' ? generateProfileName(koLength) : generateEnglishName().name);
        const remaining = duration - elapsed;
        rollRef.current = setTimeout(tick, Math.max(60, Math.min(160, 200 - remaining / 5)));
      } else {
        if (lang === 'ko') {
          setName(generateProfileName(koLength));
          setMeaning(undefined);
        } else {
          const result = generateEnglishName();
          setName(result.name);
          setMeaning(`${result.pronunciation} · ${result.meaning}`);
        }
        setRolling(false);
      }
    };
    tick();
  }, [lang, koLength, rolling]);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(name); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const handleSave = () => {
    if (isSaved) {
      const item = saved.find(s => s.name === name && s.lang === lang);
      if (item) {
        deleteProfile(item.id);
        setSaved(prev => prev.filter(s => s.id !== item.id));
        showToast('저장 취소');
      }
    } else {
      const profile = saveProfile(name, lang, DEFAULT_PALETTE, DEFAULT_SHAPE, meaning, lang === 'ko' ? koLength : undefined);
      setSaved(prev => [profile, ...prev]);
      showToast('이름을 저장했어요 ♥');
    }
  };

  const handleDelete = (id: string) => {
    deleteProfile(id);
    setSaved(prev => prev.filter(s => s.id !== id));
  };

  const isEn = lang === 'en';

  return (
    <div style={{ minHeight: '100dvh', background: '#FAF6EE', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(15,15,15,0.08) 1.2px, transparent 1.2px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />

      {/* 콘텐츠: 모바일 폭으로 제한, 가운데 정렬 */}
      <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, padding: '48px 22px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#FF3D8E', border: '2px solid #0F0F0F', display: 'grid', placeItems: 'center' }}>
              <SparkleIcon size={14} color="#0F0F0F" />
            </div>
            <span style={{ fontFamily: 'Pretendard, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', color: '#0F0F0F' }}>
              닉네임 만들기
            </span>
          </div>
          <button
            onClick={() => setSheetOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 8px 10px', background: '#fff', border: '2px solid #0F0F0F', borderRadius: 999, boxShadow: '2px 2px 0 #0F0F0F', cursor: 'pointer', fontFamily: 'Pretendard, system-ui, sans-serif', fontWeight: 700, color: '#0F0F0F', letterSpacing: '-0.01em' }}
          >
            <HeartIcon size={14} filled />
            저장 {saved.length}
          </button>
        </div>

        {/* 중앙 정렬 콘텐츠 영역 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>

          {/* 탭 + 글자수 선택 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <PillSwitcher
              options={['ko', 'en'] as const}
              value={lang}
              onChange={setLang}
              label={(v) => v === 'ko' ? '한글' : 'English'}
            />
            {lang === 'ko' && (
              <PillSwitcher
                options={[8, 12] as const}
                value={koLength}
                onChange={setKoLength}
                label={(v) => `${v}자`}
              />
            )}
          </div>

          {/* Name card */}
          {name && (
            <div style={{ width: '100%', background: '#FAF6EE', border: '2.5px solid #0F0F0F', borderRadius: 28, boxShadow: '6px 6px 0 #0F0F0F', padding: '28px 22px 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 11, letterSpacing: '0.16em', color: '#0F0F0F', opacity: 0.55, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                <SparkleIcon size={11} />
                {rolling ? 'GENERATING…' : 'YOUR NAME'}
              </div>
              <div style={{
                minHeight: 48,
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: isEn ? '"Archivo Black", system-ui' : 'Pretendard, system-ui, sans-serif',
                fontWeight: isEn ? 400 : 800,
                letterSpacing: isEn ? '-0.02em' : '-0.04em',
                color: '#0F0F0F',
                textAlign: 'center',
                lineHeight: 1.2,
                padding: '0 4px',
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
                transition: rolling ? 'none' : 'transform 200ms cubic-bezier(.2,1.4,.4,1)',
                transform: rolling ? 'scale(0.98)' : 'scale(1)',
              }}>
                {name}
              </div>
              {meaning && !rolling && (
                <div style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 12, letterSpacing: '0.08em', color: '#0F0F0F', opacity: 0.5, textAlign: 'center' }}>
                  {meaning}
                </div>
              )}
            </div>
          )}

          {/* Action row: 이름이 있을 때만 표시 */}
          {name && (
            <div style={{ display: 'flex', gap: 10, width: '100%' }}>
              <ActionButton onClick={handleSave} color={isSaved ? '#FF3D8E' : '#FAF6EE'}>
                <HeartIcon filled={isSaved} color={isSaved ? '#FAF6EE' : '#0F0F0F'} />
                <span style={{ color: isSaved ? '#FAF6EE' : '#0F0F0F' }}>{isSaved ? '저장됨' : '저장'}</span>
              </ActionButton>
              <ActionButton onClick={handleCopy} color={copied ? '#C9F23D' : '#FAF6EE'}>
                {copied
                  ? <><CheckIcon size={20} /><span>복사됨</span></>
                  : <><CopyIcon size={18} /><span>복사</span></>
                }
              </ActionButton>
            </div>
          )}

          {/* Generate button */}
          <div style={{ width: '100%' }}>
            <button
              onClick={roll}
              disabled={rolling}
              style={{ width: '100%', padding: '18px 22px', background: rolling ? '#FFD93D' : '#C9F23D', color: '#0F0F0F', border: '2.5px solid #0F0F0F', borderRadius: 18, boxShadow: rolling ? '2px 2px 0 #0F0F0F' : '5px 5px 0 #0F0F0F', transform: rolling ? 'translate(3px,3px)' : 'translate(0,0)', transition: 'transform 90ms ease, box-shadow 90ms ease, background 200ms ease', fontFamily: 'Pretendard, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: rolling ? 'default' : 'pointer' }}
            >
              <RefreshIcon size={22} spinning={rolling} />
              {name ? '새로 만들기' : '생성하기'}
            </button>
          </div>

        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
      <SavedSheet open={sheetOpen} onClose={() => setSheetOpen(false)} items={saved} onDelete={handleDelete} />
    </div>
  );
}
