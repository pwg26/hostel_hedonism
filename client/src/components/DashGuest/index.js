import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "static",
    width: 265,
    height: 350,
    backgroundColor: theme.palette.background.paper,
    border: "5px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DashAct(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  return (
    <div className={classes.paper}>
      <h1 style= {{fontSize: '20px'}} >Guests checking in today</h1>

      {props.guests
        .filter(
          (guests) => new Date(guests.dateIn).getDate() == new Date().getDate()
        )
        .map((gueststoday) => {
          const fullName = `${gueststoday.firstName} ${gueststoday.lastName}`;
          return (
            <ListItem button>
              <ListItemText primary={fullName} />
            </ListItem>
          );
        })}

      <h1 style= {{fontSize: '20px'}} >Guests checking out today</h1>

      {props.guests
        .filter(
          (guests) => new Date(guests.dateOut).getDate() == new Date().getDate()
        )
        .map((gueststoday) => {
          const fullName = `${gueststoday.firstName} ${gueststoday.lastName}`;
          return (
            <ListItem button>
              <ListItemText primary={fullName} />
            </ListItem>
          );
        })}
    </div>
  );
}
