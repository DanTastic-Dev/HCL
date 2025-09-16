import React, { useEffect, useState } from 'react';

const IntroAnimation = ({ onComplete }) => {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFade(true);
            setTimeout(onComplete, 1000); // Wait for fade-out
        }, 2000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            background: '#000', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2em',
            opacity: fade ? 0 : 1,
            transition: 'opacity 1s ease-out',
            zIndex: 9999
        }}>
            Hostel Cricket League 🏏
        </div>
    );
};

export default IntroAnimation;
