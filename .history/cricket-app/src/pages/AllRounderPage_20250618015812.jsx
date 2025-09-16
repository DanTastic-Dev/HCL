import { useState,useEffect } from "react";

const AllRounderPage = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/players')
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.error('Error fetching players:', err));
  }, []);

  const bestAllrounder = [...players]
    .filter(p => p.runs > 0 && p.wickets >= 6)
    .sort((a, b) => {
      const calcScore = (p) => {
        const batAvg = p.innings - p.notOuts > 0 ? p.runs / (p.innings - p.notOuts) : 0;
        const strikeRate = p.ballsFaced > 0 ? (p.runs / p.ballsFaced) * 100 : 0;
        const batScore = batAvg * 0.8 + strikeRate * 0.4 + p.runs * 0.1;

        const economy = p.overs > 0 ? p.runsGiven / p.overs : 0;
        const bowlScore = p.wickets * 6.0 - economy * 1.7;

        return batScore + bowlScore;
      };

      return calcScore(b) - calcScore(a);
    })[0];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🏅 Best Allrounder</h1>
      {bestAllrounder ? (
        <div className="bg-white shadow-md rounded p-4 max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-2">{bestAllrounder.name}</h2>
          <p>Runs: {bestAllrounder.runs}, Wickets: {bestAllrounder.wickets}</p>
          {/* Add more stats here if you like */}
        </div>
      ) : (
        <p className="text-center">No eligible allrounder found.</p>
      )}
    </div>
  );
};

export default AllRounderPage;
