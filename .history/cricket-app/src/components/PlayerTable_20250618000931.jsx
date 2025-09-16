import React from 'react';
import EditablePlayerRow from './EditablePlayerRow';

const PlayerTable = ({ players, onEdit }) => {
    return (
        <table border="1" cellPadding="5" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Season</th>
                    <th>Innings</th>
                    <th>Not Outs</th>
                    <th>Runs</th>
                    <th>Balls Faced</th>
                    <th>Wickets</th>
                    <th>Runs Given</th>
                    <th>Overs</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {players.map(player => (
                    <EditablePlayerRow key={player._id} player={player} onEdit={onEdit} />
                ))}
            </tbody>
        </table>
    );
};

export default PlayerTable;
