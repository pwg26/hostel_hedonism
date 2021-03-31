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

      {/* <Button variant="contained" {...bindTrigger(popupState)}>
       Navigation
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Home Page</MenuItem>
        <MenuItem onClick={popupState.close}>Reservations</MenuItem>
        <MenuItem onClick={popupState.close}>Store</MenuItem>
      </Menu> */}
      {/* <Button>Default</Button> */}

      <Button a href="/Dashboard" color="#E33371">Dashboard</Button>
      <Button a href="/Guest" color="#E33371">Guest Manager</Button>
      <Button a href="/Room" color="#E33371">Room Manager</Button>
      <Button a href="/" color="#E33371">Activity Manager</Button>
      <Button a href="/Store" color="#E33371">Store</Button>
      {/* <Button href="#text-buttons" color="primary">
  Link
</Button> */}

    </div>
  );
};

export default MenuPopupState;
