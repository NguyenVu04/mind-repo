export type Screen =
  | "tutor"
  | "dashboard"
  | "discover"
  | "repo"
  | "reader"
  | "builder"
  | "learn"
  | "reviews"
  | "pricing"
  | "onboarding";

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
  cites: { doc: string; loc: string }[];
  typing?: boolean;
  fc?: { q: string; a: string };
  fcSaved?: boolean;
}

export interface Flashcard {
  q: string;
  a: string;
  src: string;
  due: string;
}

export interface PathItem {
  id: number;
  t: string;
  meta: string;
  tag: string;
  done: boolean;
  current?: boolean;
}

export interface NavItem {
  key: Screen;
  label: string;
  accent?: string;
}
