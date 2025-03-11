import React, { useState, useEffect } from 'react';
import './ActionPanel.css';

// Social icons inline SVGs
const socialIcons = {
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  ),
  coffee: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
    </svg>
  ),
  subscribe: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
  feedback: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
    </svg>
  ),
  share: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
    </svg>
  ),
  expand: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  ),
  collapse: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  ),
};

interface SubscribeFormData {
  firstName: string;
  lastName: string;
  email: string;
}

const ActionPanel: React.FC = () => {
  const [expanded, setExpanded] = useState(true); // Default to expanded
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [subscribeData, setSubscribeData] = useState<SubscribeFormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('actionPanelExpanded');
    if (savedState !== null) {
      setExpanded(savedState === 'true');
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('actionPanelExpanded', String(expanded));
  }, [expanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleSubscribeModal = () => {
    setShowSubscribeModal(!showSubscribeModal);
  };

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };

  const handleSubscribeFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubscribeData({
      ...subscribeData,
      [name]: value,
    });
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe form submitted:', subscribeData);
    
    // Here you would integrate with your email service
    // For now, we'll just log and close the modal
    
    // Reset form and close modal
    setSubscribeData({ firstName: '', lastName: '', email: '' });
    setShowSubscribeModal(false);
    
    // Optional: Show a success message
    alert('Thank you for subscribing!');
  };

  const handleBuyCoffee = () => {
    // Open Buy Me A Coffee link in a new tab
    window.open('https://www.buymeacoffee.com/yourname', '_blank', 'noopener,noreferrer');
  };

  const handleShareTo = (platform: string) => {
    // Basic share functionality - in production, you'd use proper share APIs
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent('Check out LuvBox - a diagnostic tool for dating and love!');
    
    let shareLink = '';
    
    switch(platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL - typically mobile only
        alert('To share on Instagram, please take a screenshot and share directly from the Instagram app.');
        return;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
    
    // Close the share modal after sharing
    setShowShareModal(false);
  };

  const handleFeedback = () => {
    // Open feedback form in a new tab
    window.open('https://forms.gle/yourFeedbackFormLink', '_blank');
  };

  return (
    <div className={`action-panel ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="action-panel-toggle" onClick={toggleExpand}>
        {expanded ? socialIcons.collapse : socialIcons.expand}
      </div>
      
      <div className="action-panel-content">
        <button 
          className="action-button coffee-button" 
          onClick={handleBuyCoffee}
          title="Buy Me A Coffee"
        >
          {socialIcons.coffee}
          {expanded && <span>Buy Me A Coffee</span>}
        </button>
        
        <button 
          className="action-button share-button" 
          onClick={toggleShareModal}
          title="Share"
        >
          {socialIcons.share}
          {expanded && <span>Share</span>}
        </button>
        
        <button 
          className="action-button subscribe-button" 
          onClick={toggleSubscribeModal}
          title="Subscribe to Updates"
        >
          {socialIcons.subscribe}
          {expanded && <span>Subscribe</span>}
        </button>
        
        <button 
          className="action-button feedback-button" 
          onClick={handleFeedback}
          title="Give Feedback"
        >
          {socialIcons.feedback}
          {expanded && <span>Feedback</span>}
        </button>
      </div>
      
      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="subscribe-modal-overlay">
          <div className="subscribe-modal">
            <button className="close-modal" onClick={toggleSubscribeModal}>×</button>
            <h3>Subscribe to Updates</h3>
            <p>Stay informed about new features and updates.</p>
            
            <form onSubmit={handleSubscribeSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={subscribeData.firstName}
                  onChange={handleSubscribeFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={subscribeData.lastName}
                  onChange={handleSubscribeFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={subscribeData.email}
                  onChange={handleSubscribeFormChange}
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">Subscribe</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="share-modal-overlay">
          <div className="share-modal">
            <button className="close-modal" onClick={toggleShareModal}>×</button>
            <h3>Share LuvBox</h3>
            <p>Choose a platform to share this tool with others.</p>
            
            <div className="social-share-buttons">
              <button 
                className="social-share-button facebook-share"
                onClick={() => handleShareTo('facebook')}
              >
                {socialIcons.facebook} Facebook
              </button>
              
              <button 
                className="social-share-button twitter-share"
                onClick={() => handleShareTo('twitter')}
              >
                {socialIcons.twitter} Twitter/X
              </button>
              
              <button 
                className="social-share-button linkedin-share"
                onClick={() => handleShareTo('linkedin')}
              >
                {socialIcons.linkedin} LinkedIn
              </button>
              
              <button 
                className="social-share-button instagram-share"
                onClick={() => handleShareTo('instagram')}
              >
                {socialIcons.instagram} Instagram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionPanel;