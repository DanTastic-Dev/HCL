// src/pages/ViewPlayersPage.jsx
import React, { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard";

const ViewPlayersPage = () => {
    const [players, setPlayers] = useState([]);
    const [expandedId, setExpandedId] = useState(null); // 👈 Only one expanded card

    useEffect(() => {
        fetch("http://localhost:5000/players")
            .then(res => res.json())
            .then(data => setPlayers(data))
            .catch(err => console.error("Failed to load players", err));
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ color: '#00FF88', marginBottom: '1.5rem' }}>Player Gallery</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem"
            }}>
                {players.map(player => (
                    <PlayerCard
                        key={player._id}
                        player={player}
                        expandedId={expandedId}
                        setExpandedId={setExpandedId}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViewPlayersPage;
