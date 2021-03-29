import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

class NavBar extends Component {
  ///let setupTest = this.props.setupTest

  render() {
    return (
      <div>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                {...bindTrigger(popupState)}
              >
                Click here to Open Menu
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Dashboard</MenuItem>
                <MenuItem onClick={popupState.close}>Guest Manager</MenuItem>
                <MenuItem onClick={popupState.close}>Room Manager</MenuItem>
                <MenuItem onClick={popupState.close}>Activity Manager</MenuItem>
                <MenuItem onClick={popupState.close}>Store</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    );
  }
}
export default NavBar;
