import React from "react";
import Rooms from "./pages/Rooms";
import { Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

export default function Rooms() {
  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        <Rooms />
      </Grid>
    </Grid>
  );
}
