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

const Luxon = new LuxonUtils();

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
  const [markers, setMarkers] = useState({
    firstName: false,
    lastName: false,
    country: false,
    room: false,
    checkIn: false,
    checkOut: false,
  });
  const [rooms, setRooms] = useState([]);
  const [available, setAvailable] = useState([]);
  const [room, setRoom] = useState("");

  const [checkInDate, handleCheckinChange] = useState(Luxon.date());
  const [checkOutDate, handleCheckoutChange] = useState(
    Luxon.addDays(Luxon.date(), 1)
  );

  const limit = Luxon.addDays(Luxon.date(), 1);

  const handleChange = (event) => {
    setRoom(event.target.value);
  };

  function clearForm() {
    setFormObject({
      firstName: "",
      lastName: "",
      country: "",
    });
    handleCheckinChange(Luxon.date());
    handleCheckoutChange(Luxon.addDays(Luxon.date(), 1));
    setAvailable(rooms);
    setRoom("");
    setFirst(true);
    setMarkers({
      firstName: false,
      lastName: false,
      country: false,
      room: false,
      checkIn: false,
      checkOut: false,
    });
  }

  function changePage() {
    let newMarks = {};
    newMarks.firstName = formObject.firstName === "" ? true : false;

    newMarks.lastName = formObject.lastName === "" ? true : false;
    newMarks.country = formObject.country === "" ? true : false;

    setMarkers({ ...markers, ...newMarks });
    console.log(markers, formObject);
    if (newMarks.firstName || newMarks.lastName || newMarks.country) {
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
      API.getRoomInfo().then((res) => {
        console.log("Joined");
        console.log(res.data);
        setRooms(
          res.data.map((room) => {
            //console.log(room);
            //room.test = "blank";
            return room;
          })
        );
        setAvailable(
          res.data.map((room) => {
            //console.log(room);
            //room.test = "blank";
            return room;
          })
        );
      });
    };
    loadRooms();
  }, [props.open]);

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
      dateChanger(
        Luxon.date(props.selected.dateIn),
        Luxon.date(props.selected.dateOut)
      );
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

  function dateChanger(checkin, checkout, change) {
    console.log(Luxon);
    checkin = Luxon.date(checkin);
    checkout = Luxon.date(checkout);
    console.log(checkin, checkout);
    console.log(checkin.day, checkout.day);
    console.log(rooms);
    if (checkin.day >= checkout.day && change === "in") {
      console.log("Checkin");
      checkout = Luxon.addDays(Luxon.date(checkin), 1);
      console.log(checkout);
      handleCheckoutChange(checkout);
    }
    if (checkin.day >= checkout.day && change === "out") {
      console.log("Checkout");
      checkin = Luxon.addDays(Luxon.date(checkout), -1);
      handleCheckinChange(checkin);
    }
    let filter = rooms.filter((room) => {
      let occupied = room.guests.filter((guest) => {
        console.log(guest);
        return (
          (Luxon.date(guest.checkOut) > checkin &&
            Luxon.date(guest.checkIn) < checkin) ||
          (Luxon.date(guest.checkOut) > checkout &&
            Luxon.date(guest.checkIn) < checkout)
        );
      });
      console.log("occupants: " + occupied.length);
      console.log("capacity: " + room.capacity);
      console.log(occupied);
      return room.capacity > occupied.length;
    });
    console.log(filter);
    setAvailable(filter);
    handleCheckinChange(checkin);
    handleCheckoutChange(checkout);
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
          helperText={markers.firstName ? "Required" : " "}
          name="firstName"
          value={formObject.firstName}
          variant="outlined"
          onChange={handleInputChange}
          error={markers.firstName}
        />
        <TextField
          id="outlined-lastname"
          autoComplete="off"
          label="Last Name"
          helperText={markers.lastName ? "Required" : " "}
          name="lastName"
          value={formObject.lastName}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
          error={markers.lastName}
        />
        <TextField
          id="outlined-country"
          autoComplete="off"
          label="Country"
          helperText={markers.country ? "Required" : " "}
          name="country"
          value={formObject.country}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
          error={markers.country}
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
          error={markers.room}
        >
          {available.map((room) => {
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
          onChange={(day) => dateChanger(day, checkOutDate, "in")}
        />
        {/* <DatePicker
          minDate={limit}
          value={checkOutDate}
          onChange={(day) => dateChanger(checkInDate, day, "out")}
        /> */}
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <DatePicker
          minDate={limit}
          value={checkOutDate}
          onChange={(day) => dateChanger(checkInDate, day, "out")}
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
