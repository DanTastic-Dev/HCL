import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">🏏 Cricket Stats</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/add-player">Add Player</Link></li>
                <li><Link to="/view-players">View Players</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
