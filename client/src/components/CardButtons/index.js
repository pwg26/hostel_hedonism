import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function TextButtons() {
  const classes = useStyles();

    return (
        
    <div className={classes.root}>
      <Button variant="contained">Add Room</Button>
      <Button variant="contained" className={classes.button}>
        Modify Room
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}
        startIcon={<DeleteIcon />}>
        Delete Room
      </Button>
    </div>
  );
}
