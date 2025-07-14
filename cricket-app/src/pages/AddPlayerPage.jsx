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

    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLocked) {
            alert("Too many failed attempts. Please wait 2 minutes.");
            return;
        }

        const input = prompt("Enter admin password to add player:");

        if (!input) return;

        try {
            const parsedData = {
                ...formData,
                innings: parseInt(formData.innings),
                notOuts: parseInt(formData.notOuts),
                runs: parseInt(formData.runs),
                ballsFaced: parseInt(formData.ballsFaced),
                wickets: parseInt(formData.wickets),
                runsGiven: parseInt(formData.runsGiven),
                overs: parseFloat(formData.overs)
            };

            const response = await fetch('https://hcl-production.up.railway.app/players/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': input
                },
                body: JSON.stringify(parsedData)
            });

            if (response.ok) {
                const { player: newPlayer } = await response.json();
                setPlayers([...players, newPlayer]);

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
                setFailedAttempts(0);
            } else {
                const attempts = failedAttempts + 1;
                setFailedAttempts(attempts);
                alert(`Incorrect password. Attempt ${attempts}/5`);

                if (attempts >= 5) {
                    setIsLocked(true);
                    alert("Too many attempts. Locked for 2 minutes.");
                    setTimeout(() => {
                        setIsLocked(false);
                        setFailedAttempts(0);
                    }, 120000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('https://hcl-production.up.railway.app/players');
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
    }, []);

    return (
        <div style={{ marginTop: '4rem' }}>
            <PlayerForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <PlayerTable players={players} setPlayers={setPlayers} />
        </div>
    );
}

export default AddPlayerPage;
