"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Screen, ChatMessage, Flashcard } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    q: "Learning rate điều khiển điều gì trong gradient descent?",
    a: "Kích thước mỗi bước cập nhật tham số hướng về cực tiểu của hàm mất mát.",
    src: "02-gradient-descent.pdf · p.7",
    due: "Hôm nay",
  },
  {
    q: "Vanishing gradient là gì?",
    a: "Gradient teo nhỏ về 0 ở các lớp đầu của mạng sâu, khiến việc học bị đình trệ.",
    src: "03-neural-networks.md",
    due: "Ngày mai",
  },
  {
    q: "Mục đích của regularization?",
    a: "Hạn chế overfitting bằng cách phạt các trọng số lớn (L1/L2) hoặc bỏ ngẫu nhiên neuron (dropout).",
    src: "06-regularization.pdf · p.3",
    due: "2 ngày",
  },
];

const INITIAL_CHAT: ChatMessage[] = [
  {
    role: "ai",
    text: "Xin chào! Mình là AI Tutor của repo machine-learning-fundamentals. Mình chỉ trả lời dựa trên 14 tài liệu trong repo này và luôn trích dẫn nguồn. Bạn đang ở module Gradient Descent — hỏi mình bất cứ điều gì.",
    cites: [],
    typing: false,
  },
];

function answerFor(q: string): {
  text: string;
  cites: { doc: string; loc: string }[];
  fc: { q: string; a: string };
} {
  const s = q.toLowerCase();
  if (s.includes("overfit") || s.includes("regular") || s.includes("dropout")) {
    return {
      text: "Theo 06-regularization.pdf (§2.1): overfitting xảy ra khi mô hình ghi nhớ nhiễu trong tập huấn luyện thay vì học quy luật tổng quát. Ba kỹ thuật chính trong repo: L2 (weight decay) phạt bình phương trọng số để giữ chúng nhỏ; L1 đẩy nhiều trọng số về đúng 0, tạo mô hình thưa; và dropout ngẫu nhiên tắt một tỉ lệ neuron mỗi bước huấn luyện để mạng không phụ thuộc vào bất kỳ đường dẫn đơn lẻ nào. Tài liệu khuyến nghị bắt đầu với dropout 0.5 ở các lớp fully-connected.",
      cites: [
        { doc: "06-regularization.pdf", loc: "p.3 · §2.1" },
        { doc: "03-neural-networks.md", loc: "§ Dropout" },
      ],
      fc: {
        q: "Ba kỹ thuật regularization chính là gì?",
        a: "L2 (weight decay), L1 (sparsity), và dropout.",
      },
    };
  }
  if (
    s.includes("neural") ||
    s.includes("mạng") ||
    s.includes("layer") ||
    s.includes("lớp")
  ) {
    return {
      text: "Theo 03-neural-networks.md (§1): một mạng neural xếp chồng các lớp gồm phép biến đổi tuyến tính theo sau bởi hàm phi tuyến (activation). Chính các activation như ReLU cho phép mạng xấp xỉ các hàm phức tạp — nếu thiếu chúng, mọi lớp xếp chồng sẽ thu gọn lại thành một phép tuyến tính duy nhất. Độ sâu giúp mô hình học biểu diễn phân cấp: cạnh → bộ phận → đối tượng.",
      cites: [
        { doc: "03-neural-networks.md", loc: "§1 Kiến trúc" },
        { doc: "04-activations.pdf", loc: "p.2" },
      ],
      fc: {
        q: "Vì sao mạng neural cần hàm activation phi tuyến?",
        a: "Không có chúng, các lớp tuyến tính xếp chồng thu gọn về một phép tuyến tính duy nhất.",
      },
    };
  }
  return {
    text: "Theo 02-gradient-descent.pdf (§3.2): learning rate quyết định độ lớn của mỗi bước mà optimizer đi về phía cực tiểu của hàm mất mát. Nếu quá lớn, các bước cập nhật vượt quá cực tiểu và loss có thể dao động hoặc phân kỳ. Nếu quá nhỏ, hội tụ rất chậm và quá trình huấn luyện dễ kẹt ở các vùng phẳng. Trong thực tế nên bắt đầu quanh 1e-3 rồi dùng lịch trình warmup → decay để cân bằng tốc độ và độ ổn định.",
    cites: [
      { doc: "02-gradient-descent.pdf", loc: "p.7 · §3.2" },
      { doc: "02-gradient-descent.pdf", loc: "p.9 · Hình 4" },
    ],
    fc: {
      q: "Vì sao learning rate quan trọng trong gradient descent?",
      a: "Nó đặt kích thước bước: quá lớn thì vượt/phân kỳ, quá nhỏ thì hội tụ chậm.",
    },
  };
}

