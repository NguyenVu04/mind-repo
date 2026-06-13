"use client";

import { useState } from "react";
import { Screen, PathItem } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

const INITIAL_PATH: PathItem[] = [
  { id: 1, t: "Linear Regression", meta: "PDF · 18 phút", tag: "Nền tảng", done: true },
  { id: 2, t: "Gradient Descent", meta: "PDF · 24 phút", tag: "Nền tảng", done: false, current: true },
  { id: 3, t: "Logistic Regression", meta: "PDF · 16 phút", tag: "Cốt lõi", done: false },
  { id: 4, t: "Neural Networks", meta: "MD · 32 phút", tag: "Cốt lõi", done: false },
  { id: 5, t: "Backpropagation", meta: "PDF · 28 phút", tag: "Cốt lõi", done: false },
  { id: 6, t: "Regularization", meta: "PDF · 14 phút", tag: "Nâng cao", done: false },
];

export default function PathBuilder({ navigate: _navigate }: Props) {
  const [items, setItems] = useState<PathItem[]>(INITIAL_PATH);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDragStart = (i: number) => {
    setDragIndex(i);
  };

  const handleDragEnter = (i: number) => {
    if (dragIndex === null || dragIndex === i) return;
    const next = items.slice();
    const [moved] = next.splice(dragIndex, 1);
    next.splice(i, 0, moved);
    setItems(next);
    setDragIndex(i);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
      <div style={{ maxWidth: 760 }}>
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
          Learning Path Builder
        </div>
        <h1 style={{ fontFamily: F.serif, fontSize: 30, color: C.ink, marginBottom: 6 }}>
          Sắp xếp lộ trình
        </h1>
        <p style={{ fontSize: 14, color: C.ink2, marginBottom: 28 }}>
          Kéo–thả để đổi thứ tự tài liệu. Thứ tự này định nghĩa learning path mà learner sẽ đi
          theo.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((p, i) => {
            const dragging = dragIndex === i;
            return (
              <div
                key={p.id}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragEnter={() => handleDragEnter(i)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "13px 16px",
                  border: `1px solid ${dragging ? C.green : C.line}`,
                  borderRadius: 8,
                  background: dragging ? "rgba(74,222,128,0.06)" : C.bg2,
                  cursor: "grab",
                  opacity: dragging ? 0.9 : 1,
                  transition: "border-color .12s",
                }}
              >
                <span style={{ fontFamily: F.mono, fontSize: 13, color: C.ink5, cursor: "grab" }}>
                  ⠿
                </span>
                <span
                  style={{
                    fontFamily: F.mono,
                    fontSize: 12,
                    color: C.bg,
                    background: C.green,
                    width: 22,
                    height: 22,
                    borderRadius: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F.mono, fontSize: 13, color: C.ink }}>{p.t}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, color: C.ink3, marginTop: 2 }}>
                    {p.meta}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: F.mono,
                    fontSize: 10,
                    color: C.ink2,
                    border: `1px solid ${C.line2}`,
                    borderRadius: 3,
                    padding: "2px 8px",
                  }}
                >
                  {p.tag}
                </span>
              </div>
            );
          })}
        </div>

        <button
          className="hover-green-bright"
          style={{
            marginTop: 22,
            fontFamily: F.mono,
            fontSize: 12,
            color: C.bg,
            background: C.green,
            border: "none",
            borderRadius: 8,
            padding: "11px 22px",
            cursor: "pointer",
          }}
        >
          Lưu learning path
        </button>
      </div>
    </div>
  );
}
