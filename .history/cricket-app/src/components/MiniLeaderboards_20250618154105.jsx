import React from "react";

const MiniLeaderboards = ({ players }) => {
    const topBatters = [...players].sort((a, b) => b.runs - a.runs).slice(0, 5);
    const topBowlers = [...players].sort((a, b) => b.wickets - a.wickets).slice(0, 5);

    const getBattingAverage = (player) =>
        player.innings - player.notOuts > 0
            ? (player.runs / (player.innings - player.notOuts)).toFixed(2)
            : "-";

    const getEconomy = (player) =>
        player.overs > 0
            ? (player.runsGiven / player.overs).toFixed(2)
            : "-";

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            padding: "2rem",
            backgroundColor: "#0D1117",
            color: "#d1d5db" // updated text color (soft light grey)
        }}>
            {[{ title: "Top Batters", data: topBatters, keys: ["runs", "Avg"] }, { title: "Top Bowlers", data: topBowlers, keys: ["wickets", "Econ"] }]
                .map((section, i) => (
                    <div
                        key={i}
                        style={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            borderRadius: "10px",
                            backgroundColor: "#1C222A", // lighter dark
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                            overflow: "hidden",
                            width: "300px",
                            outline: "none",            // ✅ remove default outlines
                            border: "none",             // ✅ remove table outline
                            borderWidth: 0
                        }}
                         onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  }}
>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px", color: "#d1d5db" }}>
                            <thead style={{ backgroundColor: "#1f2733" }}>
                                <tr>
                                    <th colSpan="3" style={{
                                        backgroundColor: "#00FF88",
                                        color: "#000",
                                        padding: "9px",
                                        fontSize: "17px",
                                        fontWeight: "bold",
                                        textAlign: "center"
                                    }}>
                                        {section.title}
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{
                                        padding: "7px 10px",
                                        textAlign: "left",
                                        color: "#d1d5db",
                                        backgroundColor: "#1f2733",
                                        borderBottom: "1px solid #2D333B"
                                    }}>Player</th>
                                    <th style={{
                                        padding: "7px 10px",
                                        textAlign: "left",
                                        color: "#d1d5db",
                                        backgroundColor: "#1f2733",
                                        borderBottom: "1px solid #2D333B"
                                    }}>{section.keys[0]}</th>
                                    <th style={{
                                        padding: "7px 10px",
                                        textAlign: "left",
                                        color: "#d1d5db",
                                        backgroundColor: "#1f2733",
                                        borderBottom: "1px solid #2D333B"
                                    }}>{section.keys[1]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {section.data.map((player, idx) => (
                                    <tr key={player._id} style={{ borderBottom: "1px solid #1a1a1a" }}>
                                        <td style={{ padding: "7px 10px" }}>{idx + 1}. {player.name}</td>
                                        <td style={{ padding: "7px 10px" }}>
                                            {section.keys[0] === "runs" ? player.runs : player.wickets}
                                        </td>
                                        <td style={{ padding: "7px 10px" }}>
                                            {section.keys[1] === "Avg"
                                                ? getBattingAverage(player)
                                                : getEconomy(player)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
        </div>
    );
};

export default MiniLeaderboards;