const SUGGESTIONS = [
  "Vì sao learning rate quan trọng?",
  "Giải thích vanishing gradient",
  "Khi nào nên dùng regularization?",
];

export default function AiTutor({ navigate: _navigate }: Props) {
  const [chat, setChat] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [suggested, setSuggested] = useState(true);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(INITIAL_FLASHCARDS);
  const [reviewMode, setReviewMode] = useState(false);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlip, setFcFlip] = useState(false);

  const msgRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    return () => {
      if (streamRef.current) clearInterval(streamRef.current);
    };
  }, []);

  const ask = useCallback(
    (preset?: string) => {
      if (streaming) return;
      const q = (typeof preset === "string" ? preset : draft).trim();
      if (!q) return;

      const ans = answerFor(q);
      setDraft("");
      setSuggested(false);
      setStreaming(true);
      setChat((prev) => [
        ...prev,
        { role: "user", text: q, cites: [] },
        { role: "ai", text: "", cites: [], typing: true, fc: ans.fc },
      ]);

      const words = ans.text.split(" ");
      let i = 0;

      streamRef.current = setInterval(() => {
        i += 2;
        setChat((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            ...next[next.length - 1],
            text: words.slice(0, Math.min(i, words.length)).join(" "),
          };
          return next;
        });

        if (i >= words.length) {
          if (streamRef.current) clearInterval(streamRef.current);
          setChat((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              ...next[next.length - 1],
              typing: false,
              cites: ans.cites,
            };
            return next;
          });
          setStreaming(false);
        }
      }, 45);
    },
    [streaming, draft]
  );

  const saveFc = (idx: number) => {
    setChat((prev) => {
      const next = [...prev];
      const m = next[idx];
      if (!m || !m.fc || m.fcSaved) return prev;
      next[idx] = { ...m, fcSaved: true };
      const newCard: Flashcard = {
        q: m.fc.q,
        a: m.fc.a,
        src: m.cites[0] ? `${m.cites[0].doc} · ${m.cites[0].loc}` : "AI Tutor",
        due: "Hôm nay",
      };
      setFlashcards((fc) => [newCard, ...fc]);
      return next;
    });
  };

  const fc = flashcards[fcIndex] || flashcards[0];

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      {/* Chat column */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <header
          style={{
            padding: "16px 32px",
            borderBottom: `1px solid ${C.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            background: "rgba(15,15,13,.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(45,212,191,.1)",
                border: "1px solid rgba(45,212,191,.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
              }}
            >
              ✦
            </div>
            <div>
              <div style={{ fontFamily: F.serif, fontSize: 18, color: C.ink, lineHeight: 1.1 }}>
                AI Tutor
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.teal }}>
                grounded · 14 tài liệu · ml-fundamentals
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 10,
              color: C.ink3,
              border: `1px solid ${C.line2}`,
              borderRadius: 4,
              padding: "4px 9px",
            }}
          >
            RAG · hybrid + rerank
          </div>
        </header>

        {/* Messages */}
        <div
          ref={msgRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            {chat.map((m, i) => (
              <div key={i} className="animate-fade-up">
                {m.role === "user" ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        maxWidth: "80%",
                        background: C.bg3,
                        border: `1px solid rgba(255,255,255,0.1)`,
                        borderRadius: "12px 12px 4px 12px",
                        padding: "11px 15px",
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: C.ink,
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 13 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        flexShrink: 0,
                        borderRadius: 7,
                        background: "rgba(45,212,191,.1)",
                        border: "1px solid rgba(45,212,191,.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                      }}
                    >
                      ✦
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: 14,
                          lineHeight: 1.75,
                          color: C.ink4,
                        }}
                      >
                        {m.text}
                        {m.typing && (
                          <span
                            className="animate-blink"
                            style={{
                              display: "inline-block",
                              width: 7,
                              height: 15,
                              background: C.teal,
                              marginLeft: 2,
                              verticalAlign: "-2px",
                            }}
                          />
                        )}
                      </div>
                      {m.cites && m.cites.length > 0 && (
                        <div
                          style={{
                            marginTop: 13,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 7,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: F.mono,
                              fontSize: 10,
                              color: C.ink3,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            Nguồn
                          </span>
                          {m.cites.map((c, ci) => (
                            <span
                              key={ci}
                              style={{
                                fontFamily: F.mono,
                                fontSize: 11,
                                color: C.teal,
                                background: "rgba(45,212,191,.08)",
                                border: "1px solid rgba(45,212,191,.2)",
                                borderRadius: 4,
                                padding: "3px 9px",
                                cursor: "pointer",
                              }}
                            >
                              {c.doc} · {c.loc}
                            </span>
                          ))}
                        </div>
                      )}
                      {!m.typing && m.fc && !m.fcSaved && (
                        <button
                          onClick={() => saveFc(i)}
                          className="hover-green"
                          style={{
                            marginTop: 12,
                            fontFamily: F.mono,
                            fontSize: 11,
                            color: C.green,
                            background: "rgba(74,222,128,.07)",
                            border: "1px solid rgba(74,222,128,.25)",
                            borderRadius: 6,
                            padding: "6px 12px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          ⊕ Lưu thành flashcard
                        </button>
                      )}
                      {m.fcSaved && (
                        <div
                          style={{
                            marginTop: 12,
                            fontFamily: F.mono,
                            fontSize: 11,
                            color: C.ink3,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          ✓ Đã lưu vào bộ flashcard
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {suggested && chat.length <= 1 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 9,
                  paddingLeft: 41,
                }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="hover-teal"
                    style={{
                      fontSize: 13,
                      color: C.ink2,
                      background: C.bg2,
                      border: `1px solid ${C.line2}`,
                      borderRadius: 18,
                      padding: "8px 15px",
                      cursor: "pointer",
                      transition: "all .12s",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div
          style={{
            padding: "18px 32px 26px",
            flexShrink: 0,
            borderTop: `1px solid ${C.line}`,
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 10,
                background: C.bg2,
                border: `1px solid ${C.line2}`,
                borderRadius: 12,
                padding: "10px 10px 10px 16px",
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    ask();
                  }
                }}
                placeholder="Hỏi bất cứ điều gì về repo này…"
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontFamily: F.sans,
                  fontSize: 14,
                  color: C.ink,
                  padding: "6px 0",
                }}
              />
              <button
                onClick={() => ask()}
                className="hover-green-bright"
                style={{
                  flexShrink: 0,
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "none",
                  background: C.green,
                  color: C.bg,
                  fontSize: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ↑
              </button>
            </div>
            <div
              style={{
                fontFamily: F.mono,
                fontSize: 10,
                color: C.ink3,
                marginTop: 9,
                textAlign: "center",
              }}
            >
              AI chỉ trả lời từ tài liệu trong repo · nếu không tìm thấy, sẽ đề xuất tìm kiếm chung
            </div>
          </div>
        </div>
      </div>

      {/* Context rail */}
      <aside
        className="rail-hide"
        style={{
          width: 300,
          flexShrink: 0,
          borderLeft: `1px solid ${C.line}`,
          background: "#121210",
          overflowY: "auto",
          padding: "24px 20px",
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 10,
            color: C.ink3,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Đang học
        </div>
        <div
          style={{
            background: C.bg3,
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: 10,
            padding: 15,
            marginBottom: 24,
          }}
        >
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.blue, marginBottom: 4 }}>
            Module 2 / 6
          </div>
          <div style={{ fontFamily: F.serif, fontSize: 17, color: C.ink, marginBottom: 10 }}>
            Gradient Descent
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
              style={{ width: "38%", height: "100%", background: C.green }}
            />
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.ink3, marginTop: 7 }}>
            38% learning path hoàn thành
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 10,
              color: C.ink3,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Flashcards
          </div>
          <button
            onClick={() => {
              setFcIndex(0);
              setFcFlip(false);
              setReviewMode(true);
            }}
            className="hover-green-sm"
            style={{
              fontFamily: F.mono,
              fontSize: 10,
              color: C.green,
              background: "none",
              border: "1px solid rgba(74,222,128,.25)",
              borderRadius: 4,
              padding: "3px 9px",
              cursor: "pointer",
            }}
          >
            Ôn ngay →
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {flashcards.map((f, i) => (
            <div
              key={i}
              style={{
                background: C.bg2,
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 9,
                padding: "12px 13px",
              }}
            >
              <div
                style={{
                  fontSize: 12.5,
                  color: C.ink,
                  lineHeight: 1.5,
                  marginBottom: 7,
                }}
              >
                {f.q}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: F.mono,
                    fontSize: 9.5,
                    color: C.ink3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 150,
                  }}
                >
                  {f.src}
                </span>
                <span style={{ fontFamily: F.mono, fontSize: 9.5, color: C.amber, flexShrink: 0 }}>
                  {f.due}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Flashcard review overlay */}
      {reviewMode && (
        <div
          onClick={() => setReviewMode(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(9,9,8,.82)",
            backdropFilter: "blur(6px)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            style={{ width: "100%", maxWidth: 520 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.teal }}>
                Ôn flashcard · {fcIndex + 1} / {flashcards.length}
              </span>
              <button
                onClick={() => setReviewMode(false)}
                style={{
                  fontFamily: F.mono,
                  fontSize: 11,
                  color: C.ink3,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ✕ Đóng
              </button>
            </div>
            <div
              onClick={() => setFcFlip((f) => !f)}
              style={{
                background: C.bg3,
                border: `1px solid ${C.line2}`,
                borderRadius: 16,
                padding: "48px 36px",
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {fcFlip ? (
                <>
                  <div
                    style={{
                      fontFamily: F.mono,
                      fontSize: 10,
                      color: C.green,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    Đáp án
                  </div>
                  <div style={{ fontSize: 18, lineHeight: 1.6, color: C.ink }}>
                    {fc.a}
                  </div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3, marginTop: 18 }}>
                    {fc.src}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      fontFamily: F.mono,
                      fontSize: 10,
                      color: C.teal,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    Câu hỏi · chạm để lật
                  </div>
                  <div style={{ fontFamily: F.serif, fontSize: 21, lineHeight: 1.5, color: C.ink }}>
                    {fc.q}
                  </div>
                </>
              )}
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 14,
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setFcFlip((f) => !f)}
                style={{
                  fontFamily: F.mono,
                  fontSize: 12,
                  color: C.ink2,
                  background: C.bg2,
                  border: `1px solid ${C.line2}`,
                  borderRadius: 8,
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Lật thẻ
              </button>
              <button
                onClick={() => {
                  setFcIndex((i) => (i + 1) % flashcards.length);
                  setFcFlip(false);
                }}
                className="hover-green-bright"
                style={{
                  fontFamily: F.mono,
                  fontSize: 12,
                  color: C.bg,
                  background: C.green,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  cursor: "pointer",
                }}
              >
                Thẻ tiếp →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
