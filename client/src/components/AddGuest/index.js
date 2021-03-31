import React from "react";
import API from "../../utils/API";

// This file exports the Input, TextArea, and FormBtn components
let i = 0;

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
  });

  const validForm = () =>
    form.firstName.length && form.lastName.length && form.country.length;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = () => {
    // if (!validForm()) return;
    form.id = i++;
    form.role = "manager";
    API.saveGuest(form)
      .then((res) => {
        console.log("Save", res);
        //props.addGuestRecord(res.data);
        props.addGuestRecord(form);
      }) // ENSURE saveGust() returns newly added guest
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Input onChange={handleInputChange} name="firstName" />
      <Input onChange={handleInputChange} name="lastName" />

      <Input onChange={handleInputChange} name="country" />
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
