// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{
            backgroundColor: "#161B22",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #2D333B",
            position: "sticky",
            top: 0,
            zIndex: 1000
        }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#00FF88" }}>
                HCL
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
                <Link to="/" style={navLinkStyle}>Home</Link>
                <Link to="/players" style={navLinkStyle}>Players</Link>
                <Link to="/add" style={navLinkStyle}>Add Player</Link>
                <Link to="/leaderboard" style={navLinkStyle}>Leaderboard</Link>
            </div>
        </nav>
    );
};

const navLinkStyle = {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.3s",
};

export default Navbar;
