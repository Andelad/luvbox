import React from 'react';
import { Link } from 'react-router-dom';
import './CommunityPage.css';

const CommunityPage: React.FC = () => {
  return (
    <div className="community-page" id="top">
      <div className="community-container">
        <div className="side-menu">
          <div className="breadcrumb">
            <Link to="/map">← Back to Map</Link>
          </div>
          <h3>In this section</h3>
          <ul>
            <li><a href="#building-connections">Building Real Connections</a></li>
            <li><a href="#shared-experiences">Shared Experiences</a></li>
            <li><a href="#growth-together">Growing Together</a></li>
            <li><a href="#support-network">Support Network</a></li>
            <li><a href="#future-features">Future Features</a></li>
          </ul>
          <div className="go-to-top">
            <a href="#top">↑ Go to Top</a>
          </div>
        </div>
        <div className="article-content">
          <div className="article-header">
            <h1>The Power of Community in Love and Growth</h1>
          </div>
          <div className="article-body">
            <p>
              While the journey of love is deeply personal, we don't have to walk it alone. Community plays a vital role in how we learn, grow, and navigate relationships.
            </p>
            <h2 id="building-connections">Building Real Connections</h2>
            <p>
              Community is more than just a collection of people—it's a network of shared understanding and support. When we connect with others who are on similar journeys, we gain new perspectives and insights that can illuminate our own path.
            </p>
            <h2 id="shared-experiences">Shared Experiences</h2>
            <p>
              There's power in knowing we're not alone in our experiences. Whether celebrating successes or working through challenges, shared experiences can:
            </p>
            <ul>
              <li>Validate our feelings and experiences</li>
              <li>Provide practical insights and solutions</li>
              <li>Offer comfort during difficult times</li>
              <li>Create opportunities for collective learning</li>
            </ul>
            <h2 id="growth-together">Growing Together</h2>
            <p>
              Community creates a space for mutual growth and learning. Through discussion, reflection, and shared wisdom, we can:
            </p>
            <ul>
              <li>Challenge our assumptions about relationships</li>
              <li>Learn from others' experiences</li>
              <li>Develop new perspectives on love and connection</li>
              <li>Find encouragement to take positive steps forward</li>
            </ul>
            <h2 id="support-network">Support Network</h2>
            <p>
              A strong community provides a foundation of support that can help us navigate the complexities of relationships. This network becomes especially valuable during:
            </p>
            <ul>
              <li>Major relationship decisions</li>
              <li>Personal growth challenges</li>
              <li>Periods of transition</li>
              <li>Moments of celebration</li>
            </ul>
            <h2 id="future-features">Future Features</h2>
            <p>
              We're excited to announce upcoming community features that will enhance your LuvBox experience:
            </p>
            <ul>
              <li>Moderated discussion forums</li>
              <li>Expert Q&A sessions</li>
              <li>Anonymous support groups</li>
              <li>Resource sharing</li>
              <li>Success story highlights</li>
            </ul>
            <p>
              Stay tuned as we develop these features to create a supportive, enriching community space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
