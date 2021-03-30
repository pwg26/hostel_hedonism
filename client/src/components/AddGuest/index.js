import React from "react";

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

function handleInputChange(event) {
  const { name, value } = event.target;
  setFormObject({ ...formObject, [name]: value });
}

function handleFormSubmit(event) {
  event.preventDefault();
  if (
    formObject.first &&
    formObject.last &&
    formObject.country &&
    formObject.datein
  ) {
    API.saveGuest({
      first: formObject.first,
      last: formObject.last,
      country: formObject.country,
      datein: formObject.datein,
    })
      .then((res) => loadGuests())
      .catch((err) => console.log(err));
  }
}

function AddGuest() {
  return (
    <>
      <Input onChange={handleInputChange} name="fist" />
      <Input onChange={handleInputChange} name="last" />
      <Input onChange={handleInputChange} name="country" />
      <Input onChange={handleInputChange} name="datein" />
      {/* <Input
            onChange={handleInputChange}
                name="datein"
                /> */}

      <FormBtn
        // disabled={!(formObject.author && formObject.title)}
        onClick={handleFormSubmit}
      >
        Submit Book
      </FormBtn>
    </>
  );
}
