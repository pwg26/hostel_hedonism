import React from "react"
import "./index.js"


const footerStyle = {
  color: "red",
  fontSize: "20px",
  textAlign: "center"
}
const Footer = () => {
    return (
      <footer className="footer d-flex flex-column justify-content-center align-items-center bg-dark">
    
        <p style={footerStyle} className="lead my-3 text-white">
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