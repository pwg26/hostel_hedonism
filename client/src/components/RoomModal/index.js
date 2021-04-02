import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import LuxonUtils from "@date-io/luxon"; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function RoomModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [formObject, setFormObject] = useState({
    number: "",
    name: "",
    rate: "",
    capacity: "",
  });
  // const [guests, setGuests] = useState([]);
  // const [guest, setGuest] = useState("");

  // const handleChange = (event) => {
  //   setRoom(event.target.value);
  // };

  // useEffect(() => {
  //   const loadGuests = () => {
  //     API.getGuests().then((res) => {
  //       console.log(res);
  //       setGuests(
  //         res.data.map((guest) => {
  //           //console.log(room);
  //           //room.test = "blank";
  //           return guest;
  //         })
  //       );
  //     });
  //   };
  //   loadGuests();
  // }, []);

  useEffect(() => {
    if (props.type === "update") {
      console.log("UPDATE");
      console.log(props.selected);
      setFormObject({
        number: props.selected.number,
        name: props.selected.name,
        rate: props.selected.rate,
        capacity: props.selected.capacity,
      });
      // setGuest(props.selected.guesyId);
    }
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // function deleteRoom() {
  //   API.deleteRoom(props.selected.id);
  //   props.close();
  // }

  const firstBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Enter guest information</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-number"
          autoComplete="off"
          label="Number"
          name="number"
          value={formObject.number}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-name"
          label="Name"
          name="name"
          value={formObject.name}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-rate"
          label="rate"
          name="rate"
          value={formObject.rate}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-capacity"
          label="capacity"
          name="capacity"
          value={formObject.capacity}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
        />
        {/* <InputLabel id="guest-select-outlined-label">Pick Guest</InputLabel>
        <Select
          labelId="guest-select-outlined-label"
          id="guest-select-outlined"
          value={guest}
          onChange={handleChange}
          label="Guest"
        >
          {guests.map((guest) => {
            return (
              <MenuItem key={guest._id} value={guest._id}>
                {guest._id}
              </MenuItem>
            );
          })}
        </Select> */}
      </form>
      <Button
        onClick={() => {
          console.log(formObject);
          API.saveRoom({
            room: formObject,
          });
          setFormObject({});
          props.close();
        }}
      >
        Submit
      </Button>
    </div>
  );
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {firstBody}
      </Modal>
    </div>
  );
}
