import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import AddBoxIcon from "@material-ui/icons/AddBox";
import UpdateIcon from "@material-ui/icons/Update";

import { makeStyles } from "@material-ui/core/styles";
import StoreTable from "../components/StoreTable";
import StoreButtons from "../components/StoreButtons";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const classes = useStyles();

  return (
    <>
      <StoreButtons />
      <StoreTable />
    </>
  );
}
