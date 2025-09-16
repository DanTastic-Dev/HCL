import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPlayerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/players/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching player:', err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "name" || name === "season" ? value : parseFloat(value) || 0
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
                navigate('/players');
            } else {
                console.error('Update failed.');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    if (loading) return <div style={{ color: "white" }}>Loading...</div>;
    if (!formData) return <div style={{ color: "red" }}>Player not found.</div>;

    return (
        <div style={{ padding: "20px", backgroundColor: "#1e1e1e", color: "white" }}>
            <h2 style={{ color: "#00FF88" }}>Edit Player</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    key !== "_id" && (
                        <div key={key} style={{ marginBottom: "10px" }}>
                            <label style={{ marginRight: "10px" }}>{key}:</label>
                            <input
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                type={typeof formData[key] === "number" ? "number" : "text"}
                                style={{ padding: "5px", borderRadius: "5px" }}
                            />
                        </div>
                    )
                ))}
                <button type="submit" style={{
                    backgroundColor: "#00FF88",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    color: "black"
                }}>
                    Update Player
                </button>
            </form>
        </div>
    );
}

export default EditPlayerPage;
