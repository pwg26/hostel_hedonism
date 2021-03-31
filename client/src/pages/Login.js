import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function LoginPage(props) {
  let history = useHistory();
  let location = useLocation();
  let auth = props.auth();
  const [formObject, setFormObject] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    console.log(formObject);
    auth.signin(formObject, () => {
      history.replace(from);
    });
  };

  return (
    <div>
      <TextField
        required
        id="outlined-username"
        autoComplete="off"
        label="Username"
        variant="outlined"
        name="username"
        onChange={handleInputChange}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        name="password"
        onChange={handleInputChange}
      />
      <Button my="auto" variant="contained" color="primary" onClick={login}>
        Log in
      </Button>
    </div>
  );
}

export default LoginPage;
