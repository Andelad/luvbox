import React from 'react';
import { Link } from 'react-router-dom';
import './LuvBoxInfoPage.css';

const LuvBoxInfoPage: React.FC = () => {
  return (
    <div className="luvboxinfo-page" id="top">
      <div className="luvboxinfo-container">
        <div className="side-menu">
          <div className="breadcrumb">
            <Link to="/map">← Back to Map</Link>
          </div>
          <h3>In this section</h3>
          <ul>
            <li><a href="#introduction">Introduction</a></li>
            <li><a href="#setup">Setting Up Your Cube</a></li>
            <li><a href="#navigation">Navigating the Cube</a></li>
            <li><a href="#features">Key Features</a></li>
            <li><a href="#tips">Tips for Best Use</a></li>
          </ul>
          <div className="go-to-top">
            <a href="#top">↑ Go to Top</a>
          </div>
        </div>
        <div className="article-content">
          <div className="article-header">
            <h1>How to Use the LuvBox Cube</h1>
          </div>
          <div className="article-body">
            <h2 id="introduction">Introduction</h2>
            <p>
              The LuvBox Cube is a powerful tool designed to help you navigate and understand your relationships. By visualizing different aspects of love and connection, the cube provides insights that can guide your decisions and enhance your experiences.
            </p>
            <h2 id="setup">Setting Up Your Cube</h2>
            <p>
              To get started with the LuvBox Cube, follow these steps:
            </p>
            <ul>
              <li>Sign in to your LuvBox account.</li>
              <li>Complete the initial assessment to personalize your cube.</li>
              <li>Navigate to the Cube section from the main menu.</li>
            </ul>
            <p>
              Once your cube is set up, you can begin exploring its features and insights.
            </p>
            <h2 id="navigation">Navigating the Cube</h2>
            <p>
              The LuvBox Cube is divided into different faces, each representing a key aspect of your relationship:
            </p>
            <ul>
              <li><strong>Communication:</strong> Insights into how you and your partner communicate.</li>
              <li><strong>Intimacy:</strong> Understanding your emotional and physical connection.</li>
              <li><strong>Values:</strong> Alignment of core values and beliefs.</li>
              <li><strong>Goals:</strong> Shared and individual goals within the relationship.</li>
              <li><strong>Challenges:</strong> Identifying and addressing potential obstacles.</li>
            </ul>
            <p>
              You can rotate the cube to focus on different faces and explore the detailed insights provided for each aspect.
            </p>
            <h2 id="features">Key Features</h2>
            <p>
              The LuvBox Cube offers several key features to enhance your understanding of your relationship:
            </p>
            <ul>
              <li><strong>Interactive Visualization:</strong> Rotate and explore the cube to see different aspects of your relationship.</li>
              <li><strong>Personalized Insights:</strong> Receive tailored advice based on your assessment results.</li>
              <li><strong>Progress Tracking:</strong> Monitor changes and improvements over time.</li>
              <li><strong>Resource Library:</strong> Access articles, videos, and tools to support your relationship journey.</li>
            </ul>
            <h2 id="tips">Tips for Best Use</h2>
            <p>
              To get the most out of your LuvBox Cube, consider these tips:
            </p>
            <ul>
              <li>Regularly update your assessment to keep insights relevant.</li>
              <li>Use the cube as a conversation starter with your partner.</li>
              <li>Explore the resource library for additional support and guidance.</li>
              <li>Set aside time each week to review your progress and insights.</li>
            </ul>
            <p>
              By actively engaging with the LuvBox Cube, you can gain deeper insights into your relationship and make informed decisions that enhance your connection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuvBoxInfoPage;
