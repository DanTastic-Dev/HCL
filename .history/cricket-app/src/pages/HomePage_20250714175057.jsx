import React, { useEffect, useState } from "react";
import TopPerformers from "../components/TopPerformers";
import MiniLeaderboards from "../components/MiniLeaderboards";
import IntroAnimation from "../components/IntroAnimation";

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [showIntro, setShowIntro] = useState(false);
  const [topBatter, setTopBatter] = useState(null);
  const [topBowler, setTopBowler] = useState(null);

  useEffect(() => {
    const hasPlayedIntro = sessionStorage.getItem("hasPlayedIntro");

    fetch("http://:5000/players")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);

        const sortedBatters = [...data].sort((a, b) => b.runs - a.runs);
        const sortedBowlers = [...data].sort((a, b) => b.wickets - a.wickets);

        setTopBatter(sortedBatters[0]);
        setTopBowler(sortedBowlers[0]);

        // Only show intro if it hasn't already played
        if (!hasPlayedIntro) {
          setShowIntro(true);
        }
      });
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("hasPlayedIntro", "true");
    setShowIntro(false);
  };

  return (
    <div style={{ backgroundColor: "#0D1117", color: "#FFFFFF", minHeight: "100vh" }}>
      {showIntro && topBatter && topBowler ? (
        <IntroAnimation
          topBatter={topBatter}
          topBowler={topBowler}
          onComplete={handleIntroComplete}
        />
      ) : (
        <>
          <TopPerformers players={players} />
          <MiniLeaderboards players={players} />
        </>
      )}
    </div>
  );
};

export default HomePage;
