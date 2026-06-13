"use client";

import { Screen } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

const ANNOS = [
  {
    type: "Giải thích",
    color: C.blue,
    author: "@andrew-ng",
    rep: "Tier 4",
    text: '"Cực tiểu cục bộ" hiếm khi là vấn đề trong mạng sâu — saddle point mới là thứ hay làm chậm hội tụ.',
    votes: 47,
    approved: true,
  },
  {
    type: "Ví dụ",
    color: C.green,
    author: "@chip-h",
    rep: "Tier 3",
    text: "Thử với lr=0.1 trên dataset MNIST sẽ thấy loss dao động rõ rệt sau epoch 3.",
    votes: 23,
    approved: false,
  },
  {
    type: "Đính chính",
    color: C.red,
    author: "@reviewer",
    rep: "Tier 2",
    text: "Công thức (3.4) thiếu hệ số 1/m khi lấy trung bình gradient trên batch.",
    votes: 31,
    approved: true,
  },
];

export default function Reader({ navigate: _navigate }: Props) {
  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      {/* Document content */}
      <div style={{ flex: 1, minWidth: 0, overflowY: "auto", padding: "40px 56px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.blue, marginBottom: 8 }}>
            02-gradient-descent.pdf · v1.0 · trang 7
          </div>
          <h1 style={{ fontFamily: F.serif, fontSize: 26, color: C.ink, marginBottom: 20 }}>
            3.2 — Learning Rate
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.ink4, marginBottom: 18 }}>
            Learning rate là một trong những siêu tham số quan trọng nhất khi huấn luyện. Nó quyết
            định độ lớn của mỗi bước cập nhật mà optimizer thực hiện theo hướng ngược với gradient
            của hàm mất mát.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.ink4, marginBottom: 18 }}>
            Nếu learning rate{" "}
            <span
              style={{
                background: "rgba(96,165,250,.16)",
                borderBottom: `2px solid ${C.blue}`,
                padding: "1px 2px",
                cursor: "pointer",
              }}
            >
              quá lớn, các bước cập nhật sẽ vượt quá cực tiểu
            </span>{" "}
            và loss có thể dao động mạnh hoặc phân kỳ hoàn toàn. Ngược lại, một learning rate quá
            nhỏ dẫn đến hội tụ cực kỳ chậm.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.ink4, marginBottom: 18 }}>
            Một chiến lược phổ biến là{" "}
            <span
              style={{
                background: "rgba(74,222,128,.14)",
                borderBottom: `2px solid ${C.green}`,
                padding: "1px 2px",
                cursor: "pointer",
              }}
            >
              learning rate scheduling
            </span>
            : bắt đầu với warmup rồi giảm dần (decay) theo thời gian để cân bằng giữa tốc độ và
            độ ổn định.
          </p>
          <div
            style={{
              background: C.bg2,
              border: `1px solid rgba(255,255,255,0.08)`,
              borderLeft: `2px solid ${C.red}`,
              borderRadius: "0 8px 8px 0",
              padding: "14px 18px",
              margin: "24px 0",
            }}
          >
            <div
              style={{ fontFamily: F.mono, fontSize: 11, color: C.ink4, lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{
                __html: "θ ← θ − η · ∇<sub>θ</sub> J(θ)",
              }}
            />
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.ink4 }}>
            Trong đó{" "}
            <span
              style={{
                background: "rgba(248,113,113,.14)",
                borderBottom: `2px solid ${C.red}`,
                padding: "1px 2px",
                cursor: "pointer",
              }}
            >
              η
            </span>{" "}
            chính là learning rate. Giá trị khởi đầu hợp lý thường nằm trong khoảng 1e-3 đến
            1e-2.
          </p>
        </div>
      </div>

      {/* Annotation rail */}
      <aside
        className="rail-hide"
        style={{
          width: 340,
          flexShrink: 0,
          borderLeft: `1px solid ${C.line}`,
          background: "#121210",
          overflowY: "auto",
          padding: "24px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 10,
              color: C.purple,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Annotation Layer
          </div>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: C.ink3 }}>
            {ANNOS.length} ghi chú
          </span>
        </div>
        <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.6, marginBottom: 18 }}>
          Ghi chú của cộng đồng nằm trên một lớp riêng — không bao giờ sửa tài liệu gốc.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ANNOS.map((a, i) => (
            <div
              key={i}
              style={{
                background: C.bg3,
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 10,
                padding: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 9,
                }}
              >
                <span
                  style={{
                    fontFamily: F.mono,
                    fontSize: 10,
                    padding: "2px 8px",
                    borderRadius: 3,
                    color: a.color,
                    border: `1px solid ${a.color}`,
                    background: "rgba(255,255,255,.03)",
                  }}
                >
                  {a.type}
                </span>
                {a.approved && (
                  <span style={{ fontFamily: F.mono, fontSize: 9, color: C.green }}>
                    ✓ merged
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: C.ink4, lineHeight: 1.6, marginBottom: 11 }}>
                {a.text}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.ink3 }}>
                  {a.author} ·{" "}
                  <span style={{ color: C.amber }}>{a.rep}</span>
                </span>
                <span
                  style={{
                    fontFamily: F.mono,
                    fontSize: 11,
                    color: C.ink2,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  ▲ {a.votes}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          className="hover-purple"
          style={{
            width: "100%",
            marginTop: 14,
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
          + Thêm annotation
        </button>
      </aside>
    </div>
  );
}
