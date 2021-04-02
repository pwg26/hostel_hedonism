import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function Capacity() {
  return (
    <>
      <Card style={{
        width: "200px",
        border: '3px solid',
        margin: '20px',
      }}
        variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Capacity
          </Typography>
        </CardContent>
      </Card>
      ;
    </>
  );
}
