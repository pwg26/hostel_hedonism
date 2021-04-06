import React from "react";
import "./index.js";
import AppBar from "@material-ui/core/Button";
var style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "35px",
  width: "100%",
};
const Footer = () => {
  return (
    <div>
      <div style={style}>Created by Dante, Kristen, and Pierce</div>
    </div>
  );
};
export default Footer;
