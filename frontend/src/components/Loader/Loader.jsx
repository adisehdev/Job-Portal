import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = () => {
  return (
    <div className="loader">
      <ClipLoader color="#4a4a4a" size={50} />
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loader;
