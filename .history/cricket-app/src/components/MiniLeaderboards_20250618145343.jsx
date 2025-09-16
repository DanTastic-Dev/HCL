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

  const cardStyle = {
    width: "320px",
    borderRadius: "12px",
    backgroundColor: "#161B22",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const cardHoverStyle = {
    transform: "scale(1.03)",
    boxShadow: "0 0 15px rgba(0, 255, 136, 0.5)",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap",
        padding: "2rem",
      }}
    >
      {[{ title: "Top Batters", data: topBatters, keys: ["runs", "Avg"] }, { title: "Top Bowlers", data: topBowlers, keys: ["wickets", "Econ"] }]
        .map((section, i) => (
          <div
            key={i}
            style={cardStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "monospace" }}>
              <thead>
                <tr>
                  <th
                    colSpan="3"
                    style={{
                      backgroundColor: "#00FF88",
                      color: "#000",
                      padding: "12px",
                      fontSize: "18px",
                      textAlign: "center",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                    }}
                  >
                    {section.title}
                  </th>
                </tr>
                <tr style={{ backgroundColor: "#0D1117", color: "#ccc" }}>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>Player</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>{section.keys[0]}</th>
                  <th style={{ padding: "10px 12px", textAlign: "left" }}>{section.keys[1]}</th>
                </tr>
              </thead>
              <tbody>
                {section.data.map((player, idx) => (
                  <tr
                    key={player._id}
                    style={{
                      borderBottom: "1px solid #2D333B",
                      color: "#eee",
                      backgroundColor: idx % 2 === 0 ? "#161B22" : "#1C222A",
                    }}
                  >
                    <td style={{ padding: "10px 12px" }}>
                      {idx + 1}. {player.name}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {section.keys[0] === "runs" ? player.runs : player.wickets}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
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
a