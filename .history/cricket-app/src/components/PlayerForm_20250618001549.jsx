import React from 'react';

const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
};

const inputStyle = {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const labelStyle = {
    marginBottom: '4px',
    fontWeight: 'bold',
};

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
};

const formWrapperStyle = {
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    padding: '2rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
};

const submitButtonStyle = {
    gridColumn: '1 / -1',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
};

const PlayerForm = ({ formData, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit} style={formWrapperStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Add Player</h2>

        <div style={containerStyle}>
            {/* Name */}
            <div style={formGroupStyle}>
                <label style={labelStyle}>Name</label>
                <input
                    style={inputStyle}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Season */}
            <div style={formGroupStyle}>
                <label style={labelStyle}>Season</label>
                <input
                    style={inputStyle}
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Innings */}
            <div style={formGroupStyle}>
                <label style={labelStyle}>Innings</label>
                <input
                    style={inputStyle}
                    type="number"
                    name="innings"
                    value={formData.innings}
                    onChange={handleChange}
                />
            </div>

            {/* Not Outs */}
            <div style={formGroupStyle}>
                <label style={labelStyle}>Not Outs</label>
                <input
                    style={inputStyle}
                    type="number"
                    name="notOuts"
                    value={formData.notOuts}
                    onChange={handleChange}
                />
            </div>

            {/* Runs */}
            <div style={formGroupStyle}>
                <label style={labelStyle}>Runs</label>
                <input
                    style={inputStyle}
                    type="number"
                    name="runs"
                    value={formData.runs}
                    onChange={handleChange}
                />
            </div>

            {/* Balls Faced */}
            <div style={formGroupStyle}>
                <label style={labelStyle}>Balls Faced</label>
                <input
                    style={inputStyle}
                    type="number"
                    name="ballsFaced"
                    value={formData.ballsFaced}
                    onChange={handleChange}
                />
            </div>

            {/* Wickets */}
            <div style={formGroupStyle}>
                <label style={labelStyle}>Wickets</label>
                <input
                    style={inputStyle}
                    type="number"
                    name="wickets"
                    value={formData.wickets}
                    onChange={handleChange}
                />
            </div>

            {/* Runs Given */}
            <div style={formGroupStyle}>
                <label style={labelStyle}>Runs Given</label>
                <input
                    style={inputStyle}
                    type="number"
                    name="runsGiven"
                    value={formData.runsGiven}
                    onChange={handleChange}
                />
            </div>

            {/* Overs */}
            <div style={formGroupStyle}>
                <label style={labelStyle}>Overs</label>
                <input
                    style={inputStyle}
                    type="number"
                    step="0.1"
                    name="overs"
                    value={formData.overs}
                    onChange={handleChange}
                />
            </div>

            {/* Submit Button */}
            <button type="submit" style={submitButtonStyle}>
                Add Player
            </button>
        </div>
    </form>
);

export default PlayerForm;
