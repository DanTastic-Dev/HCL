import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPlayerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        season: '',
        innings: 0,
        notOuts: 0,
        runs: 0,
        ballsFaced: 0,
        wickets: 0,
        runsGiven: 0,
        overs: 0
    });

    useEffect(() => {
        fetch(`http://localhost:5000/players/${id}`)
            .then(res => res.json())
            .then(data => setFormData(data))
            .catch(err => console.error('Error fetching player:', err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/players/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Player updated!');
                navigate('/players'); // Go back to ViewPlayers
            } else {
                console.error('Update failed.');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div>
            <h2>Edit Player</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label>{key}:</label>
                        <input
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit">Update Player</button>
            </form>
        </div>
    );
}

export default EditPlayerPage;
