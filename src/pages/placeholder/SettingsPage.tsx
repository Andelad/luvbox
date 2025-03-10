import React, { useState, useEffect } from 'react';
import { dealbreakersQuestions } from '../../components/forms/dealbreakers/questions';
import './SettingsPage.css';

interface DealbreakerAnswer {
  questionId: string;
  value: number;
}

const SettingsPage: React.FC = () => {
  const [dealbreakerValues, setDealbreakerValues] = useState<DealbreakerAnswer[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved dealbreaker values from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem('dealbreakers');
    if (savedAnswers) {
      try {
        const parsedAnswers: DealbreakerAnswer[] = JSON.parse(savedAnswers);
        setDealbreakerValues(parsedAnswers);
      } catch (e) {
        console.error('Error parsing saved dealbreaker answers:', e);
      }
    } else {
      // If no saved values, create default ones based on questions
      const defaultValues = dealbreakersQuestions.map(q => ({
        questionId: q.id,
        value: 5 // Default to middle value
      }));
      setDealbreakerValues(defaultValues);
    }
    setLoaded(true);
  }, []);

  // Update localStorage when values change
  useEffect(() => {
    if (loaded && dealbreakerValues.length > 0) {
      console.log('Saving dealbreaker values to localStorage:', dealbreakerValues);
      localStorage.setItem('dealbreakers', JSON.stringify(dealbreakerValues));
    }
  }, [dealbreakerValues, loaded]);

  // Set up polyfill for input event if needed
  useEffect(() => {
    // For browsers that might not properly support continuous updates during drag
    const sliders = document.querySelectorAll('input[type="range"]');
    
    sliders.forEach(slider => {
      // Use both mousedown and touchstart to ensure all device support
      slider.addEventListener('mousedown', function() {
        // Add mousemove listener when mouse is down
        const handleMove = () => {
          // Dispatch input event to ensure continuous updates
          slider.dispatchEvent(new Event('input', { bubbles: true }));
        };
        
        document.addEventListener('mousemove', handleMove);
        
        // Remove listener when mouse is up
        document.addEventListener('mouseup', function cleanUp() {
          document.removeEventListener('mousemove', handleMove);
          document.removeEventListener('mouseup', cleanUp);
        }, { once: true });
      });
      
      // Similar setup for touch events
      slider.addEventListener('touchstart', function() {
        const handleTouchMove = () => {
          slider.dispatchEvent(new Event('input', { bubbles: true }));
        };
        
        document.addEventListener('touchmove', handleTouchMove);
        
        document.addEventListener('touchend', function cleanUp() {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', cleanUp);
        }, { once: true });
      });
    });
  }, [loaded]);

  const handleSliderChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    
    console.log(`Slider value changing for ${id}: ${newValue}`);
    
    setDealbreakerValues(prev => {
      // Create new array with updated values
      let updatedValues;
      
      // If we don't find the item, add it
      if (!prev.some(item => item.questionId === id)) {
        updatedValues = [...prev, { questionId: id, value: newValue }];
      } else {
        // Otherwise update existing item
        updatedValues = prev.map(item => 
          item.questionId === id ? { ...item, value: newValue } : item
        );
      }
      
      // Immediately save to localStorage to trigger updates in other components
      localStorage.setItem('dealbreakers', JSON.stringify(updatedValues));
      
      // Dispatch a custom event to notify EqualizerFace
      window.dispatchEvent(new Event('dealbreakersChanged'));
      
      return updatedValues;
    });
  };

  // Also handle input events for continuous updates
  const handleSliderInput = (id: string) => (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = parseInt((e.target as HTMLInputElement).value, 10);
    
    // Update state to reflect continuous movement
    setDealbreakerValues(prev => {
      return prev.map(item => 
        item.questionId === id ? { ...item, value: newValue } : item
      );
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '2rem',
      backgroundColor: '#f0e9e2',
      textAlign: 'center' as const
    }}>
      <h1 style={{
        fontFamily: "'EB Garamond', serif",
        fontSize: '2.5rem',
        marginBottom: '1.5rem',
        color: '#2d2d2d'
      }}>Settings</h1>
      <p style={{
        fontSize: '1.2rem',
        lineHeight: 1.6,
        maxWidth: '600px',
        marginBottom: '2rem',
        color: '#555'
      }}>
        Customize your LuvBox experience.
      </p>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        width: '100%',
        maxWidth: '600px',
      }}>
        <h2 style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: '1.8rem',
          marginBottom: '1.5rem',
          color: '#2d2d2d'
        }}>My Dealbreaker Lines</h2>
        <p style={{
          fontSize: '1rem',
          marginBottom: '2rem',
          color: '#666'
        }}>
          Adjust your dealbreaker threshold that appears in the Cube visualization.
          These settings determine the minimum acceptable levels for relationship qualities.
        </p>

        {/* Dealbreaker sliders */}
        {dealbreakersQuestions.map(question => {
          const answer = dealbreakerValues.find(a => a.questionId === question.id);
          const currentValue = answer ? answer.value : 5;

          return (
            <div key={question.id} style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label htmlFor={`slider-${question.id}`} style={{ fontSize: '1rem', color: '#2d2d2d', flex: 1, paddingRight: '10px' }}>
                  {question.text}
                </label>
                <span style={{ fontWeight: 'bold', color: '#d7967b', minWidth: '24px', textAlign: 'right' }}>{currentValue}</span>
              </div>
              <div className="slider-wrapper">
                <input
                  type="range"
                  id={`slider-${question.id}`}
                  min="0"
                  max="10"
                  step="1"
                  value={currentValue}
                  onChange={handleSliderChange(question.id)}
                  onInput={handleSliderInput(question.id)}
                  className="dealbreaker-slider"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888' }}>
                <span>Not important (0)</span>
                <span>Very important (10)</span>
              </div>
            </div>
          );
        })}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#888' }}>
            Changes are automatically saved and will be reflected in your cube visualization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;