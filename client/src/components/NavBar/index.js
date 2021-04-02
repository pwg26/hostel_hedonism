import * as React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./index.css"
import { createMuiTheme } from '@material-ui/core/styles';


// import Menu from '@material-ui/core/Menu'
// import MenuItem from '@material-ui/core/MenuItem'
// import {
//   usePopupState,
//   bindTrigger,
//   bindMenu,
// } from 'material-ui-popup-state/hooks'

const MenuPopupState = (props) => {
  //   const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  let auth = props.auth();
  return (
    <div>
      <div id="container">
        <Button component={Link} to="/dashboard" variant="contained" color="primary" id="button">
          Dashboard
        </Button>
        <Button component={Link} to="/guests" variant="contained" color="primary" id="button">
          Guest Manager
        </Button>
        <Button component={Link} to="/rooms" variant="contained" color="primary" id="button">
          Room Manager
        </Button>
        <Button component={Link} to="/activity" variant="contained" color="primary" id="button">
          Activity Manager
        </Button>
        <Button component={Link} to="/store" variant="contained" color="primary" id="button">
          Store
        </Button>
        <Button
          component={Link}
          to="/login"
          onClick={() => auth.signout(console.log("logged out"))}
          variant="contained"
          color="" id="button"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default MenuPopupState;
