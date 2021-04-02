import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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

  function numberList(x) {
    const glist = x;
    const listGuests = glist.map((guest) => {
      return <li key={guest._id}>{guest}</li>;
    });
    return { listGuests };
  }

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

      {props.cardComps.map((cardComp) => (
        <>
          <Card
            style={{
              width: "300px",
              display: "inline-block",
              paddingLeft: "30px",
              backgroundColor: "",
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
              <Typography variant="body2" component="p">
                <ul>{numberList(cardComp.guests)}</ul>
                <br />
              </Typography>
            </CardContent>

            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </>
      ))}
    </>
  );
}
