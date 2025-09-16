import React from 'react';

const PlayerForm = ({ formData, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px', margin: 'auto' }}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="season" placeholder="Season" value={formData.season} onChange={handleChange} required />
        <input name="innings" placeholder="Innings" type="number" value={formData.innings} onChange={handleChange} />
        <input name="notOuts" placeholder="Not Outs" type="number" value={formData.notOuts} onChange={handleChange} />
        <input name="runs" placeholder="Runs" type="number" value={formData.runs} onChange={handleChange} />
        <input name="ballsFaced" placeholder="Balls Faced" type="number" value={formData.ballsFaced} onChange={handleChange} />
        <input name="wickets" placeholder="Wickets" type="number" value={formData.wickets} onChange={handleChange} />
        <input name="runsGiven" placeholder="Runs Given" type="number" value={formData.runsGiven} onChange={handleChange} />
        <input name="overs" placeholder="Overs" type="number" step="0.1" value={formData.overs} onChange={handleChange} />
        <button type="submit">Add Player</button>
    </form>
);

export default PlayerForm;
