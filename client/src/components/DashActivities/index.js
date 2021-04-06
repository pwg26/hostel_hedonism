import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles } from "@material-ui/core/styles";
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
    marginBottom: '3px',
  },
}));

export default function DashAct(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  return (
    <div className={classes.paper}>
      <h1 style= {{fontSize: '20px'}} >Activities For Today</h1>

      {props.acts.map((activity) => {
        let start = `${new Date(activity.startDate).getHours()}:${new Date(
          activity.startDate
        ).getMinutes()} - ${new Date(activity.endDate).getHours()}:${new Date(
          activity.endDate
        ).getMinutes()}`;

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
