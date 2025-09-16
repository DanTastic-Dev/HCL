import React from 'react';

const MiniLeaderboard = ({ players, type }) => {
    const sorted = [...players].sort((a, b) =>
        type === 'batting' ? b.runs - a.runs : b.wickets - a.wickets
    ).slice(0, 3);

    return (
        <div className="mini-leaderboard">
            <h3>Top {type === 'batting' ? 'Run Scorers' : 'Wicket Takers'}</h3>
            <ul>
                {sorted.map((player, index) => (
                    <li key={player._id}>
                        #{index + 1} {player.name} - {type === 'batting' ? `${player.runs} runs` : `${player.wickets} wickets`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MiniLeaderboard;
