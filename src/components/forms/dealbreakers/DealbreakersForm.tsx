import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DealbreakersForm.css';
import ProgressBar from './ProgressBar';
import QuestionPage from './QuestionPage';
import { dealbreakersQuestions } from './questions';
import Header from '../../common/Header';
import ActionPanel from '../../common/ActionPanel';

interface Answer {
  questionId: string;
  value: number;
}

const DealbreakersForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  
  // Try to load existing answers from localStorage on component mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem('dealbreakers');
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
      } catch (e) {
        console.error('Error parsing saved answers:', e);
      }
    }
  }, []);
  
  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (answers.length > 0) {
      localStorage.setItem('dealbreakers', JSON.stringify(answers));
    }
  }, [answers]);
  
  const handleNext = (value: number) => {
    const currentQuestion = dealbreakersQuestions[currentQuestionIndex];
    
    // Update answers
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      answer => answer.questionId === currentQuestion.id
    );
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex].value = value;
    } else {
      newAnswers.push({
        questionId: currentQuestion.id,
        value
      });
    }
    
    setAnswers(newAnswers);
    
    // Navigate to next question or finish
    if (currentQuestionIndex < dealbreakersQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Form is complete, navigate to results or next section
      // For now, we'll just go back to the cube
      navigate('/cube');
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = (value: number) => {
    // Save the last answer
    handleNext(value);
    
    // Navigate to narrative ranking form instead of cube
    navigate('/form/narratives');
  };
  
  const currentQuestion = dealbreakersQuestions[currentQuestionIndex];
  const currentAnswerValue = answers.find(
    answer => answer.questionId === currentQuestion.id
  )?.value;
  
  const isLastQuestion = currentQuestionIndex === dealbreakersQuestions.length - 1;
  
  return (
    <div className="dealbreakers-container">
      <Header />
      
      <div className="dealbreakers-form">
        <div className="form-header">
          <h1>Your Dealbreakers</h1>
          <ProgressBar 
            currentStep={currentQuestionIndex + 1} 
            totalSteps={dealbreakersQuestions.length} 
          />
        </div>
        
        <QuestionPage
          question={currentQuestion.text}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={dealbreakersQuestions.length}
          onNext={isLastQuestion ? handleSubmit : handleNext}
          onPrevious={handlePrevious}
          initialValue={currentAnswerValue}
          isLastQuestion={isLastQuestion}
        />
      </div>
      
      <ActionPanel />
    </div>
  );
};

export default DealbreakersForm;