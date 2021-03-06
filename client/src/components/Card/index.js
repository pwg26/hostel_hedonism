import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Buttons from "../CardButtons";

const useStyles = makeStyles({
  root: {
    minWidth: 2,
  },
  bullet: {
    display: "inline-block",
    paddingLeft: "5px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function RoomCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const occupants = props.guests;

  return (
    <>
      {/* <Card style={{ width: "200px", marginLeft: '400px' }} className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Capacity
        </Typography>
      </CardContent>
      </Card> */}

      {/* <Buttons/> */}

      {props.rooms.map((cardComp, i) => {
        let id = cardComp.id;
        console.log("Room Card",cardComp, id);
        //cardComp.id = i + 1;

        return (
          <Card
            id="Cards"
            key={i+1}
            onClick={() =>
              props.open("Update", {
                name: cardComp.name,
                number: cardComp.number,
                rate: cardComp.rate,
                capacity: cardComp.capacity,
                id: cardComp.id,
              })
            }
            style={{
              width: "200px",
              display: "inline-block",
              margin: "30px",
              backgroundColor: "#fffff",
              border: "7px solid",
              boxShadow: "0 10px 20px",
            }}
            className={classes.root}
            variant="outlined"
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="body2" component="p">
                  #: {cardComp.number}
                </Typography>
                <Typography variant="h5" component="h2">
                  {cardComp.name}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                ></Typography>
                <Typography variant="body2" component="p">
                  Rate:{cardComp.rate}
                  <br />
                </Typography>
                <Typography variant="body2" component="p">
                  Room Capacity:{" "}
                  {
                    occupants.filter((guest) => guest.room == cardComp.name)
                      .length
                  }
                  /{cardComp.capacity}
                  <br />
                </Typography>
                {/* <Typography variant="body2" component="p">

      {props.rooms.map((cardComp) => (
        <>
          <Card
            style={{
              width: "300px",
              display: "inline-block",
              paddingLeft: "30px",
              backgroundColor: "#ff80ab",
              border: '7px solid',
            }}
            className={classes.root}
            variant="outlined"
          >
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Room:
                {cardComp.name}
              </Typography>
              <Typography variant="h5" component="h2">
                Room #: {cardComp.number}
              </Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
              ></Typography>
              <Typography variant="body2" component="p">
                Rate: {cardComp.rate}
                <br />
              </Typography>
              <Typography variant="body2" component="p">
                Room Capacity: {cardComp.capacity}
                <br />
              </Typography>
              {/* <Typography variant="body2" component="p">

                <ul>{numberList(cardComp.guests)}</ul>
                <br />
              </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </>
  );
}
