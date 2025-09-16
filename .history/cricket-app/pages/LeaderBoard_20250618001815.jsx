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
                        backgroundColor: showBatting ? '#00FF88' : '#007bff'
                    }}
                >
                    Batting
                </button>
                <button
                    onClick={() => setShowBatting(false)}
                    style={{
                        ...styles.toggleButton,
                        backgroundColor: !showBatting ? '#00FF88' : '#007bff'
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
                    <tr>
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
                    {filteredPlayers.map((p) => (
                        <tr key={p._id}>
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
        backgroundColor: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '8px',
        color: '#00FF88',
        fontFamily: 'Arial, sans-serif'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '2rem'
    },
    toggleWrapper: {
        textAlign: 'center',
        marginBottom: '1rem'
    },
    toggleButton: {
        padding: '0.6rem 1.2rem',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '0.5rem',
        color: 'white'
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
        color: '#00FF88'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#2a2a2a',
        color: '#00FF88'
    },
    th: {
        borderBottom: '2px solid #00FF88',
        padding: '10px',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    td: {
        borderBottom: '1px solid #444',
        padding: '10px'
    }
};

export default LeaderboardPage;
