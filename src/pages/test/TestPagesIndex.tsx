import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './TestPages.css';

const TestPagesIndex: React.FC = () => {
  const navigate = useNavigate();
  const { pageId } = useParams();
  
  // Sample test pages for the menu
  const testPages = [
    { id: 'cube', title: 'Cube Visualization Test', path: '/cube-test', description: 'Test different cube visualization approaches and interactions' },
    { id: 'page1', title: 'Test Page 1', path: '/test/page1', description: 'Description for test page 1' },
    { id: 'page2', title: 'Test Page 2', path: '/test/page2', description: 'Description for test page 2' },
    { id: 'page3', title: 'Test Page 3', path: '/test/page3', description: 'Description for test page 3' },
    { id: 'page4', title: 'Test Page 4', path: '/test/page4', description: 'Description for test page 4' },
  ];

  // If a pageId is provided in the URL, check if we need to redirect
  React.useEffect(() => {
    if (pageId) {
      const page = testPages.find(p => p.id === pageId);
      if (page && page.path.startsWith('/cube-test')) {
        // Redirect to cube test page
        navigate(page.path);
      }
    }
  }, [pageId, navigate]);

  return (
    <div className="test-pages">
      <div className="test-pages-container">
        <h1>Test Pages</h1>
        <p className="test-pages-description">
          Use this area to navigate to various test pages and prototypes.
        </p>

        <div className="test-pages-content">
          <div className="test-pages-grid">
            {testPages.map((page) => (
              <div className="test-page-card" key={page.id}>
                <h2>{page.title}</h2>
                <p>{page.description}</p>
                <Link to={page.path} className="btn btn-primary">
                  Open Page
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPagesIndex;
