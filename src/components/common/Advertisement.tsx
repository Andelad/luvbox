import React from 'react';
import './Advertisement.css';

export type AdSize = 'leaderboard' | 'large-leaderboard' | 'billboard' | 'mobile-leaderboard' | 'medium-rectangle' | 'custom';

export interface AdvertisementProps {
  /**
   * The size of the advertisement
   * - leaderboard: 728×90 pixels
   * - large-leaderboard: 970×90 pixels
   * - billboard: 970×250 pixels
   * - mobile-leaderboard: 320×50 pixels
   * - medium-rectangle: 300×250 pixels
   * - custom: Uses custom width and height
   */
  size?: AdSize;
  
  /**
   * The ad URL to link to when clicked
   */
  adUrl?: string;
  
  /**
   * The image URL for the advertisement
   */
  imageUrl?: string;
  
  /**
   * Alternative text for the advertisement image
   */
  altText?: string;
  
  /**
   * Custom width (only used when size is 'custom')
   */
  width?: number;
  
  /**
   * Custom height (only used when size is 'custom')
   */
  height?: number;
  
  /**
   * Optional classname for custom styling
   */
  className?: string;
  
  /**
   * Whether to show a sponsor label above the ad
   */
  showSponsorLabel?: boolean;
  
  /**
   * Optional custom content instead of an image (for HTML ads)
   */
  children?: React.ReactNode;
}

const Advertisement: React.FC<AdvertisementProps> = ({
  size = 'leaderboard',
  adUrl = '#',
  imageUrl,
  altText = 'Advertisement',
  width,
  height,
  className = '',
  showSponsorLabel = true,
  children
}) => {
  // Determine dimensions based on ad size
  const getDimensions = () => {
    switch (size) {
      case 'leaderboard':
        return { width: 728, height: 90 };
      case 'large-leaderboard':
        return { width: 970, height: 90 };
      case 'billboard':
        return { width: 970, height: 250 };
      case 'mobile-leaderboard':
        return { width: 320, height: 50 };
      case 'medium-rectangle':
        return { width: 300, height: 250 };
      case 'custom':
        return { width, height };
      default:
        return { width: 728, height: 90 }; // Default to leaderboard
    }
  };

  const dimensions = getDimensions();
  
  // Create responsive style with aspect ratio
  const aspectRatio = dimensions.height && dimensions.width 
    ? dimensions.height / dimensions.width 
    : 90 / 728; // Default leaderboard ratio
  
  return (
    <div className={`advertisement-container ${className}`}>
      {showSponsorLabel && <div className="advertisement-label">Sponsored</div>}
      <div 
        className={`advertisement-content ${size}`}
        style={{ 
          paddingBottom: `${aspectRatio * 100}%`,
          // Add specific width for custom sizes only
          ...(size === 'custom' && width ? { maxWidth: `${width}px` } : {})
        }}
      >
        <a 
          href={adUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="advertisement-link"
        >
          {children ? (
            <div className="advertisement-custom-content">
              {children}
            </div>
          ) : imageUrl ? (
            <img 
              src={imageUrl} 
              alt={altText} 
              className="advertisement-image" 
            />
          ) : (
            <div className="advertisement-placeholder">
              <span>Advertisement</span>
              <span className="advertisement-size">
                {dimensions.width}×{dimensions.height}
              </span>
            </div>
          )}
        </a>
      </div>
    </div>
  );
};

export default Advertisement;