import React, { useEffect, useState } from "react";

const LeaderboardPage = () => {
    const [players, setPlayers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showBatting, setShowBatting] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await fetch("http://localhost:5000/players");
                const data = await res.json();
                setPlayers(data);
            } catch (err) {
                console.error("Error fetching players:", err);
            }
        };
        fetchPlayers();
    }, []);

    const filteredPlayers = players
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (showBatting) return b.runs - a.runs;
            else return b.wickets - a.wickets;
        });

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Leaderboard</h2>
            <div style={{ marginBottom: "10px" }}>
                <button onClick={() => setShowBatting(true)} style={{ marginRight: "10px" }}>
                    Batting
                </button>
                <button onClick={() => setShowBatting(false)}>Bowling</button>
            </div>

            <input
                type="text"
                placeholder="Search player..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: "6px", marginBottom: "20px", width: "200px" }}
            />

            <table border="1" cellPadding="5" style={{ margin: "auto", width: "80%" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        {showBatting ? (
                            <>
                                <th>Runs</th>
                                <th>Average</th>
                                <th>Strike Rate</th>
                            </>
                        ) : (
                            <>
                                <th>Wickets</th>
                                <th>Economy</th>
                                <th>Bowling Average</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredPlayers.map((p) => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            {showBatting ? (
                                <>
                                    <td>{p.runs}</td>
                                    <td>{p.innings > p.notOuts ? (p.runs / (p.innings - p.notOuts)).toFixed(2) : "-"}</td>
                                    <td>{p.ballsFaced > 0 ? ((p.runs / p.ballsFaced) * 100).toFixed(2) : "-"}</td>
                                </>
                            ) : (
                                <>
                                    <td>{p.wickets}</td>
                                    <td>{p.overs > 0 ? (p.runsGiven / p.overs).toFixed(2) : "-"}</td>
                                    <td>{p.wickets > 0 ? (p.runsGiven / p.wickets).toFixed(2) : "-"}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardPage;
