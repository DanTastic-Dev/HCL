import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPlayerPage from "./pages/AddPlayerPage";
import ViewPlayers from "./pages/ViewPlayers";
import LeaderboardPage from "./pages/LeaderboardPage";
import Navbar from "./components/Navbar"; // ✅ Import navbar

const App = () => {
    return (
        <Router>
            {/* Global dark background wrapper */}
            <div style={{
                backgroundColor: "#0D1117",
                color: "#FFFFFF",
                minHeight: "100vh"
            }}>
                <Navbar /> {/* ✅ Show navbar at top of all pages */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add" element={<AddPlayer />} />
                    <Route path="/players" element={<ViewPlayers />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
