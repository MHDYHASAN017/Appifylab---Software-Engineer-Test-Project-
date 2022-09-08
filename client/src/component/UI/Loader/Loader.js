import React from "react";
import "./loader.css";

const Loader = () => {

  return (
    <div className="loader">
      <div className="spinner-grow text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
