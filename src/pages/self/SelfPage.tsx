import React, { useState, useEffect } from 'react';
import './SelfPage.css';

const SelfPage: React.FC = () => {
  // State for user-entered bullet points
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  
  // State for the current input text
  const [inputText, setInputText] = useState('');
  
  // Load saved bullet points from localStorage on component mount
  useEffect(() => {
    const savedBulletPoints = localStorage.getItem('userBulletPoints');
    if (savedBulletPoints) {
      try {
        const parsedPoints = JSON.parse(savedBulletPoints);
        if (Array.isArray(parsedPoints)) {
          setBulletPoints(parsedPoints);
        }
      } catch (e) {
        console.error('Error parsing saved bullet points:', e);
      }
    }
  }, []);
  
  // Save bullet points to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userBulletPoints', JSON.stringify(bulletPoints));
  }, [bulletPoints]);
  
  // Handle form submission (when user presses Enter)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputText.trim()) {
      // Add the new bullet point to the list
      setBulletPoints([...bulletPoints, inputText.trim()]);
      
      // Clear the input field
      setInputText('');
    }
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="self-page">
      <div className="self-container">
        <h1>My Self</h1>
        
        <div className="self-content">
          <div className="bullet-points-section">
            <h2>Understanding Yourself</h2>
            
            <ul className="bullet-points-list">
              {/* Default bullet points that are always shown */}
              <li>Your gut is an effective tool for making quick decisions. The effectiveness of gut decisions depends on domain expertise. Research shows experts can make highly accurate intuitive decisions in their fields because their pattern recognition systems have been refined through experience.</li>
              <li>You are the only person who has access to all the information that you do. Trust your intuition. But, train and test it.</li>
              <li>When using the Luvbox, it is a tool to help you see possible areas of concern. Perhaps you aren't investing in intimacy. Perhaps your dealbreaker line is sky high as a result of fear. Perhaps you need to clarify your goals. The LuvBox can't tell you which you have to focus, but listen to your gut.</li>
              
              {/* User added bullet points */}
              {bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          
          <div className="add-bullet-section">
            <h3>Add Your Own Insight</h3>
            <p>Type your thought below and press Enter to add it to your personal insights.</p>
            
            <form onSubmit={handleSubmit} className="bullet-form">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter your personal insight..."
                className="bullet-input"
              />
              <button type="submit" className="add-button">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfPage;