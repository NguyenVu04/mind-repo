"use client";

import { Screen } from "../types";
import { C, F } from "../lib/design";

interface LeftRailProps {
  screen: Screen;
  navigate: (s: Screen) => void;
}

interface NavEntry {
  key: Screen;
  label: string;
  accent?: string;
}

export default function LeftRail({ screen, navigate }: LeftRailProps) {
  const navHome: NavEntry[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "discover", label: "Khám phá" },
  ];
  const navRepo: NavEntry[] = [
    { key: "repo", label: "Tổng quan" },
    { key: "reader", label: "Đọc & annotate", accent: C.purple },
    { key: "builder", label: "Learning path" },
    { key: "learn", label: "Học tập" },
    { key: "tutor", label: "AI Tutor", accent: C.teal },
    { key: "reviews", label: "Review", accent: C.purple },
  ];
  const navAccount: NavEntry[] = [
    { key: "pricing", label: "Gói & thanh toán", accent: C.amber },
    { key: "onboarding", label: "Onboarding" },
  ];

  return (
    <aside
      className="rail-hide"
      style={{
        width: 248,
        flexShrink: 0,
        background: "#161614",
        borderRight: `1px solid ${C.line}`,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 18px 16px",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            className="animate-pulse-dot"
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.green,
            }}
          />
          <span
            style={{
              fontFamily: F.mono,
              fontSize: 14,
              fontWeight: 500,
              color: C.green,
              letterSpacing: "0.06em",
            }}
          >
            MindRepo
          </span>
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 10,
            color: C.ink3,
            marginTop: 5,
            paddingLeft: 16,
          }}
        >
          the living knowledge layer
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "12px 12px 0" }}>
        <div
          style={{
            background: C.bg3,
            border: `1px solid ${C.line2}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 11px",
          }}
        >
          <span style={{ color: C.ink3, fontSize: 13 }}>⌕</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3 }}>
            Tìm repo, tài liệu…
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: F.mono,
              fontSize: 9,
              color: C.ink3,
              border: `1px solid ${C.line2}`,
              borderRadius: 3,
              padding: "1px 5px",
            }}
          >
            ⌘K
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 0" }}>
        <NavSection label="Workspace" items={navHome} screen={screen} navigate={navigate} />
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 10,
            color: C.ink3,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "18px 18px 6px",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <span style={{ color: C.blue }}>repo</span>
          <span style={{ color: C.ink5 }}>/</span>
          <span
            style={{
              color: C.ink2,
              textTransform: "none",
              letterSpacing: 0,
              fontSize: 10,
            }}
          >
            ml-fundamentals
          </span>
        </div>
        {navRepo.map((n) => (
          <NavBtn key={n.key} item={n} active={screen === n.key} navigate={navigate} />
        ))}
        <NavSection label="Tài khoản" items={navAccount} screen={screen} navigate={navigate} />
      </nav>

      {/* User footer */}
      <div
        style={{
          padding: "14px 16px",
          borderTop: `1px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#4ade80,#2dd4bf)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: F.mono,
            fontSize: 12,
            fontWeight: 500,
            color: C.bg,
          }}
        >
          L
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 12,
              color: C.ink,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            @learner
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.amber }}>
            ★ Tier 2 · 34 pts
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavSection({
  label,
  items,
  screen,
  navigate,
}: {
  label: string;
  items: NavEntry[];
  screen: Screen;
  navigate: (s: Screen) => void;
}) {
  return (
    <>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          color: C.ink3,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "8px 18px 6px",
        }}
      >
        {label}
      </div>
      {items.map((n) => (
        <NavBtn key={n.key} item={n} active={screen === n.key} navigate={navigate} />
      ))}
    </>
  );
}

function NavBtn({
  item,
  active,
  navigate,
}: {
  item: NavEntry;
  active: boolean;
  navigate: (s: Screen) => void;
}) {
  const accent = item.accent || C.green;
  return (
    <button
      className="nav-item"
      onClick={() => navigate(item.key)}
      style={{
        borderLeft: `2px solid ${active ? accent : "transparent"}`,
        background: active ? C.bg3 : "transparent",
        color: active ? C.ink : C.ink2,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          flexShrink: 0,
          background: active ? accent : C.ink3,
        }}
      />
      <span>{item.label}</span>
    </button>
  );
}
