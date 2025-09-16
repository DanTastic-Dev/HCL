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
        <div style={styles.wrapper}>
            <h2 style={styles.heading}>Leaderboard</h2>

            <div style={styles.toggleWrapper}>
                <button
                    onClick={() => setShowBatting(true)}
                    style={{
                        ...styles.toggleButton,
                        backgroundColor: showBatting ? "#00FF88" : "#333",
                        color: showBatting ? "#000" : "#ccc"
                    }}
                >
                    Batting
                </button>
                <button
                    onClick={() => setShowBatting(false)}
                    style={{
                        ...styles.toggleButton,
                        backgroundColor: !showBatting ? "#00FF88" : "#333",
                        color: !showBatting ? "#000" : "#ccc"
                    }}
                >
                    Bowling
                </button>
            </div>

            <input
                type="text"
                placeholder="Search player..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
            />

            <table style={styles.table}>
                <thead>
    <tr style={styles.headerRow}>

                        <th style={styles.th}>Name</th>
                        {showBatting ? (
                            <>
                                <th style={styles.th}>Runs</th>
                                <th style={styles.th}>Average</th>
                                <th style={styles.th}>Strike Rate</th>
                            </>
                        ) : (
                            <>
                                <th style={styles.th}>Wickets</th>
                                <th style={styles.th}>Economy</th>
                                <th style={styles.th}>Bowling Average</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredPlayers.map((p, index) => (
                        <tr
                            key={p._id}
                            style={{
                                ...styles.tr,
                                backgroundColor: index % 2 === 0 ? "#1a1a1a" : "#121212"
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1e1e1e"}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#1a1a1a" : "#121212"}
                        >
                            <td style={styles.td}>{p.name}</td>
                            {showBatting ? (
                                <>
                                    <td style={styles.td}>{p.runs}</td>
                                    <td style={styles.td}>
                                        {p.innings > p.notOuts
                                            ? (p.runs / (p.innings - p.notOuts)).toFixed(2)
                                            : "-"}
                                    </td>
                                    <td style={styles.td}>
                                        {p.ballsFaced > 0
                                            ? ((p.runs / p.ballsFaced) * 100).toFixed(2)
                                            : "-"}
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td style={styles.td}>{p.wickets}</td>
                                    <td style={styles.td}>
                                        {p.overs > 0
                                            ? (p.runsGiven / p.overs).toFixed(2)
                                            : "-"}
                                    </td>
                                    <td style={styles.td}>
                                        {p.wickets > 0
                                            ? (p.runsGiven / p.wickets).toFixed(2)
                                            : "-"}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    wrapper: {
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '2rem',
        background: "linear-gradient(to bottom right, #1a1a1a, #0f0f0f)",
        borderRadius: '16px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 0 20px rgba(0,255,136,0.05)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '2rem',
        color: '#00FF88'
    },
    headerRow: {
    backgroundColor: '#1e1e1e' // or any dark color you prefer
},
    toggleWrapper: {
        textAlign: 'center',
        marginBottom: '1rem'
    },
    toggleButton: {
        padding: '0.6rem 1.2rem',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginRight: '0.5rem',
        fontWeight: 'bold',
        transition: 'background 0.3s ease',
        outline: 'none'
    },
    searchInput: {
        display: 'block',
        margin: '0 auto 1.5rem auto',
        padding: '0.5rem',
        fontSize: '1rem',
        width: '60%',
        border: '1px solid #00FF88',
        borderRadius: '4px',
        backgroundColor: '#2a2a2a',
        color: '#00FF88',
        outline: 'none'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#2a2a2a',
        borderRadius: '10px',
        overflow: 'hidden',
        outline: 'none',
        border: 'none'
    },
    th: {
        borderBottom: '2px solid #00FF88',
        padding: '12px',
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#00FF88',
        fontSize: '14px',
        textTransform: 'uppercase'
    },
    td: {
        borderBottom: '1px solid #444',
        padding: '12px',
        color: 'white',
        fontSize: '14px'
    },
    tr: {
        transition: 'background-color 0.2s ease'
    }
};

export default LeaderboardPage;
