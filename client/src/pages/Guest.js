import React, { useState, useEffect } from "react";
import GuestModal from "../components/GuestModal";
import GuestTable from "../components/GuestTable";
import GuestButtons from "../components/GuestButtons";
import AddGuest from "../components/AddGuest";
import Heading from "../components/ Heading";

import API from "../utils/API";

function Guests() {
  const [guests, setGuests] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadGuests = () => {
      API.getGuests().then((res) => {
        console.log(res);
        setGuests(
          res.data.map((guest) => {
            const dayIn = new Date(guest.reservation.checkIn);
            const dayOut = new Date(guest.reservation.checkOut);
            const duration = Math.floor((dayOut - dayIn) / 8.64e7);
            //console.log(duration);
            const activities = guest.activities.reduce(
              (sum, curr) => sum + curr.cost,
              0
            );
            const rent = duration * guest.reservation.room.rate;
            //console.log(guest.reservation.room, guest.reservation.room.rate);
            return {
              firstName: guest.firstName,
              lastName: guest.lastName,
              id: guest._id,
              country: guest.country,
              dateIn: dayIn.toDateString(),
              dateOut: dayOut.toDateString(),
              duration: duration,
              paid: guest.paid ? "Yes" : "No",
              checkedIn: guest.checkedIn ? "Yes" : "No",
              activities: activities,
              rent: rent,
              tab: `$ ${activities + rent}`,
              room: guest.reservation.room.name,
            };
          })
        );
      });
    };
    loadGuests();
  }, []);

  // function createData(
  //   id,
  //   last_name,
  //   first_name,
  //   country,
  //   room,
  //   checked_in,
  //   date_in,
  //   date_out,

  //   tab,
  //   paid
  // ) {
  //   const duration = (new Date(date_out) - new Date(date_in)) / 8.64e7;
  //   return {
  //     id,
  //     last_name,
  //     first_name,
  //     country,
  //     room,
  //     checked_in,
  //     date_in,
  //     date_out,
  //     duration,
  //     tab,
  //     paid,
  //   };
  // }

  const addGuestRecord = (newGuest) => setGuests([...guests, newGuest]);
  // const room = { number: 1, name: "sierra", rate: 60, capacity: 12 };
  // const reservation = { room: 1, checkIn: "5/12/21", checkOut: "5/14/21" };
  // const guest = { first: "charles", last: "zoeller", country: "USA" };
  // API.saveGuest({
  //   room: room,
  //   reservation: reservation,
  //   guest: guest,
  // }).then((res) => console.log(res));

  //   console.log(rows);
  //   setGuests(rows);
  // });
  // mock call to submit route with test data
  // const room = { number: 1, name: "sierra", rate: 60, capacity: 12 };
  // const reservation = { room: 1, checkIn: "5/12/21", checkOut: "5/14/21" };
  // const guest = { first: "charles", last: "zoeller", country: "USA" };
  // API.saveGuest({
  //   room: room,
  //   reservation: reservation,
  //   guest: guest,
  // }).then((res) => console.log(res));

  return (
    <>
      {" "}
      <Heading heading="Guest Manager" />
      <GuestTable rows={guests} />
      <GuestButtons open={handleOpen} />
      <GuestModal open={open} close={handleClose} />
      <AddGuest addGuestRecord={addGuestRecord} />
    </>
  );
}

export default Guests;
