import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loveNarratives, LoveNarrative, NarrativeRanking } from './narratives';
import Header from '../../common/Header';
import ActionPanel from '../../common/ActionPanel';
import './NarrativeRankingForm.css';

// Helper function to reorder list items
const reorder = (list: LoveNarrative[], startIndex: number, endIndex: number): LoveNarrative[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const NarrativeRankingForm: React.FC = () => {
  const navigate = useNavigate();
  const [narratives, setNarratives] = useState<LoveNarrative[]>(loveNarratives);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Check if dealbreakers form has been completed
  useEffect(() => {
    const savedAnswers = localStorage.getItem('dealbreakers');
    if (!savedAnswers) {
      // If dealbreakers aren't completed, redirect back to dealbreakers form
      navigate('/form/dealbreakers');
    }
  }, [navigate]);

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  // Handle dragging over another element
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null) return;
    if (draggingIndex === index) return;

    // Reorder the list
    setNarratives(reorder(narratives, draggingIndex, index));
    setDraggingIndex(index);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Save the rankings to localStorage
    const rankings: NarrativeRanking[] = narratives.map((narrative, index) => ({
      narrativeId: narrative.id,
      rank: index + 1
    }));

    localStorage.setItem('narrativeRankings', JSON.stringify(rankings));
    
    // Navigate to the next step (the main app)
    navigate('/scripts');
  };

  return (
    <div className="narrative-container">
      <Header />
      
      <div className="narrative-form">
        <div className="form-header">
          <h1>Your Love Narratives</h1>
          <p>
            We all have different ideas about what love should look like. Rank these six common love 
            narratives from most to least important to you by dragging them into your preferred order.
          </p>
        </div>
        
        <div className="narrative-page">
          <div className="instructions">
            <h3>Instructions:</h3>
            <ul>
              <li>Drag and drop the narratives to rank them from most important (#1) to least important (#6).</li>
              <li>Consider which narratives resonate most strongly with your personal vision of love.</li>
              <li>Your choices will help personalize your LuvBox experience.</li>
            </ul>
          </div>
          
          <div className="narrative-items">
            {narratives.map((narrative, index) => (
              <div
                key={narrative.id}
                className={`narrative-item ${draggingIndex === index ? 'dragging' : ''}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, index)}
              >
                <div className="drag-handle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                  </svg>
                </div>
                <div className="rank-number">{index + 1}</div>
                <div className="narrative-content">
                  <div className="narrative-title">{narrative.title}</div>
                  <div className="narrative-description">
                    <strong>Central Belief:</strong> {narrative.centralBelief}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="form-navigation">
            <button onClick={handleSubmit} className="submit-button">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
      
      <ActionPanel />
    </div>
  );
};

export default NarrativeRankingForm;