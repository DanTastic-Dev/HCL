import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPlayerPage from "./pages/AddPlayerPage";
import ViewPlayersPage from "./pages/ViewPlayersPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import EditPlayerPage from "./pages/EditPlayerPage"; // ✅ Add this line
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <Router>
            <div style={{
                backgroundColor: "#0D1117",
                color: "#FFFFFF",
                minHeight: "100vh"
            }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add" element={<AddPlayerPage />} />
                    <Route path="/players" element={<ViewPlayersPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/edit/:id" element={<EditPlayerPage />} /> 
                </Routes>
            </div>
        </Router>
    );
};

export default App;
