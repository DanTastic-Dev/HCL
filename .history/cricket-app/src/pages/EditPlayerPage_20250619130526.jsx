import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // ✅ include useLocation

function EditPlayerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Get the location
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    const password = location.state?.password || ""; // ✅ Get password passed from PlayerTable

    useEffect(() => {
        fetch(`http://localhost:5000/players/${id}`, {
            headers: {
                'x-admin-password': password // ✅ Use it to fetch player
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then(data => {
                setFormData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching player:', err);
                setLoading(false);
            });
    }, [id, password]);

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
                    'x-admin-password': password // ✅ Send it here
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Player updated!');
                navigate('/players');
            } else {
                alert("Update failed: Unauthorized or bad data.");
                console.error('Update failed.');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    if (loading) return <div style={{ color: "white" }}>Loading...</div>;
    if (!formData) return <div style={{ color: "red" }}>Player not found or access denied.</div>;

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
