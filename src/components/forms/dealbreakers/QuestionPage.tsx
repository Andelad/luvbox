import React, { useState } from 'react';
import './DealbreakersForm.css';

interface QuestionPageProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onNext: (value: number) => void;
  onPrevious: () => void;
  initialValue?: number;
  isLastQuestion?: boolean;
}

const QuestionPage: React.FC<QuestionPageProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onPrevious,
  initialValue,
  isLastQuestion = false
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(initialValue || 5);
  const [isDragging, setIsDragging] = useState(false);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt(e.target.value, 10));
  };

  const handleNext = () => {
    onNext(selectedValue);
  };

  return (
    <div className="question-page">
      <div className="question-content">
        <h2>Question {questionNumber} of {totalQuestions}</h2>
        <p className="question-text">{question}</p>
        
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="10"
            value={selectedValue}
            onChange={handleRangeChange}
            className="range-slider"
            id={`question-${questionNumber}-range`}
            name={`question-${questionNumber}-value`}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          />
          
          <div className="range-values">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <span 
                key={num} 
                className={`value-marker ${selectedValue === num ? 'active' : ''}`}
                onClick={() => setSelectedValue(num)}
              >
                {num}
              </span>
            ))}
          </div>
          
          <div className="range-labels">
            <span>Not important</span>
            <span>Very important</span>
          </div>
        </div>
        
        <div className="selected-value-display">
          <span>Your answer: </span>
          <span className="selected-value">{selectedValue}</span>
        </div>
      </div>
      
      <div className="form-navigation">
        {questionNumber > 1 && (
          <button onClick={onPrevious} className="nav-button prev-button">
            Previous
          </button>
        )}
        
        <button onClick={handleNext} className="nav-button next-button">
          {isLastQuestion ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;