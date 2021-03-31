import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
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
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const handleChange = (event) => {
    setRoom(event.target.value);
    setFormObject({ ...formObject, room: event.target.value });
  };

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
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  const firstBody = (
    <div style={modalStyle} className={classes.paper}>
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
      <Button
        onClick={() => {
          console.log(formObject);
          setFirst(false);
        }}
      >
        NEXT
      </Button>
    </div>
  );
  const secondBody = (
    <div style={modalStyle} className={classes.paper}>
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
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>

      <Button onClick={() => setFirst(true)}>BACK</Button>
      <Button
        onClick={() => {
          setFirst(true);
          setFormObject({});
          props.close();
        }}
      >
        CLOSE
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
        {first ? firstBody : secondBody}
      </Modal>
    </div>
  );
}
