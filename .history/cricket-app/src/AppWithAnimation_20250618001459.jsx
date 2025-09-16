import React, { useState } from 'react';
import App from './App';
import IntroAnimation from './components/IntroAnimation';

const AppWithAnimation = () => {
    const [showIntro, setShowIntro] = useState(true);

    return showIntro ? <IntroAnimation onComplete={() => setShowIntro(false)} /> : <App />;
};

export default AppWithAnimation;
