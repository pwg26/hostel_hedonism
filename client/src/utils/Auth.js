import React, { useContext, createContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import API from "../utils/API";

const authUser = {
  isAuthenticated: false,
  signin(creds, cb) {
    console.log(creds);
    API.login(creds).then(({ data }) => {
      console.log(data);
      if (data) {
        authUser.isAuthenticated = true;
        cb(creds.username);
      } else {
        authUser.isAuthenticated = false;
        cb(null);
      }
    });
  },
  signout(cb) {
    authUser.isAuthenticated = false;
    cb();
  },
};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (creds, cb) => {
    return authUser.signin(creds, (username) => {
      setUser(username);
      cb();
    });
  };

  const signout = () => {
    return authUser.signout(() => {
      setUser(null);
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

export function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
