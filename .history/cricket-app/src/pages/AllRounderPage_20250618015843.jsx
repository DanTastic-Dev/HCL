import React, { useEffect, useState } from 'react';

const AllRounderPage = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await fetch('http://localhost:5000/players');
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


