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
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState(true);

  const [markers, setMarkers] = useState({
    number: false,
    name: false,
    rate: false,
    capacity: false,
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
  function clearForm() {
    setFormObject({
      number: "",
      name: "",
      rate: "",
      capacity: "",
    });
  }

  function submitForm() {
    let newMarks = {};
    newMarks.number = formObject.number === "" ? true : false;

    newMarks.name = formObject.name === "" ? true : false;
    newMarks.rate = formObject.rate === "" ? true : false;
    newMarks.capacity = formObject.capacity === "" ? true : false;
    setMarkers({ ...markers, ...newMarks });
    console.log(markers, formObject);
    if (
      newMarks.number ||
      newMarks.name ||
      newMarks.rate ||
      newMarks.capacity
    ) {
      console.log("Missing a field");
    } else {
      console.log("TYPE:", props.type);
      props.type === "Add"
        ? API.saveRoom({
            room: formObject,
          }).then(() => props.close())
        : API.updateRoom({
            id: props.selected.id,
            room: formObject,
          }).then(() => props.close());
      clearForm();
    }
  }

  useEffect(() => {
    if (props.type === "Update") {
      console.log("UPDATE");
      console.log(props.selected);
      setFormObject({
        number: props.selected.number,
        name: props.selected.name,
        rate: props.selected.rate,
        capacity: props.selected.capacity,
      });
      // setGuest(props.selected.guesyId);
      API.getRoomInfo().then((res) => {
        setRooms(res.data.map((room) => room));
        let room = res.data.filter(({ _id }) => _id === props.selected.id)[0];
        console.log("DEL:", room);
        setStatus(room.guests.length !== 0);

        console.log(status);
      });
    } else {
      clearForm();
    }
  }, [props.type, props.selected]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function deleteRoom() {
    let room = rooms.filter(({ _id }) => _id === props.selected.id)[0];
    console.log("DEL:", room);
    if (room.guests.length === 0) {
      API.deleteRoom(props.selected.id);
      clearForm();
      props.close();
    } else {
      console.log("Can't delete occupied rooms");
    }
  }

  const firstBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{props.type}</h2>
      <h2 id="simple-modal-title">Enter Room information</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-number"
          autoComplete="off"
          label="Number"
          name="number"
          type="number"
          helperText={markers.number ? "Required" : " "}
          value={formObject.number}
          variant="outlined"
          onChange={handleInputChange}
          error={markers.number}
        />
        <TextField
          id="outlined-name"
          label="Name"
          name="name"
          helperText={markers.name ? "Required" : " "}
          value={formObject.name}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
          error={markers.name}
        />
        <TextField
          id="outlined-rate"
          label="rate"
          name="rate"
          type="number"
          helperText={markers.rate ? "Required" : " "}
          value={formObject.rate}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
          error={markers.rate}
        />
        <TextField
          id="outlined-capacity"
          label="capacity"
          name="capacity"
          type="number"
          helperText={markers.name ? "capacity" : " "}
          value={formObject.capacity}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
          error={markers.capacity}
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
      <Button onClick={submitForm}>Submit</Button>
      {props.type === "Update" ? (
        <Button onClick={deleteRoom} disabled={status}>
          Delete Room
        </Button>
      ) : (
        <></>
      )}
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
