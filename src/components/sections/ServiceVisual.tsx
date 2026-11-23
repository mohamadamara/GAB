import type { VisualKind } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * Small, hand-drawn interface illustrations — one per software category.
 * Pure SVG so they stay crisp at any size and cost nothing to render.
 */

const C = {
  ink: "#2c2c30",
  ink2: "#3c3c40",
  line: "#333337",
  soft: "#202023",
  paper: "#18181b",
  mute: "#a6a19a",
  stone: "#77736d",
  cu: "#f08a6c",
  cu2: "#f6b39d",
};

function Window({ children, title = true }: { children: React.ReactNode; title?: boolean }) {
  return (
    <>
      <rect x="8" y="8" width="224" height="144" rx="5" fill={C.paper} />
      {title && (
        <>
          <rect x="8" y="8" width="224" height="16" rx="5" fill={C.soft} />
          <rect x="8" y="18" width="224" height="6" fill={C.soft} />
          <circle cx="18" cy="16" r="2.4" fill={C.cu} />
          <circle cx="26" cy="16" r="2.4" fill={C.mute} />
          <circle cx="34" cy="16" r="2.4" fill={C.mute} />
        </>
      )}
      {children}
    </>
  );
}

const bar = (x: number, y: number, w: number, fill = C.line, h = 4) => (
  <rect key={`${x}-${y}-${w}`} x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
);

