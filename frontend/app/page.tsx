"use client";

import { useState } from "react";
import { Screen } from "./types";
import { C } from "./lib/design";

import LeftRail from "./components/LeftRail";
import AiTutor from "./components/screens/AiTutor";
import Dashboard from "./components/screens/Dashboard";
import Discover from "./components/screens/Discover";
import RepoOverview from "./components/screens/RepoOverview";
import Reader from "./components/screens/Reader";
import PathBuilder from "./components/screens/PathBuilder";
import LearnerView from "./components/screens/LearnerView";
import Reviews from "./components/screens/Reviews";
import Pricing from "./components/screens/Pricing";
import Onboarding from "./components/screens/Onboarding";

export default function App() {
  const [screen, setScreen] = useState<Screen>("tutor");

  const showRail = screen !== "onboarding";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: C.bg,
      }}
    >
      {showRail && <LeftRail screen={screen} navigate={setScreen} />}

      <main
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {screen === "tutor" && <AiTutor navigate={setScreen} />}
        {screen === "dashboard" && <Dashboard navigate={setScreen} />}
        {screen === "discover" && <Discover navigate={setScreen} />}
        {screen === "repo" && <RepoOverview navigate={setScreen} />}
        {screen === "reader" && <Reader navigate={setScreen} />}
        {screen === "builder" && <PathBuilder navigate={setScreen} />}
        {screen === "learn" && <LearnerView navigate={setScreen} />}
        {screen === "reviews" && <Reviews navigate={setScreen} />}
        {screen === "pricing" && <Pricing navigate={setScreen} />}
        {screen === "onboarding" && <Onboarding navigate={setScreen} />}
      </main>
    </div>
  );
}
