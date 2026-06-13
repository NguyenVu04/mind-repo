"use client";

import { Screen, PathItem } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

const PATH: PathItem[] = [
  { id: 1, t: "Linear Regression", meta: "PDF · 18 phút", tag: "Nền tảng", done: true },
  { id: 2, t: "Gradient Descent", meta: "PDF · 24 phút", tag: "Nền tảng", done: false, current: true },
  { id: 3, t: "Logistic Regression", meta: "PDF · 16 phút", tag: "Cốt lõi", done: false },
  { id: 4, t: "Neural Networks", meta: "MD · 32 phút", tag: "Cốt lõi", done: false },
  { id: 5, t: "Backpropagation", meta: "PDF · 28 phút", tag: "Cốt lõi", done: false },
  { id: 6, t: "Regularization", meta: "PDF · 14 phút", tag: "Nâng cao", done: false },
];

export default function LearnerView({ navigate }: Props) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
      <div style={{ maxWidth: 780 }}>
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
          Learning Path · Beginner
        </div>
        <h1 style={{ fontFamily: F.serif, fontSize: 30, color: C.ink, marginBottom: 18 }}>
          Hành trình của bạn
        </h1>

        {/* Progress bar */}
        <div
          style={{
            background: C.bg2,
            border: `1px solid ${C.line}`,
            borderRadius: 12,
            padding: "18px 20px",
            marginBottom: 30,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: F.mono,
                fontSize: 11,
                color: C.ink3,
                marginBottom: 7,
              }}
            >
              <span>Tiến độ tổng thể</span>
              <span style={{ color: C.green }}>38% · còn ~2 giờ 14 phút</span>
            </div>
            <div
              style={{
                height: 7,
                background: C.bg4,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "38%",
                  height: "100%",
                  background: "linear-gradient(90deg,#4ade80,#2dd4bf)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Path steps */}
        <div style={{ position: "relative" }}>
          {PATH.map((p, i) => (
            <div
              key={p.id}
              onClick={() => navigate("reader")}
              style={{
                display: "flex",
                gap: 16,
                padding: "0 0 22px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {p.done ? (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: C.green,
                      color: C.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    ✓
                  </div>
                ) : (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: C.bg3,
                      border: `1px solid rgba(255,255,255,0.14)`,
                      color: C.ink3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: F.mono,
                      fontSize: 12,
                    }}
                  >
                    {i + 1}
                  </div>
                )}
                {i < PATH.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      flex: 1,
                      minHeight: 26,
                      background: "rgba(255,255,255,0.1)",
                      marginTop: 4,
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, paddingBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ fontFamily: F.serif, fontSize: 17, color: C.ink }}>{p.t}</span>
                  {p.current && (
                    <span
                      style={{
                        fontFamily: F.mono,
                        fontSize: 9,
                        color: C.teal,
                        border: "1px solid rgba(45,212,191,.3)",
                        borderRadius: 3,
                        padding: "1px 7px",
                      }}
                    >
                      ĐANG HỌC
                    </span>
                  )}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3, marginTop: 4 }}>
                  {p.meta} · {p.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
