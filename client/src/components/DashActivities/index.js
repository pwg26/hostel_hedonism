import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "static",
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
      <h1>Activities For Today</h1>

      {props.acts.map((activity) => {
        console.log(new Date(activity.startDate).getDate());
        let start = `${new Date(activity.startDate).getHours()}:${new Date(
          activity.endDate
        ).getHours()}`;

        return (
          <ListItem button>
            <ListItemText primary={activity.title} />
            <ListItemText primary={start} />
          </ListItem>
        );
      })}
    </div>
  );
}
