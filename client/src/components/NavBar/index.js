import * as React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
        <Button component={Link} to="/dashboard" color="#e33371">
          Dashboard
        </Button>
        <Button component={Link} to="/guests" color="#e33371">
          Guest Manager
        </Button>
        <Button component={Link} to="/rooms" color="#e33371">
          Room Manager
        </Button>
        <Button component={Link} to="/" color="#e33371">
          Activity Manager
        </Button>
        <Button component={Link} to="/store" color="#e33371">
          Store
        </Button>
        <Button
          component={Link}
          to="/login"
          onClick={() => auth.signout(console.log("logged out"))}
          color="#e33371"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default MenuPopupState;
