"use client";

import { useState, useRef } from "react";
import { Screen } from "../../types";
import { C, F } from "../../lib/design";

interface Props {
  navigate: (s: Screen) => void;
}

const DOMAINS = [
  "machine-learning",
  "deep-learning",
  "statistics",
  "physics",
  "medicine",
  "law",
  "history",
  "philosophy",
  "biology",
  "economics",
];

type Avail = "idle" | "checking" | "ok" | "taken";

const TAKEN = new Set(["admin", "andrew", "mindrep", "test"]);

export default function Onboarding({ navigate }: Props) {
  const [username, setUsername] = useState("");
  const [avail, setAvail] = useState<Avail>("idle");
  const [domains, setDomains] = useState<string[]>(["machine-learning"]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setUsername(v);
    setAvail(v.length < 3 ? "idle" : "checking");
    if (timerRef.current) clearTimeout(timerRef.current);
    if (v.length >= 3) {
      timerRef.current = setTimeout(() => {
        setAvail(TAKEN.has(v) ? "taken" : "ok");
      }, 650);
    }
  };

  const toggleDomain = (d: string) => {
    setDomains((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const hintText =
    avail === "ok"
      ? "✓ username khả dụng"
      : avail === "taken"
      ? "✕ username đã có người dùng"
      : avail === "checking"
      ? "đang kiểm tra…"
      : "3–32 ký tự · a-z 0-9 -";

  const hintColor =
    avail === "ok" ? C.green : avail === "taken" ? C.red : C.ink3;

  const borderColor =
    avail === "ok" ? C.green : avail === "taken" ? C.red : C.line2;

  const ready = avail === "ok" && domains.length > 0;

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
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
              fontSize: 15,
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
            background: C.bg2,
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: 16,
            padding: 34,
          }}
        >
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink3, marginBottom: 6 }}>
            Bước 1 / 1 · gần xong rồi
          </div>
          <h1 style={{ fontFamily: F.serif, fontSize: 25, color: C.ink, marginBottom: 6 }}>
            Thiết lập hồ sơ
          </h1>
          <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.6, marginBottom: 26 }}>
            Chọn username (dùng trong URL repo của bạn) và lĩnh vực quan tâm.
          </p>

          {/* Username */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                fontFamily: F.mono,
                fontSize: 11,
                color: C.ink3,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              Username
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: C.bg,
                border: `1px solid ${borderColor}`,
                borderRadius: 8,
                padding: "0 14px",
                transition: "border-color .15s",
              }}
            >
              <span style={{ fontFamily: F.mono, fontSize: 14, color: C.ink3 }}>
                mindrep.io/@
              </span>
              <input
                value={username}
                onChange={handleUsername}
                placeholder="username"
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontFamily: F.mono,
                  fontSize: 14,
                  color: C.ink,
                  padding: "13px 4px",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: F.mono,
                fontSize: 11,
                color: hintColor,
                marginTop: 8,
              }}
            >
              {hintText}
            </div>
          </div>

          {/* Domain chips */}
          <div style={{ marginBottom: 28 }}>
            <label
              style={{
                fontFamily: F.mono,
                fontSize: 11,
                color: C.ink3,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 10,
              }}
            >
              Lĩnh vực quan tâm
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {DOMAINS.map((d) => {
                const active = domains.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDomain(d)}
                    style={{
                      fontFamily: F.mono,
                      fontSize: 12,
                      padding: "7px 14px",
                      borderRadius: 6,
                      cursor: "pointer",
                      transition: "all .12s",
                      border: `1px solid ${active ? C.green : C.line2}`,
                      color: active ? C.green : C.ink2,
                      background: active ? "rgba(74,222,128,0.08)" : "transparent",
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => ready && navigate("dashboard")}
            className={ready ? "hover-green-bright" : ""}
            style={{
              width: "100%",
              fontFamily: F.mono,
              fontSize: 13,
              color: C.bg,
              background: ready ? C.green : C.bg4,
              border: "none",
              borderRadius: 9,
              padding: 14,
              cursor: ready ? "pointer" : "not-allowed",
              transition: "background .15s",
            }}
          >
            Hoàn tất & vào Dashboard →
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: F.mono,
            fontSize: 10,
            color: C.ink5,
            marginTop: 18,
          }}
        >
          Đăng nhập an toàn qua Auth0 · không lưu mật khẩu
        </div>
      </div>
    </div>
  );
}
