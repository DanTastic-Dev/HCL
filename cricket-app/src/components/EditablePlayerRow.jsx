import React, { useState } from 'react';

const EditablePlayerRow = ({ player, onEdit }) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedPlayer, setUpdatedPlayer] = useState(player);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPlayer(prev => ({
            ...prev,
            [name]: name === "overs" ? parseFloat(value) : parseInt(value) || value
        }));
    };

    const handleSave = () => {
        onEdit(updatedPlayer);
        setEditMode(false);
    };

    return (
        <tr>
            {editMode ? (
                <>
                    <td><input name="name" value={updatedPlayer.name} onChange={handleChange} /></td>
                    <td><input name="season" value={updatedPlayer.season} onChange={handleChange} /></td>
                    <td><input type="number" name="innings" value={updatedPlayer.innings} onChange={handleChange} /></td>
                    <td><input type="number" name="notOuts" value={updatedPlayer.notOuts} onChange={handleChange} /></td>
                    <td><input type="number" name="runs" value={updatedPlayer.runs} onChange={handleChange} /></td>
                    <td><input type="number" name="ballsFaced" value={updatedPlayer.ballsFaced} onChange={handleChange} /></td>
                    <td><input type="number" name="wickets" value={updatedPlayer.wickets} onChange={handleChange} /></td>
                    <td><input type="number" name="runsGiven" value={updatedPlayer.runsGiven} onChange={handleChange} /></td>
                    <td><input type="number" step="0.1" name="overs" value={updatedPlayer.overs} onChange={handleChange} /></td>
                    <td>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setEditMode(false)}>Cancel</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{player.name}</td>
                    <td>{player.season}</td>
                    <td>{player.innings}</td>
                    <td>{player.notOuts}</td>
                    <td>{player.runs}</td>
                    <td>{player.ballsFaced}</td>
                    <td>{player.wickets}</td>
                    <td>{player.runsGiven}</td>
                    <td>{player.overs}</td>
                    <td>
                        <button onClick={() => setEditMode(true)}>Edit</button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default EditablePlayerRow;
