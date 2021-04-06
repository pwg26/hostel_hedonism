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

export default function ItemModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [first, setFirst] = useState(true);
  const [formObject, setFormObject] = useState({
    name: "",
    description: "",
    cost: "",
    stock: "",
    quantity: "",
  });

  const [markers, setMarkers] = useState({
    name: false,
    description: false,
    cost: false,
    stock: false,
  });
  const [guests, setGuests] = useState([]);
  const [guest, setGuest] = useState("");
  const [over, setOver] = useState(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    setGuest(event.target.value);
  };

  useEffect(() => {
    const loadGuests = () => {
      API.getGuests().then((res) => {
        console.log(res);
        setGuests(
          res.data.map((guest) => {
            //console.log(room);
            //room.test = "blank";
            return guest;
          })
        );
      });
    };
    loadGuests();
  }, []);

  // useEffect(() => {
  //   if (props.type === "Buy") {
  //     console.log("BUY");
  //   setFormObject({
  //     guest: props.selected.guest,
  //     quantity: props.selected.quantity,
  //   });
  //   setGuest(props.selected.guestId);

  //   // setGuest(props.selected.guesyId);
  // }, [props.type, props.selected]});

  function clearForm() {
    setFormObject({
      name: "",
      description: "",
      cost: "",
      stock: "",
      quantity: "",
    });
  }

  function submitForm() {
    let newMarks = {};
    newMarks.name = formObject.name === "" ? true : false;

    newMarks.description = formObject.description === "" ? true : false;
    newMarks.cost = formObject.cost === "" ? true : false;
    newMarks.stock = formObject.stock === "" ? true : false;
    setMarkers({ ...markers, ...newMarks });

    console.log(markers, formObject, guest, props);
    if (
      newMarks.name ||
      newMarks.description ||
      newMarks.cost ||
      newMarks.stock
    ) {
      console.log("Missing a field");
    } else {
      if (props.type === "Add") {
        API.saveItem({
          item: formObject,
        }).then(() => props.close());
      } else if (props.type === "Update") {
        API.updateItem({
          id: props.selected.id,
          item: formObject,
        }).then(() => props.close());
      } else if (props.type === "Buy") {
        let num = Number.parseInt(formObject.quantity);
        const item = {
          name: props.selected.name,
          description: props.selected.description,
          cost: props.selected.cost,
          stock: props.selected.stock - num,
        };
        API.updateItem({ id: props.selected.id, item: item });
        console.log(num);
        for (let i = 0; i < num; i++) {
          API.addToGuest(guest, props.selected.id, "Store").then(() =>
            props.close()
          );
        }
      }
      clearForm();
    }
  }

  useEffect(() => {
    if (props.type === "Update") {
      console.log("UPDATE");
      console.log(props.selected);
      setFormObject({
        name: props.selected.name,
        description: props.selected.description,
        cost: props.selected.cost,
        stock: props.selected.stock,
      });
      // setGuest(props.selected.guesyId);
    }
    if (props.type === "Buy") {
      console.log("BUY");
      setFormObject({
        guest: props.selected.guest,
        quantity: props.selected.quantity,
      });
      setGuest(props.selected.guestId);
    }
  }, [props.type, props.selected]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }
  function handleQuantityChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    if (value > props.selected.stock) {
      setFormObject({ ...formObject, [name]: props.selected.stock });
      setOver(true);
    } else {
      setFormObject({ ...formObject, [name]: value });
      setOver(false);
    }
  }

  function deleteItem() {
    API.deleteItem(props.selected.id);
    clearForm();
    props.close();
  }

  const firstBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{props.type}</h2>
      <h2 id="simple-modal-title">Enter Item information</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          name="name"
          value={formObject.name}
          helperText={markers.name ? "Required" : " "}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
          error={markers.name}
        />
        <TextField
          id="outlined-desctiption"
          label="Description"
          name="description"
          helperText={markers.description ? "Required" : " "}
          value={formObject.description}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
          error={markers.description}
        />
        <TextField
          id="outlined-cost"
          type="number"
          label="Cost"
          helperText={markers.cost ? "Required" : " "}
          name="cost"
          value={formObject.cost}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
          error={markers.cost}
        />
        <TextField
          id="outlined-stock"
          type="number"
          label="stock"
          helperText={markers.stock ? "Required" : " "}
          type="number"
          name="stock"
          value={formObject.stock}
          autoComplete="off"
          variant="outlined"
          onChange={handleInputChange}
          error={markers.stock}
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
                {guest._id}å
              </MenuItem>
            );
          })}
        </Select> */}
      </form>
      <Button onClick={submitForm}>Submit</Button>
      {props.type === "Update" ? (
        <Button onClick={deleteItem}>Delete Item</Button>
      ) : (
        <></>
      )}
    </div>
  );

  const secondBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Purchase Item</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <InputLabel id="guest-select-outlined-label">Purchaser</InputLabel>
        <Select
          labelId="guest-select-outlined-label"
          id="guest-select-outlined"
          value={guest}
          onChange={handleChange}
          label="Purchaser"
        >
          {guests.map((guest) => {
            return (
              <MenuItem key={guest._id} value={guest._id}>
                {guest.lastName}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          id="outlined-quantity"
          autoComplete="off"
          label="Quantity"
          name="quantity"
          type="number"
          helperText={markers.quantity ? "Required" : " "}
          helperText={over ? "Quantity cannot exceed stock" : " "}
          value={formObject.quantity}
          variant="outlined"
          onChange={handleQuantityChange}
          error={markers.quantity || over}
        />
      </form>
      <Button onClick={submitForm}>Submit</Button>
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
        {props.type !== "Buy" ? firstBody : secondBody}
      </Modal>
    </div>
  );
}
