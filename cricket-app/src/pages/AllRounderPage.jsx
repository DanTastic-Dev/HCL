import React, { useEffect, useState } from 'react';

const AllRounderPage = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await fetch('https://hcl-production.up.railway.app/players');
                const data = await res.json();
                setPlayers(data);
            } catch (err) {
                console.error('Error fetching players:', err);
            }
        };
        fetchPlayers();
    }, []);

    const eligibleAllrounders = players.filter(p => p.runs >= 0 && p.wickets >= 6);

    const sorted = [...eligibleAllrounders].sort((a, b) => {
        const getScore = (p) => {
            const batAvg = p.innings - p.notOuts > 0 ? p.runs / (p.innings - p.notOuts) : 0;
            const strikeRate = p.ballsFaced > 0 ? (p.runs / p.ballsFaced) * 100 : 0;
            const batScore = batAvg * 0.7 + strikeRate * 0.6 + p.runs * 0.08;

            const economy = p.overs > 0 ? p.runsGiven / p.overs : 0;
            const bowlScore = p.wickets * 5.5 - economy * 1.2;

            return batScore + bowlScore;
        };

        return getScore(b) - getScore(a);
    });

    return (
        <div style={{ padding: '20px' }}>
            <h2>Top All-Rounders</h2>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Runs</th>
                        <th>Wickets</th>
                        <th>Bat Avg</th>
                        <th>Strike Rate</th>
                        <th>Economy</th>
                        <th>All-Rounder Score</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map(p => {
                        const batAvg = p.innings - p.notOuts > 0 ? p.runs / (p.innings - p.notOuts) : 0;
                        const strikeRate = p.ballsFaced > 0 ? (p.runs / p.ballsFaced) * 100 : 0;
                        const economy = p.overs > 0 ? p.runsGiven / p.overs : 0;
                        const score = batAvg * 0.7 + strikeRate * 0.6 + p.runs * 0.08 + (p.wickets * 5.5 - economy * 1.2);

                        return (
                            <tr key={p._id}>
                                <td>{p.name}</td>
                                <td>{p.runs}</td>
                                <td>{p.wickets}</td>
                                <td>{batAvg.toFixed(2)}</td>
                                <td>{strikeRate.toFixed(2)}</td>
                                <td>{economy.toFixed(2)}</td>
                                <td>{score.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AllRounderPage;

// import { useState,useEffect } from "react";

// const AllRounderPage = () => {
//   const [players, setPlayers] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/players')
//       .then(res => res.json())
//       .then(data => setPlayers(data))
//       .catch(err => console.error('Error fetching players:', err));
//   }, []);

//   const bestAllrounder = [...players]
//     .filter(p => p.runs > 0 && p.wickets >= 6)
//     .sort((a, b) => {
//       const calcScore = (p) => {
//         const batAvg = p.innings - p.notOuts > 0 ? p.runs / (p.innings - p.notOuts) : 0;
//         const strikeRate = p.ballsFaced > 0 ? (p.runs / p.ballsFaced) * 100 : 0;
//         const batScore = batAvg * 0.8 + strikeRate * 0.4 + p.runs * 0.1;

//         const economy = p.overs > 0 ? p.runsGiven / p.overs : 0;
//         const bowlScore = p.wickets * 6.0 - economy * 1.7;

//         return batScore + bowlScore;
//       };

//       return calcScore(b) - calcScore(a);
//     })[0];

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-4 text-center">🏅 Best Allrounder</h1>
//       {bestAllrounder ? (
//         <div className="bg-white shadow-md rounded p-4 max-w-xl mx-auto text-center">
//           <h2 className="text-2xl font-semibold mb-2">{bestAllrounder.name}</h2>
//           <p>Runs: {bestAllrounder.runs}, Wickets: {bestAllrounder.wickets}</p>
//           {/* Add more stats here if you like */}
//         </div>
//       ) : (
//         <p className="text-center">No eligible allrounder found.</p>
//       )}
//     </div>
//   );
// };

// export default AllRounderPage;

