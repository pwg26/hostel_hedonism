import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import LuxonUtils from "@date-io/luxon"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

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

export default function GuestModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [first, setFirst] = useState(true);
  const [formObject, setFormObject] = useState({
    firstName: "",
    lastName: "",
    country: "",
  });
  const [markers, setMarkers] = useState();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");

  const [checkInDate, handleCheckinChange] = useState(new Date());
  const [checkOutDate, handleCheckoutChange] = useState(
    new Date(Date.now() + 8.64e7)
  );

  const handleChange = (event) => {
    setRoom(event.target.value);
  };

  function clearForm() {
    setFormObject({
      firstName: "",
      lastName: "",
      country: "",
    });
    handleCheckinChange(new Date());
    handleCheckoutChange(new Date(Date.now() + 8.64e7));
    setRoom("");
    setFirst(true);
  }

  function changePage() {
    if (
      formObject.firstName === "" ||
      formObject.lastName === "" ||
      formObject.country === ""
    ) {
      console.log("Missing a field");
    } else {
      console.log(formObject);
      setFirst(false);
    }
  }

  function submitForm() {
    setFirst(true);
    console.log(formObject);
    console.log(`CheckIn: ${checkInDate}\nCheckout: ${checkOutDate}`);
    props.type === "Add"
      ? API.saveGuest({
          guest: formObject,
          reservation: {
            room: room,
            checkIn: checkInDate,
            checkOut: checkOutDate,
          },
        }).then(() => props.close())
      : API.updateGuest({
          id: props.selected.id,
          guest: formObject,
          reservation: {
            room: room,
            checkIn: checkInDate,
            checkOut: checkOutDate,
          },
        }).then(() => props.close());
    clearForm();
  }

  useEffect(() => {
    const loadRooms = () => {
      API.getRooms().then((res) => {
        console.log(res);
        setRooms(
          res.data.map((room) => {
            //console.log(room);
            //room.test = "blank";
            return room;
          })
        );
      });
    };
    loadRooms();
  }, []);

  useEffect(() => {
    clearForm();
    if (props.type === "Update") {
      console.log("UPDATE");
      console.log(props.selected);
      setFormObject({
        firstName: props.selected.firstName,
        lastName: props.selected.lastName,
        country: props.selected.country,
      });
      setRoom(props.selected.roomId);
      handleCheckinChange(new Date(props.selected.dateIn));
      handleCheckoutChange(new Date(props.selected.dateOut));
    }
  }, [props.selected, props.type]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function deleteGuest() {
    API.deleteGuest(props.selected.id);
    clearForm();
    props.close();
  }

  const firstBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{props.type}</h2>
      <h2 id="simple-modal-title">Enter guest information</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-firstname"
          autoComplete="off"
          label="First Name"
          name="firstName"
          value={formObject.firstName}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-lastname"
          label="Last Name"
          name="lastName"
          value={formObject.lastName}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-country"
          label="Country"
          name="country"
          value={formObject.country}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
        />
      </form>
      <Button onClick={changePage}>NEXT</Button>
      {props.type === "Update" ? (
        <Button onClick={deleteGuest}>Delete Guest</Button>
      ) : (
        <></>
      )}
    </div>
  );
  const secondBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{props.type}</h2>
      <h2 id="simple-modal-title">Enter reservation information</h2>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="room-select-outlined-label">Room</InputLabel>
        <Select
          labelId="room-select-outlined-label"
          id="room-select-outlined"
          value={room}
          onChange={handleChange}
          label="Room"
        >
          {rooms.map((room) => {
            return (
              <MenuItem key={room._id} value={room._id}>
                {room.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <DatePicker
          disablePast
          value={checkInDate}
          onChange={handleCheckinChange}
        />
        <DatePicker
          minDate={checkOutDate}
          value={checkOutDate}
          onChange={handleCheckoutChange}
        />
      </MuiPickersUtilsProvider>

      <Button onClick={() => setFirst(true)}>BACK</Button>
      {props.type === "Update" ? (
        <Button onClick={deleteGuest}>Delete Guest</Button>
      ) : (
        <></>
      )}
      <Button onClick={submitForm}>SUBMIT</Button>
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
        {first ? firstBody : secondBody}
      </Modal>
    </div>
  );
}
