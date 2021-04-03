import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import UpdateIcon from "@material-ui/icons/Update";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();
  const [searchbar, setSearchbar] = useState(false);
  const [search, setSearch] = useState("");

  function runSearch(val) {
    //console.log(val);
    //console.log(props.guests);
    let filtered = props.guests.filter((guest) =>
      guest.lastName.toLowerCase().includes(val.toLowerCase())
    );
    props.filter(filtered);
    setSearch("");
    //console.log(filtered);
    setSearchbar(false);
  }

  return (
    <div>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SearchIcon>Search By Last Name</SearchIcon>}
        onClick={() => setSearchbar(!searchbar)}
      >
        Search By Last Name
      </Button>
      {searchbar ? (
        <>
          <TextField
            id="outlined-search"
            autoComplete="off"
            label="Last Name"
            name="search"
            value={search}
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => runSearch(search)}>Search</Button>
        </>
      ) : (
        <></>
      )}
      <Button
        variant="contained"
        color="yellow"
        className={classes.button}
        startIcon={<UpdateIcon />}
        onClick={() => {
          runSearch("");
        }}
      >
        Clear Filter
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddBoxIcon />}
        onClick={() => props.open("Add")}
      >
        Add Guest
      </Button>
    </div>
  );
}
