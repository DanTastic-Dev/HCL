import React, { useEffect, useState } from "react";
import TopPerformers from "../components/TopPerformers";
import MiniLeaderboards from "../components/MiniLeaderboards";
import IntroAnimation from "../components/IntroAnimation";

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [topBatter, setTopBatter] = useState(null);
  const [topBowler, setTopBowler] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/players")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);

        // Compute top batter and bowler
        const sortedBatters = [...data].sort((a, b) => b.runs - a.runs);
        const sortedBowlers = [...data].sort((a, b) => b.wickets - a.wickets);

        setTopBatter(sortedBatters[0]);
        setTopBowler(sortedBowlers[0]);
      });
  }, []);

  const handleIntroComplete = () => {
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
