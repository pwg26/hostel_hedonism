import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";

// This file exports the Input, TextArea, and FormBtn components

function FormInput(props) {
  return (
    <div>
      <Input {...props} />
    </div>
  );
}

function FormBtn(props) {
  return (
    <Button {...props} variant="contained" color="primary">
      {props.children}
    </Button>
  );
}

export default function AddGuest(props) {
  const [guests, setGuests] = useState([]);
  const [formObject, setFormObject] = useState({});

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = () => {
    API.getGuests().then((res) => {
      console.log(res);
      setGuests(
        res.data.map((guest) => {
          const dayIn = new Date(guest.reservations[0].checkIn);
          const dayOut = new Date(guest.reservations[0].checkOut);
          guest.duration = (new Date(dayIn) - new Date(dayOut)) / 8.64e7;
          return guest;
        })
      );
    });
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    API.saveGuest({
      firstName: formObject.firstName,
      lastName: formObject.lastName,
      country: formObject.country,
      // dateIn: formObject.dateIn,
    })
      .then((res) => loadGuests())
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form>
        first
        <FormInput onChange={handleInputChange} name="firstName" />
        last
        <FormInput onChange={handleInputChange} name="lastName" />
        country
        <FormInput onChange={handleInputChange} name="country" />
        {/* <FormInput onChange={handleInputChange} name="dateIn" type="datetime" /> */}
        {/* <Input
            onChange={ehandleInputChange}
                name="datein"
                /> */}
        <FormBtn
          // disabled={!(formObject.author && formObject.title)}
          onClick={handleFormSubmit}
        >
          Submit Book
        </FormBtn>
      </form>
    </div>
  );
}
