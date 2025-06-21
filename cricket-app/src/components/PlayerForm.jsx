import React from 'react';

const fontColor = '#00FF88';

const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    color: fontColor,
};

const inputStyle = {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: fontColor,
    backgroundColor: '#1a1a1a', // Optional: make background darker for contrast
};

const labelStyle = {
    marginBottom: '4px',
    fontWeight: 'bold',
    color: fontColor,
};

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
};

const formWrapperStyle = {
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#121212', // dark background for contrast
    padding: '2rem',
    borderRadius: '8px',
    border: '1px solid #333',
    color: fontColor,
};

const submitButtonStyle = {
    gridColumn: '1 / -1',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: fontColor,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
};

const PlayerForm = ({ formData, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit} style={formWrapperStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: fontColor }}>
            Add Player
        </h2>

        <div style={containerStyle}>
            {[
                { label: 'Name', name: 'name' },
                { label: 'Season', name: 'season' },
                { label: 'Innings', name: 'innings', type: 'number' },
                { label: 'Not Outs', name: 'notOuts', type: 'number' },
                { label: 'Runs', name: 'runs', type: 'number' },
                { label: 'Balls Faced', name: 'ballsFaced', type: 'number' },
                { label: 'Wickets', name: 'wickets', type: 'number' },
                { label: 'Runs Given', name: 'runsGiven', type: 'number' },
                { label: 'Overs', name: 'overs', type: 'number', step: '0.1' },
            ].map(({ label, name, type = 'text', step }) => (
                <div style={formGroupStyle} key={name}>
                    <label style={labelStyle}>{label}</label>
                    <input
                        style={inputStyle}
                        name={name}
                        type={type}
                        step={step}
                        value={formData[name]}
                        onChange={handleChange}
                        required={name === 'name' || name === 'season'}
                        placeholder={label}
                    />
                </div>
            ))}

            <button type="submit" style={submitButtonStyle}>
                Add Player
            </button>
        </div>
    </form>
);

export default PlayerForm;
