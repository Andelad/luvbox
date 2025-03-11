import React from 'react';
import SettingsPage from './SettingsPage';
import SelfPage from '../self/SelfPage';
import ScriptsPage from '../scripts/ScriptsPage';

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

// Export ScriptsPage from the scripts directory
export { ScriptsPage };

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

// Export the SettingsPage and SelfPage
export { SettingsPage, SelfPage };