"use client";

import { Screen } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

export default function Pricing({ navigate: _navigate }: Props) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 48 }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 11,
              color: C.amber,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Gói & thanh toán
          </div>
          <h1 style={{ fontFamily: F.serif, fontSize: 34, color: C.ink, marginBottom: 8 }}>
            Nâng cấp khi bạn cần
          </h1>
          <p style={{ fontSize: 14, color: C.ink2 }}>
            Bắt đầu miễn phí. Thanh toán an toàn qua Stripe.
          </p>
        </div>

        {/* Plans */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
          }}
        >
          {/* Free */}
          <div
            style={{
              background: C.bg2,
              border: `1px solid ${C.line}`,
              borderRadius: 14,
              padding: 26,
            }}
          >
            <div style={{ fontFamily: F.mono, fontSize: 13, color: C.ink2, marginBottom: 14 }}>
              Free
            </div>
            <div style={{ fontFamily: F.serif, fontSize: 34, color: C.ink, marginBottom: 4 }}>
              $0
            </div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3, marginBottom: 22 }}>
              cho người học
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 11,
                fontSize: 13,
                color: C.ink2,
                marginBottom: 24,
              }}
            >
              <Feature check>20 repo công khai</Feature>
              <Feature check>AI Tutor · 50 câu/ngày</Feature>
              <Feature check>Flashcards không giới hạn</Feature>
              <Feature check={false}>Private repo</Feature>
            </div>
            <button
              style={{
                width: "100%",
                fontFamily: F.mono,
                fontSize: 12,
                color: C.ink2,
                background: C.bg3,
                border: `1px solid ${C.line2}`,
                borderRadius: 8,
                padding: 11,
                cursor: "default",
              }}
            >
              Gói hiện tại
            </button>
          </div>

          {/* Pro */}
          <div
            style={{
              background: C.bg2,
              border: `1px solid ${C.green}`,
              borderRadius: 14,
              padding: 26,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                left: 26,
                fontFamily: F.mono,
                fontSize: 10,
                color: C.bg,
                background: C.green,
                borderRadius: 4,
                padding: "3px 9px",
              }}
            >
              PHỔ BIẾN
            </div>
            <div style={{ fontFamily: F.mono, fontSize: 13, color: C.green, marginBottom: 14 }}>
              Pro
            </div>
            <div style={{ fontFamily: F.serif, fontSize: 34, color: C.ink, marginBottom: 4 }}>
              $12
              <span style={{ fontSize: 14, color: C.ink3 }}>/tháng</span>
            </div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3, marginBottom: 22 }}>
              cho người dùng nghiêm túc
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 11,
                fontSize: 13,
                color: C.ink4,
                marginBottom: 24,
              }}
            >
              <Feature check>Repo không giới hạn</Feature>
              <Feature check>Private repo</Feature>
              <Feature check>AI Tutor không giới hạn</Feature>
              <Feature check>Video–document sync</Feature>
            </div>
            <button
              className="hover-green-bright"
              style={{
                width: "100%",
                fontFamily: F.mono,
                fontSize: 12,
                color: C.bg,
                background: C.green,
                border: "none",
                borderRadius: 8,
                padding: 11,
                cursor: "pointer",
              }}
            >
              Nâng cấp lên Pro →
            </button>
          </div>

          {/* Team */}
          <div
            style={{
              background: C.bg2,
              border: `1px solid ${C.line}`,
              borderRadius: 14,
              padding: 26,
            }}
          >
            <div style={{ fontFamily: F.mono, fontSize: 13, color: C.purple, marginBottom: 14 }}>
              Team
            </div>
            <div style={{ fontFamily: F.serif, fontSize: 34, color: C.ink, marginBottom: 4 }}>
              $39
              <span style={{ fontSize: 14, color: C.ink3 }}>/tháng</span>
            </div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3, marginBottom: 22 }}>
              tối đa 10 thành viên
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 11,
                fontSize: 13,
                color: C.ink2,
                marginBottom: 24,
              }}
            >
              <Feature check>Mọi tính năng Pro</Feature>
              <Feature check>Quản lý contributor</Feature>
              <Feature check>Phân tích & báo cáo</Feature>
              <Feature check>SSO · ưu tiên hỗ trợ</Feature>
            </div>
            <button
              className="hover-purple"
              style={{
                width: "100%",
                fontFamily: F.mono,
                fontSize: 12,
                color: C.purple,
                background: "rgba(192,132,252,.06)",
                border: "1px solid rgba(192,132,252,.25)",
                borderRadius: 8,
                padding: 11,
                cursor: "pointer",
              }}
            >
              Liên hệ sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ check, children }: { check: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 9 }}>
      <span style={{ color: check ? C.green : C.ink5 }}>{check ? "✓" : "✕"}</span>
      <span style={{ color: check ? undefined : C.ink3 }}>{children}</span>
    </div>
  );
}
