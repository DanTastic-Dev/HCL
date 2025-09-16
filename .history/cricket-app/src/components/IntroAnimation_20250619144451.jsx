import React, { useEffect, useState, useMemo } from "react";
import "./IntroAnimation.css";

const IntroAnimation = ({ topBatter, topBowler, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // 🛡️ If required data is missing, skip the intro
  useEffect(() => {
    if (!topBatter || !topBowler) {
      console.warn("Missing topBatter or topBowler, skipping intro animation");
      onComplete?.();
    }
  }, [topBatter, topBowler, onComplete]);

  const batterAvg =
    topBatter?.innings - topBatter?.notOuts > 0
      ? (topBatter.runs / (topBatter.innings - topBatter.notOuts)).toFixed(2)
      : "-";

  const batterSR =
    topBatter?.ballsFaced > 0
      ? ((topBatter.runs / topBatter.ballsFaced) * 100).toFixed(2)
      : "-";

  const bowlerEco =
    topBowler?.overs > 0
      ? (topBowler.runsGiven / topBowler.overs).toFixed(2)
      : "-";

  const steps = useMemo(() => {
    if (!topBatter || !topBowler) return [];

    return [
      `🏏 ${topBatter.runs} runs... ${batterAvg} avg... ${batterSR} SR...`,
      `🔥 Top Run Scr`,
      `${topBatter.name}`,
      `🎯 ${topBowler.wickets} wickets... ${bowlerEco} economy...`,
      `🔥 Top Wicket Taker`,
      `${topBowler.name}`,
    ];
  }, [topBatter, topBowler, batterAvg, batterSR, bowlerEco]);

  const isNameStep = stepIndex === 2 || stepIndex === 5;
  const isTitleStep = stepIndex === 1 || stepIndex === 4;

  useEffect(() => {
    if (!steps.length || !isTyping) return;

    const currentText = steps[stepIndex];
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      setTimeout(() => {
        setCharIndex(0);
        setDisplayText("");
        if (stepIndex < steps.length - 1) {
          setStepIndex((prev) => prev + 1);
          setIsTyping(true);
        } else {
          setTimeout(() => onComplete?.(), 800);
        }
      }, 1200);
    }
  }, [charIndex, isTyping, stepIndex, steps, onComplete]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#0D1117",
        color: "#00FF88",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isNameStep ? "3rem" : "2.3rem",
        fontWeight: "bold",
        fontFamily: "monospace",
        letterSpacing: "1.5px",
        textAlign: "center",
        padding: "0 2rem",
        transition: "font-size 0.3s ease-in-out",
      }}
    >
      <span className={isNameStep ? "reveal-name" : isTitleStep ? "reveal-title" : ""}>
        {steps.length > 0 ? displayText : ""}
      </span>
    </div>
  );
};

export default IntroAnimation;
