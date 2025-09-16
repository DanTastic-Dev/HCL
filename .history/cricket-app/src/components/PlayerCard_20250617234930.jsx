import React from 'react';

const PlayerCard = ({ player, onClick }) => {
    return (
        <div className="player-card" onClick={() => onClick(player)}>
            <h4>{player.name}</h4>
            <p>Season: {player.season}</p>
            <p>Runs: {player.runs} | Wickets: {player.wickets}</p>
        </div>
    );
};

export default PlayerCard;
