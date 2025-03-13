import React from 'react';
import './TestPages.css';

const TestArticlePage: React.FC = () => {
  return (
    <div className="test-pages">
      <div className="test-pages-container">
        <div className="article-content">
          <header className="article-header">
            <h1>Understanding Relationship Dynamics</h1>
            <div className="article-meta">
              <span className="article-date">March 15, 2025</span>
              <span className="article-author">Written by Jane Smith</span>
            </div>
          </header>
          
          <div className="article-body">
            <p className="article-lead">
              Relationships are complex systems that evolve over time. The way we interact with others,
              especially in romantic partnerships, follows patterns that can be understood and improved
              with awareness and intention.
            </p>
            
            <h2>The Foundation of Healthy Relationships</h2>
            <p>
              At the core of every successful relationship is effective communication. When partners can express 
              their needs, feelings, and boundaries clearly, they create a foundation of mutual understanding.
              This doesn't mean always agreeing, but rather creating a space where differences can be 
              navigated respectfully.
            </p>
            <p>
              Trust builds gradually through consistent actions that demonstrate reliability and honesty. 
              When we do what we say and say what we mean, we become trustworthy in the eyes of others.
            </p>
            
            <h2>Common Patterns and Their Origins</h2>
            <p>
              Many relationship patterns originate in our early experiences. The attachment styles we develop 
              in childhood often influence how we connect with partners as adults.
            </p>
            
            <h3>The Four Attachment Styles</h3>
            <ul className="bullet-points-list">
              <li><strong>Secure attachment:</strong> Comfortable with intimacy and independence</li>
              <li><strong>Anxious attachment:</strong> Fears abandonment and seeks reassurance</li>
              <li><strong>Avoidant attachment:</strong> Values independence and may struggle with vulnerability</li>
              <li><strong>Disorganized attachment:</strong> Exhibits contradictory behaviors due to unresolved trauma</li>
            </ul>
            
            <blockquote className="article-quote">
              "The quality of our relationships determines the quality of our lives." 
              <cite>— Esther Perel</cite>
            </blockquote>
            
            <h2>Growth Through Challenge</h2>
            <p>
              Conflict, when approached constructively, can actually strengthen relationships. The ability 
              to repair after disconnection is more important than avoiding disagreements altogether.
            </p>
            <p>
              Through intentional practice and reflection, we can develop greater emotional intelligence 
              and create deeper, more fulfilling connections with others.
            </p>
            
            <h3>Key Practices for Relationship Growth</h3>
            <ol className="numbered-list">
              <li>Practice active listening without planning your response</li>
              <li>Express appreciation regularly for both small and large actions</li>
              <li>Respect boundaries and communicate your own clearly</li>
              <li>Develop rituals of connection that bring you closer</li>
              <li>Seek to understand your partner's perspective, especially during disagreements</li>
            </ol>
            
            <h2>Conclusion</h2>
            <p>
              As we better understand the patterns within our relationships, we gain the ability to make 
              conscious choices rather than simply reacting from habit. This awareness opens the door to 
              more authentic and satisfying connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestArticlePage;
