import React from "react";
import API from "../../utils/API";

// This file exports the Input, TextArea, and FormBtn components

function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

function FormBtn(props) {
  return (
    <button
      {...props}
      style={{ float: "right", marginBottom: 10 }}
      className="btn btn-success"
    >
      {props.children}
    </button>
  );
}

export default function AddGuest(props) {
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    country: "",
    dateIn: "",
  });

  const validForm = () =>
    form.firstName.length &&
    form.lastName.length &&
    form.country.length &&
    form.dateIn.length;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = () => {
    // if (!validForm()) return;

    API.saveGuest(form)
      .then((res) => {
        console.log(res);
        props.addGuestRecord(res.data);
      }) // ENSURE saveGust() returns newly added guest
      .catch((err) => console.log(err));
  };

  return (
    <div>
      first
      <Input onChange={handleInputChange} name="firstName" />
      last
      <Input onChange={handleInputChange} name="lastName" />
      country
      <Input onChange={handleInputChange} name="country" />
      datein
      <Input onChange={handleInputChange} name="dateIn" type="datetime" />
      {/* <Input
            onChange={ehandleInputChange}
                name="datein"
                /> */}
      <FormBtn
        // disabled={!(formObject.author && formObject.title)}
        onClick={handleFormSubmit}
      >
        Submit
      </FormBtn>
    </div>
  );
}
