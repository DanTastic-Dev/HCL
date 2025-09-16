import React, { useEffect, useState } from "react";

const cardStyle = {
    position: "relative",
    width: "300px",
    height: "180px",
    borderRadius: "12px",
    overflow: "hidden",
    color: "white",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer"
};

const overlayStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "12px",
    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
};

const labelStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    fontWeight: "bold",
    color: "#00FF88",
    zIndex: 2
};

const TopPerformers = ({ players }) => {
    const [topBatter, setTopBatter] = useState(null);
    const [topBowler, setTopBowler] = useState(null);
    const [topAllrounder, setTopAllrounder] = useState(null);

    useEffect(() => {
        if (!players || players.length === 0) return;

        const imageOf = (player) => localStorage.getItem(`player-image-${player._id}`) || "/default-avatar.png";

        const bestBatter = [...players].sort((a, b) => b.runs - a.runs)[0];
        const bestBowler = [...players].sort((a, b) => b.wickets - a.wickets)[0];
        const bestAllrounder = [...players]
            .filter(p => p.runs > 0 && p.wickets > 0)
            .sort((a, b) => (b.runs + b.wickets) - (a.runs + a.wickets))[0];

        setTopBatter({ ...bestBatter, image: imageOf(bestBatter) });
        setTopBowler({ ...bestBowler, image: imageOf(bestBowler) });
        setTopAllrounder({ ...bestAllrounder, image: imageOf(bestAllrounder) });
    }, [players]);

    const Card = ({ title, player, lines }) => (
        <div style={{ ...cardStyle, backgroundImage: `url(${player.image})` }}>
            <div style={labelStyle}>{title}</div>
            <div style={overlayStyle}>
                <h3 style={{ marginBottom: "4px", color: "#ffffff" }}>{player.name}</h3>
                {lines.map((line, i) => (
                    <p key={i} style={{ margin: "2px 0", fontSize: "14px" }}>{line}</p>
                ))}
            </div>
        </div>
    );

    if (!topBatter || !topBowler || !topAllrounder) return null;

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            padding: "2rem"
        }}>
            <div
                style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <Card
                    title="Top Batter"
                    player={topBatter}
                    lines={[
                        `Runs: ${topBatter.runs}`,
                        `Avg: ${topBatter.innings - topBatter.notOuts > 0
                            ? (topBatter.runs / (topBatter.innings - topBatter.notOuts)).toFixed(2)
                            : "-"
                        }`,
                        `SR: ${topBatter.ballsFaced > 0
                            ? ((topBatter.runs / topBatter.ballsFaced) * 100).toFixed(2)
                            : "-"
                        }`
                    ]}
                />
            </div>
            <div
                style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <Card
                    title="Top Bowler"
                    player={topBowler}
                    lines={[
                        `Wickets: ${topBowler.wickets}`,
                        `Econ: ${topBowler.overs > 0
                            ? (topBowler.runsGiven / topBowler.overs).toFixed(2)
                            : "-"
                        }`,
                        `Avg: ${topBowler.wickets > 0
                            ? (topBowler.runsGiven / topBowler.wickets).toFixed(2)
                            : "-"
                        }`
                    ]}
                />
            </div>
            <div
                style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <Card
                    title="Top Allrounder"
                    player={topAllrounder}
                    lines={[
                        `Runs: ${topAllrounder.runs}`,
                        `Wickets: ${topAllrounder.wickets}`
                    ]}
                />
            </div>
        </div>
    );
};

export default TopPerformers;
