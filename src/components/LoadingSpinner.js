import React from 'react';

const LoadingSpinner = () => (
  <div 
    className="loading-spinner d-flex justify-content-center align-items-center" 
    role="status"
    aria-label="Loading content"
  >
    <div className="spinner-border text-primary" />
  </div>
);

export default LoadingSpinner;
