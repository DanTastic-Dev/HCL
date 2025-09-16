import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PlayerTable = ({ players, setPlayers }) => {
    const navigate = useNavigate();
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const PASSWORD = "cricket123";

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

    const handleEdit = (id) => {
        if (isLocked) {
            alert("Too many failed attempts. Please wait 10 seconds.");
            return;
        }

        const input = prompt("Enter admin password:");

        if (input === PASSWORD) {
            setFailedAttempts(0);
            navigate(`/edit/${id}`);
        } else {
            const attempts = failedAttempts + 1;
            setFailedAttempts(attempts);
            alert(`Incorrect password. Attempt ${attempts}/5`);

            if (attempts >= 5) {
                setIsLocked(true);
                setTimeout(() => {
                    setIsLocked(false);
                    setFailedAttempts(0);
                }, 10000);
            }
        }
    };

    return (
        <div style={{
            padding: "20px",
            background: "linear-gradient(to bottom right, #1a1a1a, #0f0f0f)",
            color: "white",
            borderRadius: "16px",
            boxShadow: "0 0 20px rgba(0,255,136,0.05)",
            marginTop: "20px",
            outline: "none",
            border: "none"
        }}>
            <div style={{ overflowX: "auto" }}>
                <table style={{
                    width: "90%",
                    margin: "0 auto",
                    borderCollapse: "collapse",
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#181818",
                    outline: "none",
                    border: "none",
                    boxShadow: "0 0 10px rgba(0, 255, 136, 0.05)"
                }}>
                    <thead>
                        <tr>
                            {["Name", "Season", "Innings", "Not Outs", "Runs", "Balls Faced", "Wickets", "Runs Given", "Overs", "Strike Rate", "Bat Avg", "Bowl Avg", "Economy", "Actions"].map((h, i) => (
                                <th key={i} style={{
                                    padding: "14px",
                                    color: "#00FF88",
                                    fontSize: "12px",
                                    textTransform: "uppercase",
                                    backgroundColor: "#1e1e1e",
                                    letterSpacing: "1px",
                                    fontWeight: "600",
                                    borderBottom: "1px solid rgba(0,255,136,0.1)"
                                }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((p, index) => (
                            <tr
                                key={p._id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#121212" : "#101010",
                                    textAlign: "center",
                                    transition: "background 0.3s ease"
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1c1c1c"}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#121212" : "#101010"}
                            >
                                <td>{p.name}</td>
                                <td>{p.season}</td>
                                <td>{p.innings}</td>
                                <td>{p.notOuts}</td>
                                <td>{p.runs}</td>
                                <td>{p.ballsFaced}</td>
                                <td>{p.wickets}</td>
                                <td>{p.runsGiven}</td>
                                <td>{p.overs}</td>
                                <td>{p.runs && p.ballsFaced ? ((p.runs / p.ballsFaced) * 100).toFixed(2) : "-"}</td>
                                <td>{p.runs && p.innings > p.notOuts ? (p.runs / (p.innings - p.notOuts)).toFixed(2) : "-"}</td>
                                <td>{p.wickets > 0 ? (p.runsGiven / p.wickets).toFixed(2) : "-"}</td>
                                <td>{p.overs > 0 ? (p.runsGiven / p.overs).toFixed(2) : "-"}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(p._id)}
                                        style={{
                                            backgroundColor: "#00FF88",
                                            color: "#0f0f0f",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            marginRight: "6px",
                                            fontWeight: "600",
                                            fontSize: "12px"
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        style={{
                                            backgroundColor: "#ff4d4d",
                                            color: "#fff",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                            fontSize: "12px"
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
        </div>
    );
};

export default PlayerTable;
