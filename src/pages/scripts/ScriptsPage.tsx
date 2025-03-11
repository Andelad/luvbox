import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoveNarrative, NarrativeRanking, getRankedNarratives } from '../../components/forms/narratives/narratives';
import './ScriptsPage.css';

const ScriptsPage: React.FC = () => {
  const [rankedNarratives, setRankedNarratives] = useState<LoveNarrative[]>([]);
  const [hasRankings, setHasRankings] = useState<boolean>(false);

  useEffect(() => {
    // Load narrative rankings from localStorage
    const savedRankings = localStorage.getItem('narrativeRankings');
    
    if (savedRankings) {
      try {
        const parsedRankings: NarrativeRanking[] = JSON.parse(savedRankings);
        setRankedNarratives(getRankedNarratives(parsedRankings));
        setHasRankings(true);
      } catch (e) {
        console.error('Error parsing saved narrative rankings:', e);
        setHasRankings(false);
      }
    } else {
      setHasRankings(false);
    }
  }, []);

  if (!hasRankings) {
    return (
      <div className="scripts-page">
        <div className="scripts-container">
          <div className="scripts-header">
            <h1>My Scripts</h1>
            <p>
              Explore and understand the love narratives that shape your relationships.
            </p>
          </div>
          
          <div className="no-rankings">
            <h2>You haven't ranked your love narratives yet</h2>
            <p>Complete the dealbreakers assessment and narrative ranking to see your personalized results.</p>
            <Link to="/form/dealbreakers" className="start-button">
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scripts-page">
      <div className="scripts-container">
        <div className="scripts-header">
          <h1>My Love Narratives</h1>
          <p>
            These are the six love narratives ranked according to your preferences.
            Understanding these patterns can help you recognize what you value most in relationships.
          </p>
        </div>
        
        <div className="narratives-list">
          {rankedNarratives.map((narrative, index) => (
            <div key={narrative.id} className="narrative-card">
              <div className="narrative-header">
                <div className="narrative-rank">{index + 1}</div>
                <h2 className="narrative-title">{narrative.title}</h2>
              </div>
              
              <div className="narrative-body">
                <div className="narrative-section">
                  <div className="section-title">Central Belief</div>
                  <div className="section-content">{narrative.centralBelief}</div>
                </div>
                
                <div className="narrative-section">
                  <div className="section-title">Key Elements</div>
                  <div className="section-content">{narrative.keyElements}</div>
                </div>
                
                <div className="narrative-section">
                  <div className="section-title">Signs of Love</div>
                  <div className="section-content">{narrative.signsOfLove}</div>
                </div>
                
                <div className="narrative-section">
                  <div className="section-title">Historical Roots</div>
                  <div className="section-content">{narrative.historicalRoots}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScriptsPage;