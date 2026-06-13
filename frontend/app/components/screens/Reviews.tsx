"use client";

import { Screen } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

const REVIEWS = [
  {
    author: "@andrew-ng",
    rep: "Tier 4 · Domain match",
    weight: "3.5",
    stars: 5,
    text: "Tài liệu gradient descent là một trong những bản giải thích trực quan nhất mình từng đọc. Annotation cộng đồng làm nó tốt hơn nữa.",
    date: "2 ngày trước",
  },
  {
    author: "@data-school",
    rep: "Tier 3",
    weight: "2.5",
    stars: 5,
    text: "Learning path được sắp xếp hợp lý. AI Tutor trả lời chính xác và luôn trích nguồn — rất hiếm khi bịa.",
    date: "5 ngày trước",
  },
  {
    author: "@new-learner",
    rep: "Tier 0",
    weight: "1.0",
    stars: 4,
    text: "Phù hợp cho người mới. Mong có thêm bài tập thực hành.",
    date: "1 tuần trước",
  },
];

const TIER_BARS = [
  { label: "Tier 4", pct: "84%", color: C.amber, weight: "×3.5" },
  { label: "Tier 3", pct: "60%", color: C.ink2, weight: "×2.5" },
  { label: "Tier 0", pct: "24%", color: C.ink5, weight: "×1.0" },
];

export default function Reviews({ navigate: _navigate }: Props) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
      <div style={{ maxWidth: 860 }}>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 11,
            color: C.purple,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Community · Reputation-weighted
        </div>
        <h1 style={{ fontFamily: F.serif, fontSize: 30, color: C.ink, marginBottom: 6 }}>
          Review & đánh giá
        </h1>
        <p
          style={{
            fontSize: 14,
            color: C.ink2,
            marginBottom: 28,
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          Điểm chất lượng không cân bằng — review từ chuyên gia trong lĩnh vực có trọng số cao
          hơn. Điểm tổng = Σ(rating × weight) / Σ(weight).
        </p>

        {/* Score overview */}
        <div style={{ display: "flex", gap: 14, marginBottom: 34 }}>
          <div
            style={{
              background: C.bg2,
              border: `1px solid ${C.line}`,
              borderRadius: 12,
              padding: "20px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontFamily: F.serif, fontSize: 40, color: C.amber, lineHeight: 1 }}
            >
              4.8
            </div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3, marginTop: 6 }}>
              weighted · 47 review
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: C.bg2,
              border: `1px solid ${C.line}`,
              borderRadius: 12,
              padding: "18px 22px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 7,
            }}
          >
            {TIER_BARS.map((t) => (
              <div
                key={t.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: F.mono,
                  fontSize: 11,
                  color: C.ink3,
                }}
              >
                <span style={{ width: 42 }}>{t.label}</span>
                <div
                  style={{
                    flex: 1,
                    height: 5,
                    background: C.bg4,
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{ width: t.pct, height: "100%", background: t.color }}
                  />
                </div>
                <span style={{ color: t.color }}>{t.weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              style={{
                background: C.bg2,
                border: `1px solid ${C.line}`,
                borderRadius: 12,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: F.mono, fontSize: 13, color: C.ink }}>
                    {r.author}
                  </span>
                  <span
                    style={{
                      fontFamily: F.mono,
                      fontSize: 10,
                      color: C.amber,
                      border: "1px solid rgba(251,191,36,.25)",
                      borderRadius: 3,
                      padding: "1px 7px",
                    }}
                  >
                    {r.rep}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.amber }}>★★★★★</span>
                  <span
                    style={{
                      fontFamily: F.mono,
                      fontSize: 10,
                      color: C.teal,
                      background: "rgba(45,212,191,.08)",
                      border: "1px solid rgba(45,212,191,.2)",
                      borderRadius: 3,
                      padding: "2px 7px",
                    }}
                  >
                    weight ×{r.weight}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 13.5, color: C.ink4, lineHeight: 1.7, marginBottom: 8 }}>
                {r.text}
              </p>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.ink5 }}>{r.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
