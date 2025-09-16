import React from "react";
import 'Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-semibold">Hostel Cricket League</h1>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-yellow-400 transition duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link to="/add" className="hover:text-yellow-400 transition duration-200">
            Add Player
          </Link>
        </li>
        <li>
          <Link to="/players" className="hover:text-yellow-400 transition duration-200">
            View Players
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" className="hover:text-yellow-400 transition duration-200">
            Leaderboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
