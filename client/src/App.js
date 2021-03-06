import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import DashBoard from "./pages/Dashboard";
import Guests from "./pages/Guest.js";
import Rooms from "./pages/Rooms";
import { PrivateRoute, ProvideAuth, useAuth } from "./utils/Auth";
import Login from "./pages/Login";
// import Store from "./pages/Store";
import Activity from "./pages/Activity";

import Store from "./pages/Store";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Navbar auth={useAuth} />

          {/* <Wrapper> */}

          <PrivateRoute exact path="/">
            <DashBoard />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard">
            <DashBoard />
          </PrivateRoute>
          <PrivateRoute exact path="/guests">
            <Guests />
          </PrivateRoute>
          <PrivateRoute exact path="/rooms">
            <Rooms />
          </PrivateRoute>
          <PrivateRoute exact path="/store">
            <Store />
          </PrivateRoute>
          <PrivateRoute exact path="/activity">
            <Activity />
          </PrivateRoute>

          <Route exact path="/login">
            <Login auth={useAuth} />
          </Route>
          {/* </Wrapper> */}
          <Footer />
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
