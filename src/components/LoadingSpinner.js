import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Fetching movies...</p>
    </div>
  );
};

export default LoadingSpinner;
