import React from 'react';

const TopPerformers = ({ players }) => {
    const topRunScorer = [...players].sort((a, b) => b.runs - a.runs)[0];
    const topWicketTaker = [...players].sort((a, b) => b.wickets - a.wickets)[0];

    return (
        <div className="top-positions">
            <div className="position-box">
                <h3>Top Run Scorer</h3>
                <p>{topRunScorer?.name || '-'}</p>
                <p>{topRunScorer?.runs || 0} Runs</p>
            </div>
            <div className="position-box">
                <h3>Top Wicket Taker</h3>
                <p>{topWicketTaker?.name || '-'}</p>
                <p>{topWicketTaker?.wickets || 0} Wickets</p>
            </div>
        </div>
    );
};

export default TopPerformers;
