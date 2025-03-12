export const theme = {
  colors: {
    primary: '#d7967b',
    primaryDark: '#c27b5d',
    primaryDarker: '#a25a3c',
    text: '#2d2d2d',
    textLight: '#666',
    background: '#f0e9e2',
    border: '#ddd',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  typography: {
    fontFamilyPrimary: "'EB Garamond', serif",
    fontFamilySecondary: "'Source Sans Pro', sans-serif",
  }
};

// Helper to access theme values in styled-components or other CSS-in-JS
export const getColor = (color: keyof typeof theme.colors) => theme.colors[color];
export const getSpacing = (space: keyof typeof theme.spacing) => theme.spacing[space];

// Generate CSS variables string from theme
export const generateCssVariables = (): string => {
  let cssVars = ':root {\n';
  
  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    cssVars += `  --color-${key}: ${value};\n`;
  });
  
  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVars += `  --spacing-${key}: ${value};\n`;
  });
  
  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    cssVars += `  --radius-${key}: ${value};\n`;
  });
  
  // Typography
  Object.entries(theme.typography).forEach(([key, value]) => {
    cssVars += `  --${key}: ${value};\n`;
  });
  
  cssVars += '}\n';
  return cssVars;
};

export default theme;
