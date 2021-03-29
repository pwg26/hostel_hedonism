import React from "react"

const Footer = () => {
    return (
      <footer className="d-flex flex-column justify-content-center align-items-center bg-dark">
    
        <p className="lead my-3 text-white">
          &copy; Made with <span>♥️</span> by{" "}
          <a
            id="myInfo"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            Kristen, Pierce, Charles, and Dante 
          </a>
        </p>
      </footer>
    );
  };
  
  export default Footer;