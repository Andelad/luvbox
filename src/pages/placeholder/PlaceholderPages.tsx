import React from 'react';

// Shared styling for placeholder pages
const placeholderStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  backgroundColor: '#f0e9e2',
  textAlign: 'center' as const
};

const headingStyle = {
  fontFamily: "'EB Garamond', serif",
  fontSize: '2.5rem',
  marginBottom: '1.5rem',
  color: '#2d2d2d'
};

const paragraphStyle = {
  fontSize: '1.2rem',
  lineHeight: 1.6,
  maxWidth: '600px',
  marginBottom: '2rem',
  color: '#555'
};

// Scripts Page
export const ScriptsPage: React.FC = () => {
  return (
    <div style={placeholderStyle}>
      <h1 style={headingStyle}>My Scripts</h1>
      <p style={paragraphStyle}>
        Explore and understand the patterns and narratives that shape your relationships.
        This feature is coming soon.
      </p>
    </div>
  );
};

// Self Page
export const SelfPage: React.FC = () => {
  return (
    <div style={placeholderStyle}>
      <h1 style={headingStyle}>My Self</h1>
      <p style={paragraphStyle}>
        Discover insights about yourself and your relationship patterns.
        This feature is coming soon.
      </p>
    </div>
  );
};

// Community Page
export const CommunityPage: React.FC = () => {
  return (
    <div style={placeholderStyle}>
      <h1 style={headingStyle}>Community</h1>
      <p style={paragraphStyle}>
        Connect with others and share experiences on your journey.
        This feature is coming soon.
      </p>
    </div>
  );
};

// Settings Page
export const SettingsPage: React.FC = () => {
  return (
    <div style={placeholderStyle}>
      <h1 style={headingStyle}>Settings</h1>
      <p style={paragraphStyle}>
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
        }}>My Dealbreaker Line</h2>
        <p style={{
          fontSize: '1rem',
          marginBottom: '2rem',
          color: '#666'
        }}>
          Configure the dealbreaker threshold that appears in the Cube visualization.
          This setting determines the minimum acceptable level for relationship qualities.
        </p>
        <div style={{
          margin: '1rem 0',
          textAlign: 'center'
        }}>
          <p>Coming soon: Ability to adjust your dealbreaker values</p>
        </div>
      </div>
    </div>
  );
};