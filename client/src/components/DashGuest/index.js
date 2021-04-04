import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DashAct(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  return (
    <div className={classes.paper}>
      <h1>Guests checking in today</h1>

      {props.guests.filter((dateIn) => dateIn.getDate() == (new Date().getDate())).map((dateIn)

      => {
        console.log(dateIn);
        return (
          <li>
            {guests.firstName}
          </li>
        );
      })}

      <h1>Guests checking out Today</h1>

      {props.acts.map((activity) => {
        console.log(activity);
        return (
          <li>
            {activity.title}: {activity.location}
          </li>
        );
      })}
    </div>
  );
}
