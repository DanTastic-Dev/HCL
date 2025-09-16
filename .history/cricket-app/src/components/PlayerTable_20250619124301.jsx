import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PlayerTable = ({ players, setPlayers }) => {
    const navigate = useNavigate();
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const handleDelete = async (id) => {
        if (isLocked) {
            alert("Too many failed attempts. Please wait 1 minute.");
            return;
        }

        const input = prompt("Enter admin password to delete:");

        if (!input) return;

        try {
            const response = await fetch(`http://localhost:5000/players/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-admin-password': input
                }
            });

            if (response.ok) {
                setPlayers(prev => prev.filter(p => p._id !== id));
                setFailedAttempts(0);
            } else {
                const attempts = failedAttempts + 1;
                setFailedAttempts(attempts);
                alert(`Incorrect password. Attempt ${attempts}/5`);

                if (attempts >= 5) {
                    setIsLocked(true);
                    setTimeout(() => {
                        setIsLocked(false);
                        setFailedAttempts(0);
                    }, 60000); // 1 minute
                }
            }
        } catch (err) {
            console.error("Error deleting player:", err);
        }
    };

    const handleEdit = (id) => {
        if (isLocked) {
            alert("Too many failed attempts. Please wait 1 minute.");
            return;
        }

        const input = prompt("Enter admin password to edit:");

        if (!input) return;

        // You may skip validation or send to a secure password-check endpoint in future
        fetch(`http://localhost:5000/players/${id}`, {
            method: "GET",
            headers: {
                "x-admin-password": input
            }
        })
            .then(res => {
                if (res.ok) {
                    setFailedAttempts(0);
                    navigate(`/edit/${id}`, { state: { password: input } });
                } else {
                    throw new Error("Unauthorized");
                }
            })
            .catch(() => {
                const attempts = failedAttempts + 1;
                setFailedAttempts(attempts);
                alert(`Incorrect password. Attempt ${attempts}/5`);
                if (attempts >= 5) {
                    setIsLocked(true);
                    setTimeout(() => {
                        setIsLocked(false);
                        setFailedAttempts(0);
                    }, 60000); // 1 minute
                }
            });
    };

    // ... your existing JSX table layout stays unchanged ...
    return (
        <div>{/* keep your styled JSX table here, no changes needed */}</div>
    );
};

export default PlayerTable;
