"use client";

import { Screen } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

const DOCS = [
  { name: "01-linear-regression.pdf", ver: "v2.1", status: "Đã index", updated: "3 ngày trước" },
  { name: "02-gradient-descent.pdf", ver: "v1.0", status: "Đã index", updated: "3 ngày trước" },
  { name: "03-neural-networks.md", ver: "v3.4", status: "Đã index · 12 annotation", updated: "1 ngày trước" },
  { name: "04-activations.pdf", ver: "v1.1", status: "Đã index", updated: "5 ngày trước" },
  { name: "05-backprop.pdf", ver: "v1.0", status: "Đang xử lý…", updated: "vài giây trước" },
  { name: "06-regularization.pdf", ver: "v2.0", status: "Đã index", updated: "2 ngày trước" },
];

export default function RepoOverview({ navigate }: Props) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
      <div style={{ maxWidth: 1000 }}>
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: F.mono,
            fontSize: 12,
            color: C.ink3,
            marginBottom: 14,
          }}
        >
          <span style={{ color: C.blue }}>@stanford-cs</span>
          <span>/</span>
          <span style={{ color: C.ink }}>machine-learning-fundamentals</span>
          <span
            style={{
              border: `1px solid ${C.line2}`,
              borderRadius: 3,
              padding: "1px 7px",
              marginLeft: 4,
            }}
          >
            Public
          </span>
        </div>

        <h1 style={{ fontFamily: F.serif, fontSize: 30, color: C.ink, marginBottom: 8 }}>
          machine-learning-fundamentals
        </h1>
        <p
          style={{
            fontSize: 14,
            color: C.ink2,
            maxWidth: 620,
            lineHeight: 1.7,
            marginBottom: 18,
          }}
        >
          Khoá học nền tảng về machine learning: từ hồi quy tuyến tính đến mạng neural và
          regularization. Được cộng đồng annotate và review.
        </p>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            gap: 22,
            marginBottom: 32,
            fontFamily: F.mono,
            fontSize: 12,
            color: C.ink2,
          }}
        >
          <span style={{ color: C.amber }}>★ 4.8 (weighted)</span>
          <span>⛁ 14 tài liệu</span>
          <span>♥ 2.4k</span>
          <span style={{ color: C.purple }}>✎ 38 annotation</span>
        </div>

        {/* Documents */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "11px 0",
            borderBottom: `1px solid ${C.line2}`,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: F.mono,
              fontSize: 11,
              color: C.ink3,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Tài liệu
          </span>
          <button
            className="hover-green-bright"
            style={{
              fontFamily: F.mono,
              fontSize: 11,
              color: C.bg,
              background: C.green,
              border: "none",
              borderRadius: 6,
              padding: "6px 13px",
              cursor: "pointer",
            }}
          >
            ⬆ Upload
          </button>
        </div>

        <div>
          {DOCS.map((d) => (
            <div
              key={d.name}
              onClick={() => navigate("reader")}
              className="hover-bg2"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "13px 8px",
                borderBottom: `1px solid rgba(255,255,255,0.06)`,
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: F.mono, fontSize: 14, color: C.ink3 }}>▣</span>
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: 13,
                  color: C.ink,
                  flex: 1,
                  minWidth: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {d.name}
              </span>
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: 10,
                  color: C.blue,
                  border: "1px solid rgba(96,165,250,.2)",
                  borderRadius: 3,
                  padding: "1px 6px",
                }}
              >
                {d.ver}
              </span>
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: 11,
                  color: C.ink3,
                  width: 160,
                  textAlign: "right",
                }}
              >
                {d.status}
              </span>
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: 11,
                  color: C.ink5,
                  width: 90,
                  textAlign: "right",
                }}
              >
                {d.updated}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
