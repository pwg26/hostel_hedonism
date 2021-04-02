import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./CSS/Login.css"

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
    <>
    <div style={{backgroundImage: 'none' }} id="container" >
        <TextField
        style={{ boxShadow: "1px 1px 2px black, 0 0 30px white, 0 0 5px darkblue", backgroundColor: 'white' }}
        required
        id="outlined-username"
        autoComplete="off"
        label="Username"
        variant="outlined"
        name="username"
        onChange={handleInputChange}
      />
        <TextField
        style={{ boxShadow: "1px 1px 2px black, 0 0 30px white, 0 0 5px darkblue", backgroundColor: 'white'}}
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        name="password"
        onChange={handleInputChange}
      />

      <br></br>

      <Button id="login" my="auto" variant="contained" color="" onClick={login}>
        Log in
      </Button>
    </div>
    </>
  );
}

export default LoginPage;
