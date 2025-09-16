import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPlayerPage from './pages/AddPlayerPage';
import ViewPlayersPage from './pages/ViewPlayersPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AllRounderPage from './pages/AllRounderPage';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">Add Player</Link></li>
          <li><Link to="/view">View Players</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/allrounder">Allrounders</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPlayerPage />} />
        <Route path="/view" element={<ViewPlayersPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/allrounder" element={<AllrounderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
