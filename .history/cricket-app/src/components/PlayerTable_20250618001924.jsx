import React from "react";
import { Link } from 'react-router-dom';

const PlayerTable = ({ players, setPlayers }) => {

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this player?")) return;

        try {
            const response = await fetch(`http://localhost:5000/players/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setPlayers(prev => prev.filter(p => p._id !== id));
            } else {
                const errorText = await response.text();
                console.error("Failed to delete player:", errorText);
            }
        } catch (err) {
            console.error("Error deleting player:", err);
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#1e1e1e", color: "white" }}>
            <h2 style={{ color: "#00FF88", marginBottom: "20px" }}>Players</h2>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "1px solid #00FF88",
                    color: "white"
                }}
            >
                <thead style={{ backgroundColor: "#0e0e0e" }}>
                    <tr>
                        {[
                            "Name", "Season", "Innings", "Not Outs", "Runs", "Balls Faced",
                            "Wickets", "Runs Given", "Overs", "Strike Rate",
                            "Bat Avg", "Bowl Avg", "Economy", "Actions"
                        ].map((heading, i) => (
                            <th
                                key={i}
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #00FF88",
                                    color: "#00FF88"
                                }}
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {players.map((p) => (
                        <tr key={p._id} style={{ textAlign: "center", borderBottom: "1px solid #333" }}>
                            <td>{p.name}</td>
                            <td>{p.season}</td>
                            <td>{p.innings}</td>
                            <td>{p.notOuts}</td>
                            <td>{p.runs}</td>
                            <td>{p.ballsFaced}</td>
                            <td>{p.wickets}</td>
                            <td>{p.runsGiven}</td>
                            <td>{p.overs}</td>
                            <td>
                                {p.runs && p.ballsFaced
                                    ? ((p.runs / p.ballsFaced) * 100).toFixed(2)
                                    : "-"}
                            </td>
                            <td>
                                {p.runs && p.innings > p.notOuts
                                    ? (p.runs / (p.innings - p.notOuts)).toFixed(2)
                                    : "-"}
                            </td>
                            <td>
                                {p.wickets > 0
                                    ? (p.runsGiven / p.wickets).toFixed(2)
                                    : "-"}
                            </td>
                            <td>
                                {p.overs > 0
                                    ? (p.runsGiven / p.overs).toFixed(2)
                                    : "-"}
                            </td>
                            <td>
                                <Link to={`/edit/${p._id}`}>
                                    <button
                                        style={{
                                            backgroundColor: "#00FF88",
                                            color: "black",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            marginRight: "5px"
                                        }}
                                    >
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(p._id)}
                                    style={{
                                        backgroundColor: "#ff4d4d",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerTable;
