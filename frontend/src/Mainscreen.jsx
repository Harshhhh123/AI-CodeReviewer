import React, { useState } from 'react';
import { CodeBracketIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import './Mainscreen.css';

function Mainscreen() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="main-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="card">
          <div className="card-header">
            <CodeBracketIcon className="icon blue" />
            <h2>Code Input</h2>
          </div>

          <textarea
            className="code-input"
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <div className="card-footer">
            <button
              onClick={() => setIsLoading(true)}
              className={`review-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <ArrowPathIcon className="icon spin" />
              ) : (
                <CodeBracketIcon className="icon" />
              )}
              <span>{isLoading ? 'Reviewing...' : 'Review Code'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="card">
          <div className="card-header justify-between">
            <div className="flex-row">
              <CodeBracketIcon className="icon green" />
              <h2>Review Results</h2>
            </div>
            <div className="traffic-lights">
              <div className="light red"></div>
              <div className="light yellow"></div>
              <div className="light green"></div>
            </div>
          </div>

          <div className="card-body">
            <div className="review-box">
              
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainscreen;
