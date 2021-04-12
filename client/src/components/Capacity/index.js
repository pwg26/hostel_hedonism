import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function Capacity(props) {
  const cap = props.rooms.reduce((prev, curr) => (prev += curr.capacity), 0);
  const guestTotal = props.guests.length;

  return (
    <>
      <Card
        style={{
          width: "200px",
          border: "3px solid",
          margin: "20px",
        }}
        variant="outlined"
      >
        <CardContent>
          <Typography gutterBottom>
            Total Capacity: {guestTotal}/{cap}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
