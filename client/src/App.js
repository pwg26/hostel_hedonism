import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import GuestTable from "./components/GuestTable";
// import DashBooard from "./pages/Dashboard";
import Guests from "./pages/Guest.js";
// import Rooms from "./pages/Rooms";
// import Store from "./pages/Store";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <GuestTable />

        {/* <Wrapper> */}
        {/* <Route exact path="/" pages={DashBoard} />
          <Route exact path="/dashboard" pages={DashBoard} /> */}
        <Route exact path="/" pages={Guests} />
        <Route exact path="/guests" pages={Guests} />
        {/* </Wrapper> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
