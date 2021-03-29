import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
// import DashBooard from "./pages/Dashboard";
// import Guests from "./pages/Guests";
// import Rooms from "./pages/Rooms";
// import Store from "./pages/Store";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* <Wrapper>
          <Route exact path="/" pages={DashBoard} />
          <Route exact path="/dashboard" pages={DashBoard} />
          <Route exact path="/guests" pages={Guests} />
        </Wrapper> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
