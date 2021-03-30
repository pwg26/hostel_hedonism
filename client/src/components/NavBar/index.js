import * as React from "react";
import Button from "@material-ui/core/Button";

// import Menu from '@material-ui/core/Menu'
// import MenuItem from '@material-ui/core/MenuItem'
// import {
//   usePopupState,
//   bindTrigger,
//   bindMenu,
// } from 'material-ui-popup-state/hooks'

const MenuPopupState = () => {
  //   const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  return (
    <div>
      <div id="container">
        <Button a href="/Dashboard" color="#e33371">
          Dashboard
        </Button>
        <Button a href="/Guest" color="#e33371">
          Guest Manager
        </Button>
        <Button a href="/Rooms" color="#e33371">
          Room Manager
        </Button>
        <Button a href="/" color="#e33371">
          Activity Manager
        </Button>
        <Button a href="/Store" color="#e33371">
          Store
        </Button>
      </div>
    </div>
  );
};

export default MenuPopupState;
