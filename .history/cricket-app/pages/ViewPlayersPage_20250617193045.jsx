// src/pages/ViewPlayersPage.jsx
import React, { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard";

const ViewPlayersPage = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/players")
            .then(res => res.json())
            .then(data => setPlayers(data))
            .catch(err => console.error("Failed to load players", err));
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ color: '#00FF88' }}>Player Gallery</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem"
            }}>
                {players.map(player => (
                    <PlayerCard key={player._id} player={player} />
                ))}
            </div>
        </div>
    );
};

export default ViewPlayersPage;
