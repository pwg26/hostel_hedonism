import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import UpdateIcon from "@material-ui/icons/Update";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();

  return (
    <div>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SearchIcon>Search By Last Name</SearchIcon>}
      >
        Search By Last Name
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddBoxIcon />}
        onClick={props.open}
      >
        Add Guest
      </Button>
      <Button
        variant="contained"
        color="yellow"
        className={classes.button}
        startIcon={<UpdateIcon />}
      >
        Update
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </div>
  );
}
