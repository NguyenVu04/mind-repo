"use client";

import { Screen } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

const MY_REPOS = [
  { name: "machine-learning-fundamentals", role: "Owner", docs: 14, vis: "Public", progress: 38, updated: "3 ngày trước" },
  { name: "statistics-for-ml", role: "Learning", docs: 12, vis: "Public", progress: 72, updated: "1 tuần trước" },
  { name: "paper-notes-2026", role: "Owner", docs: 6, vis: "Private", progress: 0, updated: "Hôm nay" },
];

export default function Dashboard({ navigate }: Props) {
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
          Chào buổi sáng
        </div>
        <h1 style={{ fontFamily: F.serif, fontSize: 32, color: C.ink, marginBottom: 6 }}>
          Không gian của bạn
        </h1>
        <p style={{ fontSize: 14, color: C.ink2, marginBottom: 36 }}>
          3 repo · 1 learning path đang chạy · 4 flashcard tới hạn hôm nay
        </p>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
            marginBottom: 40,
          }}
        >
          <StatCard label="REPO ĐANG SỞ HỮU" value="2" />
          <StatCard
            label="TÀI LIỆU ĐÃ ĐỌC"
            value={
              <span>
                23<span style={{ fontSize: 15, color: C.ink3 }}> / 38</span>
              </span>
            }
          />
          <StatCard
            label="REPUTATION"
            value={
              <span style={{ color: C.amber }}>
                34{" "}
                <span style={{ fontSize: 13, color: C.ink3 }}>pts · Tier 2</span>
              </span>
            }
          />
        </div>

        {/* Repos */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h2 style={{ fontFamily: F.serif, fontSize: 20, color: C.ink }}>Repo của bạn</h2>
          <button
            className="hover-green-bright"
            style={{
              fontFamily: F.mono,
              fontSize: 12,
              color: C.bg,
              background: C.green,
              border: "none",
              borderRadius: 7,
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            + New Repo
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {MY_REPOS.map((r) => (
            <div
              key={r.name}
              onClick={() => navigate("repo")}
              className="hover-card"
              style={{
                background: C.bg2,
                border: `1px solid ${C.line}`,
                borderRadius: 12,
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                cursor: "pointer",
                transition: "border-color .12s",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 9,
                  background: "rgba(96,165,250,.08)",
                  border: "1px solid rgba(96,165,250,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: F.mono,
                  fontSize: 16,
                  color: C.blue,
                  flexShrink: 0,
                }}
              >
                ⛁
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontFamily: F.mono, fontSize: 14, color: C.ink }}>
                    {r.name}
                  </span>
                  <span
                    style={{
                      fontFamily: F.mono,
                      fontSize: 10,
                      color: C.ink3,
                      border: `1px solid ${C.line2}`,
                      borderRadius: 3,
                      padding: "1px 6px",
                    }}
                  >
                    {r.vis}
                  </span>
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3 }}>
                  {r.role} · {r.docs} tài liệu · cập nhật {r.updated}
                </div>
              </div>
              <div style={{ width: 140, flexShrink: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: F.mono,
                    fontSize: 10,
                    color: C.ink3,
                    marginBottom: 5,
                  }}
                >
                  <span>Tiến độ</span>
                  <span style={{ color: C.ink2 }}>{r.progress}%</span>
                </div>
                <div
                  style={{
                    height: 5,
                    background: C.bg4,
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: C.green,
                      width: `${r.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: C.bg2,
        border: `1px solid ${C.line}`,
        borderRadius: 12,
        padding: 18,
      }}
    >
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontFamily: F.serif, fontSize: 30, color: C.ink }}>
        {value}
      </div>
    </div>
  );
}
