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

      <Button color="#e33371" href="/dashboard">
        Dashboard
      </Button>
      <Button color="#e33371" href="/">
        Guest Manager
      </Button>
      <Button color="#e33371">Room Manager</Button>
      <Button color="#e33371">Activity Manager</Button>
      <Button color="#e33371">Store</Button>
      {/* <Button href="#text-buttons" color="primary">
  Link
</Button> */}
    </div>
  );
};

export default MenuPopupState;