const visuals: Record<VisualKind, React.ReactNode> = {
  web: (
    <Window>
      {bar(20, 32, 30, C.ink, 5)}
      {bar(150, 33, 18)}
      {bar(174, 33, 18)}
      {bar(198, 33, 22, C.cu)}
      <rect x="20" y="48" width="200" height="56" rx="3" fill={C.ink} />
      {bar(32, 62, 90, C.paper, 6)}
      {bar(32, 74, 64, C.stone, 4)}
      <rect x="32" y="86" width="34" height="9" rx="2" fill={C.cu} />
      <circle cx="178" cy="76" r="18" fill="none" stroke={C.cu} strokeWidth="1.5" />
      <circle cx="178" cy="76" r="8" fill={C.cu2} />
      {[20, 89, 158].map((x) => (
        <g key={x}>
          <rect x={x} y="112" width="62" height="32" rx="3" fill={C.soft} />
          {bar(x + 8, 121, 30, C.ink2)}
          {bar(x + 8, 130, 44)}
        </g>
      ))}
    </Window>
  ),
  mobile: (
    <>
      <rect x="40" y="10" width="72" height="140" rx="12" fill={C.ink} />
      <rect x="45" y="18" width="62" height="124" rx="7" fill={C.paper} />
      {bar(52, 28, 26, C.ink, 5)}
      <rect x="52" y="40" width="48" height="36" rx="4" fill={C.cu} />
      <circle cx="88" cy="52" r="6" fill={C.cu2} />
      {[84, 98, 112].map((y) => (
        <g key={y}>
          <rect x="52" y={y} width="10" height="10" rx="2" fill={C.soft} />
          {bar(66, y + 2, 30, C.ink2)}
          {bar(66, y + 7, 20)}
        </g>
      ))}
      <rect x="128" y="34" width="72" height="116" rx="12" fill={C.ink2} />
      <rect x="133" y="42" width="62" height="100" rx="7" fill={C.soft} />
      <path d="M140 118 Q160 70 188 92" stroke={C.cu} strokeWidth="2" fill="none" strokeDasharray="3 3" />
      <circle cx="140" cy="118" r="4" fill={C.ink} />
      <circle cx="188" cy="92" r="5" fill={C.cu} />
      {bar(140, 52, 40, C.ink2, 5)}
    </>
  ),
  saas: (
    <Window>
      <rect x="8" y="24" width="46" height="128" fill={C.ink} />
      <rect x="16" y="32" width="30" height="8" rx="2" fill={C.cu} />
      {[48, 58, 68, 78].map((y) => bar(16, y, 26, "#6e6b66"))}
      {bar(64, 34, 60, C.ink, 5)}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={64 + i * 54} y="48" width="48" height="44" rx="3" fill={i === 1 ? C.ink : C.soft} stroke={i === 1 ? C.cu : "none"} />
          {bar(72 + i * 54, 56, 20, i === 1 ? C.cu2 : C.stone)}
          {bar(72 + i * 54, 66, 28, i === 1 ? C.paper : C.ink2, 6)}
          {bar(72 + i * 54, 80, 30, i === 1 ? "#6e6b66" : C.line)}
        </g>
      ))}
      <rect x="64" y="100" width="156" height="44" rx="3" fill={C.soft} />
      <path d="M70 136 L92 126 L114 130 L136 116 L158 120 L180 108 L212 110" stroke={C.cu} strokeWidth="2" fill="none" />
    </Window>
  ),
  crm: (
    <Window>
      {["Lead", "Qualified", "Proposal", "Won"].map((t, i) => (
        <g key={t}>
          {bar(18 + i * 53, 32, 26, i === 3 ? C.cu : C.ink2)}
          {[0, 1, 2].slice(0, 3 - (i === 3 ? 1 : 0)).map((k) => (
            <g key={k}>
              <rect x={16 + i * 53} y={42 + k * 34} width="48" height="28" rx="3" fill={i === 2 && k === 0 ? C.ink : C.soft} />
              <circle cx={25 + i * 53} cy={51 + k * 34} r="4" fill={i === 2 && k === 0 ? C.cu : C.mute} />
              {bar(32 + i * 53, 49 + k * 34, 26, i === 2 && k === 0 ? C.paper : C.ink2)}
              {bar(22 + i * 53, 60 + k * 34, 34, i === 2 && k === 0 ? "#6e6b66" : C.line)}
            </g>
          ))}
        </g>
      ))}
    </Window>
  ),
  erp: (
    <Window>
      {[
        [30, 44, "INV"],
        [120, 44, "PUR"],
        [30, 104, "PRD"],
        [120, 104, "FIN"],
      ].map(([x, y, t]) => (
        <g key={t as string}>
          <rect x={x as number} y={(y as number) - 12} width="90" height="34" rx="3" fill={t === "PRD" ? C.ink : C.soft} />
          <text x={(x as number) + 10} y={(y as number) + 9} fontSize="10" fontFamily="monospace" fill={t === "PRD" ? C.cu2 : C.ink2}>
            {t as string}
          </text>
          {bar((x as number) + 40, (y as number) + 2, 40, t === "PRD" ? "#6e6b66" : C.line)}
          {bar((x as number) + 40, (y as number) + 10, 26, t === "PRD" ? C.cu : C.mute)}
        </g>
      ))}
      <circle cx="120" cy="88" r="14" fill={C.cu} />
      <circle cx="120" cy="88" r="5" fill={C.paper} />
      {[
        [104, 72],
        [136, 72],
        [104, 104],
        [136, 104],
      ].map(([x, y], i) => (
        <line key={i} x1="120" y1="88" x2={x} y2={y} stroke={C.cu} strokeWidth="1.5" />
      ))}
      <rect x="210" y="32" width="10" height="112" rx="2" fill={C.soft} />
      <rect x="210" y="80" width="10" height="64" rx="2" fill={C.cu2} />
    </Window>
  ),
  booking: (
    <Window>
      {bar(20, 32, 50, C.ink, 5)}
      {Array.from({ length: 21 }).map((_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const sel = i === 10;
        const busy = [3, 8, 15, 19].includes(i);
        return (
          <rect
            key={i}
            x={20 + col * 18}
            y={46 + row * 18}
            width="14"
            height="14"
            rx="2"
            fill={sel ? C.cu : busy ? C.line : C.soft}
          />
        );
      })}
      <rect x="150" y="32" width="70" height="112" rx="3" fill={C.ink} />
      {bar(158, 42, 34, C.cu2)}
      {["09:00", "10:30", "12:00", "14:30"].map((t, i) => (
        <g key={t}>
          <rect x="158" y={54 + i * 18} width="54" height="13" rx="2" fill={i === 1 ? C.cu : C.ink2} />
          <text x="164" y={63.5 + i * 18} fontSize="8" fontFamily="monospace" fill={i === 1 ? C.ink : C.mute}>
            {t}
          </text>
        </g>
      ))}
      <rect x="158" y="128" width="54" height="10" rx="2" fill={C.paper} />
      {bar(20, 106, 120)}
      {bar(20, 116, 80)}
      <rect x="20" y="128" width="40" height="12" rx="2" fill={C.ink} />
    </Window>
  ),
  dashboard: (
    <Window>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={18 + i * 70} y="32" width="64" height="30" rx="3" fill={C.soft} />
          {bar(26 + i * 70, 40, 22, C.stone)}
          {bar(26 + i * 70, 50, 36, i === 0 ? C.cu : C.ink2, 6)}
        </g>
      ))}
      <rect x="18" y="70" width="134" height="74" rx="3" fill={C.ink} />
      {[36, 52, 44, 62, 50, 70, 58].map((h, i) => (
        <rect key={i} x={28 + i * 17} y={136 - h} width="10" height={h} rx="1.5" fill={i === 5 ? C.cu : "#6e6b66"} />
      ))}
      <rect x="160" y="70" width="64" height="74" rx="3" fill={C.soft} />
      <circle cx="192" cy="107" r="22" fill="none" stroke={C.line} strokeWidth="8" />
      <circle cx="192" cy="107" r="22" fill="none" stroke={C.cu} strokeWidth="8" strokeDasharray="90 140" transform="rotate(-90 192 107)" />
    </Window>
  ),
  automation: (
    <Window>
      {[
        [24, 44, "Form"],
        [96, 44, "Check"],
        [168, 44, "CRM"],
        [96, 108, "Email"],
        [168, 108, "Invoice"],
      ].map(([x, y, t], i) => (
        <g key={t as string}>
          <rect x={x as number} y={(y as number) - 12} width="52" height="26" rx="13" fill={i === 1 ? C.cu : i === 0 ? C.ink : C.soft} />
          <text
            x={(x as number) + 26}
            y={(y as number) + 4}
            textAnchor="middle"
            fontSize="9"
            fontFamily="monospace"
            fill={i === 1 ? C.ink : i === 0 ? C.paper : C.ink2}
          >
            {t as string}
          </text>
        </g>
      ))}
      <g stroke={C.cu} strokeWidth="1.5" fill="none" strokeDasharray="4 3">
        <path d="M76 45 H96" />
        <path d="M148 45 H168" />
        <path d="M122 58 V96" />
        <path d="M148 109 H168" />
      </g>
      <polygon points="94,42 98,45 94,48" fill={C.cu} />
      <polygon points="166,42 170,45 166,48" fill={C.cu} />
      <polygon points="166,106 170,109 166,112" fill={C.cu} />
      {bar(24, 134, 50)}
      {bar(24, 92, 40, C.mute)}
    </Window>
  ),
  ecommerce: (
    <Window>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={18 + i * 50} y="32" width="44" height="54" rx="3" fill={C.soft} />
          <circle cx={40 + i * 50} cy="54" r={10} fill={i === 1 ? C.cu : C.mute} />
          {bar(24 + i * 50, 72, 26, C.ink2)}
          {bar(24 + i * 50, 79, 16, i === 1 ? C.cu : C.line)}
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={18 + i * 50} y="94" width="44" height="50" rx="3" fill={C.soft} opacity="0.6" />
      ))}
      <rect x="170" y="32" width="54" height="112" rx="3" fill={C.ink} />
      {bar(178, 42, 26, C.cu2)}
      {[56, 70, 84].map((y) => (
        <g key={y}>
          <rect x="178" y={y} width="9" height="9" rx="2" fill={C.ink2} />
          {bar(191, y + 2, 26, "#6e6b66")}
        </g>
      ))}
      <rect x="178" y="104" width="38" height="1" fill="#6e6b66" />
      {bar(178, 112, 18, C.paper, 5)}
      <rect x="178" y="126" width="38" height="11" rx="2" fill={C.cu} />
    </Window>
  ),
  ai: (
    <Window>
      <rect x="18" y="32" width="96" height="112" rx="3" fill={C.soft} />
      {[42, 52, 62, 72, 82, 92, 102].map((y, i) => bar(26, y, i % 3 === 1 ? 54 : 78, i === 2 || i === 5 ? C.cu2 : C.line))}
      <rect x="24" y="60" width="84" height="8" rx="2" fill="none" stroke={C.cu} />
      <rect x="24" y="89" width="84" height="8" rx="2" fill="none" stroke={C.cu} />
      <path d="M116 72 C132 72 132 60 148 60" stroke={C.cu} fill="none" strokeWidth="1.5" />
      <path d="M116 92 C132 92 132 104 148 104" stroke={C.cu} fill="none" strokeWidth="1.5" />
      <rect x="148" y="40" width="74" height="40" rx="3" fill={C.ink} />
      <text x="156" y="54" fontSize="8" fontFamily="monospace" fill={C.cu2}>
        supplier
      </text>
      {bar(156, 62, 52, C.paper, 5)}
      <rect x="148" y="86" width="74" height="40" rx="3" fill={C.ink} />
      <text x="156" y="100" fontSize="8" fontFamily="monospace" fill={C.cu2}>
        total
      </text>
      {bar(156, 108, 34, C.paper, 5)}
      <circle cx="214" cy="136" r="6" fill={C.cu} />
      <path d="M211 136 l2 2 4-4" stroke={C.paper} strokeWidth="1.5" fill="none" />
    </Window>
  ),
  custom: (
    <>
      <rect x="8" y="8" width="224" height="144" rx="5" fill={C.ink} />
      <g stroke="#4a4a4e" strokeWidth="1">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={8 + i * 22.4} y1="8" x2={8 + i * 22.4} y2="152" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="8" y1={8 + i * 24} x2="232" y2={8 + i * 24} />
        ))}
      </g>
      <rect x="40" y="40" width="64" height="44" fill="none" stroke={C.paper} strokeWidth="1.5" />
      <rect x="128" y="64" width="72" height="56" fill="none" stroke={C.cu} strokeWidth="1.5" />
      <path d="M104 62 H116 V92 H128" stroke={C.cu2} fill="none" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="3" fill={C.cu} />
      <circle cx="104" cy="84" r="3" fill={C.cu} />
      <circle cx="200" cy="120" r="3" fill={C.cu} />
      <text x="44" y="98" fontSize="8" fontFamily="monospace" fill={C.mute}>
        64 × 44
      </text>
      <text x="132" y="134" fontSize="8" fontFamily="monospace" fill={C.cu2}>
        module.custom
      </text>
      {bar(48, 50, 36, C.paper)}
      {bar(48, 60, 24, C.stone)}
      {bar(136, 74, 44, C.cu)}
      {bar(136, 84, 30, C.stone)}
    </>
  ),
};

export function ServiceVisual({ kind, className }: { kind: VisualKind; className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={cn("block h-auto w-full", className)} role="img" aria-label={`Illustration of ${kind} software interface`}>
      {visuals[kind]}
    </svg>
  );
}
