import React, { useState, useEffect } from "react";

const PlayerCard = ({ player, expandedId, setExpandedId }) => {
    const [image, setImage] = useState(null);
    const isExpanded = expandedId === player._id;
    const localKey = `player-image-${player._id}`;

    useEffect(() => {
        const savedImage = localStorage.getItem(localKey);
        if (savedImage) setImage(savedImage);
    }, [localKey]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setImage(base64Image);
                localStorage.setItem(localKey, base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleStats = () => {
        setExpandedId(isExpanded ? null : player._id);
    };

    return (
        <div
            style={{
                border: "1px solid #00FF88",
                borderRadius: "12px",
                padding: "1rem",
                textAlign: "center",
                backgroundColor: "#1e1e1e",
                color: "white",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 4px 8px rgba(0, 255, 136, 0.1)",
                cursor: "pointer",
                height: isExpanded ? "auto" : "280px", // 👈 fixed height for non-expanded
                overflow: "hidden"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 255, 136, 0.4)";
                e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 255, 136, 0.1)";
                e.currentTarget.style.transform = "scale(1)";
            }}
        >
            <img
                src={image || "/default-avatar.png"}
                alt="Player"
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "0.5rem"
                }}
            />
            <h3 style={{ color: "#00FF88", marginBottom: "0.5rem" }}>{player.name}</h3>

            <button
                onClick={toggleStats}
                style={{
                    backgroundColor: '#00FF88',
                    color: '#1c1c1c',
                    fontStyle: 'italic',
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background 0.3s'
                }}
            >
                {isExpanded ? "Hide Stats" : "Show Stats"}
            </button>

            {isExpanded && (
                <div style={{ marginTop: "1rem", textAlign: "left" }}>
                    <p><strong>Season:</strong> {player.season}</p>
                    <p><strong>Innings:</strong> {player.innings}</p>
                    <p><strong>Not Outs:</strong> {player.notOuts}</p>
                    <p><strong>Runs:</strong> {player.runs}</p>
                    <p><strong>Balls Faced:</strong> {player.ballsFaced}</p>
                    <p><strong>Wickets:</strong> {player.wickets}</p>
                    <p><strong>Runs Given:</strong> {player.runsGiven}</p>
                    <p><strong>Overs:</strong> {player.overs}</p>
                    <p><strong>Bat Avg:</strong> {player.innings - player.notOuts > 0 ? (player.runs / (player.innings - player.notOuts)).toFixed(2) : "-"}</p>
                    <p><strong>Economy:</strong> {player.overs > 0 ? (player.runsGiven / player.overs).toFixed(2) : "-"}</p>

                    <div style={{ marginTop: "1rem" }}>
                        <label style={{ color: "#00FF88" }}>Upload Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ color: "white" }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayerCard;
