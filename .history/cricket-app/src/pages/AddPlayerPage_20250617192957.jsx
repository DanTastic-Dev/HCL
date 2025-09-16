import { useState, useEffect } from 'react';
import PlayerForm from '../components/PlayerForm';
import PlayerTable from '../components/PlayerTable';

function AddPlayerPage() {
    const [players, setPlayers] = useState([]);
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
        const parsedData = {
            ...formData,
            innings: parseInt(formData.innings),
            notOuts: parseInt(formData.notOuts),
            runs: parseInt(formData.runs),
            ballsFaced: parseInt(formData.ballsFaced),
            wickets: parseInt(formData.wickets),
            runsGiven: parseInt(formData.runsGiven),
            overs: parseFloat(formData.overs)  // <-- Ensure overs is a number
        };

        const response = await fetch('http://localhost:5000/players/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsedData)
        });

        if (response.ok) {
            const { player: newPlayer } = await response.json(); // ✅ fixed Give me the value of the player property inside the JSON response, and store it in a new variable called newPlayer.”
            setPlayers([...players, newPlayer]);

            // Reset form
            setFormData({
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
        } else {
            const errorText = await response.text(); // Show backend error message
            console.error('Failed to add player:', errorText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



  // ✅ Optional: Fetch players from backend on page load
    useEffect(() => {  //✅ When the component is mounted, useEffect runs once because the dependency array is empty ([]).
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:5000/players');  //✅ fetch('http://localhost:5000/players') sends a GET request to your backend.


                if (response.ok) {
                    const data = await response.json();
                    setPlayers(data);
                } else {
                    console.error('Failed to fetch players');
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []); // Empty dependency array = runs only once on mount

    return (
        <div style={{ marginBottom: '4rem' }}>
            <h1>Add Player</h1>
            <PlayerForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        {/* this is a prop meaning that PlayerTable will use the players function by the name players */}
            <PlayerTable players={players} />
        </div>
    );
}

export default AddPlayerPage;
