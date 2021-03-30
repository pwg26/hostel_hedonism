import React, { useState, useEffect } from "react";
import GuestTable from "../components/GuestTable";

import GuestButtons from "../components/GuestButtons";

import API from "../utils/API";

function Guests() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    console.log("Loaded", rows);
    loadGuests();
  }, []);

  function createData(
    id,
    last_name,
    first_name,
    country,
    room,
    checked_in,
    date_in,
    date_out,

    tab,
    paid
  ) {
    const duration = (new Date(date_out) - new Date(date_in)) / 8.64e7;
    return {
      id,
      last_name,
      first_name,
      country,
      room,
      checked_in,
      date_in,
      date_out,
      duration,
      tab,
      paid,
    };
  }

  const rows = [
    createData(
      "1",
      "Tots",
      "Mgotes",
      "Narnia",
      "Pastor",
      "Yes",
      1,
      2,
      2000,
      "Yes"
    ),
  ];

  function loadGuests() {
    const room = { number: 1, name: "sierra", rate: 60, capacity: 12 };
    const reservation = { room: 1, checkIn: "5/12/21", checkOut: "5/14/21" };
    const guest = { first: "charles", last: "zoeller", country: "USA" };

    API.getGuests().then((res) => {
      let guest1 = res.data[0];
      console.log(typeof guest1.reservations[0].checkIn);
      console.log(Date(guest1.reservations[0].checkIn));
      const dayIn = new Date(guest1.reservations[0].checkIn);
      const dayOut = new Date(guest1.reservations[0].checkOut);
      rows.push(
        createData(
          guest1._id,
          guest1.lastName,
          guest1.firstName,
          guest1.country,
          guest1.reservations[0].room.name,
          guest1.checkedIn ? "Yes" : "No",
          dayIn.toDateString(),
          dayOut.toDateString(),
          100,
          guest1.paid ? "Yes" : "No"
        )
      );
      console.log(rows);
      setGuests(rows);
    });
    API.saveGuest({
      room: room,
      reservation: reservation,
      guest: guest,
    }).then((res) => console.log(res));
  }
  return <GuestTable rows={guests} />;
}

export default Guests;
