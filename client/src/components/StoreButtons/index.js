import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import AddBoxIcon from '@material-ui/icons/AddBox';
import UpdateIcon from '@material-ui/icons/Update';

import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));



export default function IconLabelButtons() {
  const classes = useStyles();

  return (
    <>
    
    <div>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddBoxIcon>Add Item</AddBoxIcon>}
      >
       Add Item
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<UpdateIcon />}
      >
        Modify Item 
      </Button>
      <Button
        variant="contained"
       
        color="yellow"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete Item
      </Button>
     
    
    </div>
    </>

  );
}