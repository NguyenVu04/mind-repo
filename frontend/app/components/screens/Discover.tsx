"use client";

import { useState } from "react";
import { Screen } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

const ALL_REPOS = [
  {
    name: "machine-learning-fundamentals",
    owner: "@stanford-cs",
    desc: "Khoá ML nền tảng: hồi quy, gradient descent, mạng neural.",
    docs: 14,
    stars: "2.4k",
    score: "4.8",
    dom: "machine-learning",
  },
  {
    name: "deep-learning-specialization",
    owner: "@deeplearning-ai",
    desc: "CNN, RNN, Transformers với learning path 4 cấp độ.",
    docs: 32,
    stars: "8.1k",
    score: "4.9",
    dom: "machine-learning",
  },
  {
    name: "quantum-mechanics-101",
    owner: "@mit-physics",
    desc: "Cơ học lượng tử cho người mới, kèm video sync.",
    docs: 21,
    stars: "1.2k",
    score: "4.6",
    dom: "physics",
  },
  {
    name: "clinical-anatomy-atlas",
    owner: "@med-collective",
    desc: "Giải phẫu lâm sàng có annotation từ bác sĩ.",
    docs: 47,
    stars: "3.0k",
    score: "4.7",
    dom: "medicine",
  },
  {
    name: "contract-law-essentials",
    owner: "@legal-ed",
    desc: "Luật hợp đồng với case study thực tế.",
    docs: 18,
    stars: "890",
    score: "4.4",
    dom: "law",
  },
  {
    name: "statistics-for-ml",
    owner: "@data-school",
    desc: "Xác suất & thống kê cần thiết trước khi học ML.",
    docs: 12,
    stars: "1.6k",
    score: "4.5",
    dom: "machine-learning",
  },
];

const FILTERS = ["Tất cả", "machine-learning", "physics", "medicine", "law"];

export default function Discover({ navigate }: Props) {
  const [filter, setFilter] = useState("Tất cả");

  const repos = filter === "Tất cả" ? ALL_REPOS : ALL_REPOS.filter((r) => r.dom === filter);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
      <div style={{ maxWidth: 1100 }}>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 11,
            color: C.green,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Khám phá
        </div>
        <h1 style={{ fontFamily: F.serif, fontSize: 32, color: C.ink, marginBottom: 18 }}>
          Repo công khai
        </h1>

        {/* Search */}
        <div
          style={{
            background: C.bg2,
            border: `1px solid ${C.line2}`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            marginBottom: 18,
          }}
        >
          <span style={{ color: C.ink3 }}>⌕</span>
          <span style={{ fontFamily: F.mono, fontSize: 13, color: C.ink3 }}>
            Tìm kiếm ngữ nghĩa: "làm sao để chống overfitting"…
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: F.mono,
              fontSize: 10,
              color: C.teal,
              border: "1px solid rgba(45,212,191,.25)",
              borderRadius: 4,
              padding: "2px 8px",
            }}
          >
            hybrid + RRF
          </span>
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: F.mono,
                fontSize: 11,
                padding: "5px 12px",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all .12s",
                border: `1px solid ${filter === f ? C.green : C.line2}`,
                color: filter === f ? C.green : C.ink2,
                background: filter === f ? "rgba(74,222,128,0.08)" : "transparent",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3, marginBottom: 14 }}>
          {repos.length} repo
        </div>

        {/* Repo grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          {repos.map((r) => (
            <div
              key={r.name}
              onClick={() => navigate("repo")}
              className="hover-card"
              style={{
                background: C.bg2,
                border: `1px solid ${C.line}`,
                borderRadius: 12,
                padding: 20,
                cursor: "pointer",
                transition: "border-color .12s",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 9,
                }}
              >
                <span style={{ fontFamily: F.mono, fontSize: 11, color: C.blue }}>
                  {r.owner}
                </span>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: C.amber }}>
                  ★ {r.score}
                </span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 14, color: C.ink, marginBottom: 8 }}>
                {r.name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.ink2,
                  lineHeight: 1.6,
                  marginBottom: 16,
                  flex: 1,
                }}
              >
                {r.desc}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  fontFamily: F.mono,
                  fontSize: 11,
                  color: C.ink3,
                }}
              >
                <span>⛁ {r.docs} tài liệu</span>
                <span>♥ {r.stars}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
