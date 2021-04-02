import React, { useState, useEffect } from "react";
import GuestModal from "../components/GuestModal";
import GuestTable from "../components/GuestTable";
import GuestButtons from "../components/GuestButtons";
import Heading from "../components/ Heading";

import API from "../utils/API";

function Guests() {
  const [guests, setGuests] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [selected, setSelected] = useState({});
  const [filtered, setFiltered] = useState([]);
  const handleOpen = (type, selected = {}) => {
    setType(type);
    setSelected(selected);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadGuests = () => {
      API.getGuests().then((res) => {
        //console.log(res);
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
              duration: `${duration} days`,
              paid: guest.paid ? "Yes" : "No",
              checkedIn: guest.checkedIn ? "Yes" : "No",
              activities: activities,
              rent: rent,
              tab: `$ ${activities + rent}`,
              room: guest.reservation.room.name,
              roomId: guest.reservation.room._id,
            };
          })
        );
        setFiltered(
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
              duration: `${duration} days`,
              paid: guest.paid ? "Yes" : "No",
              checkedIn: guest.checkedIn ? "Yes" : "No",
              activities: activities,
              rent: rent,
              tab: `$ ${activities + rent}`,
              room: guest.reservation.room.name,
              roomId: guest.reservation.room._id,
            };
          })
        );
      });
    };
    loadGuests();
  }, [open]);

  return (
    <>
      {" "}
      <Heading heading="Guest Manager" />
      <GuestTable rows={filtered} open={handleOpen} />
      <GuestButtons open={handleOpen} guests={guests} filter={setFiltered} />
      <GuestModal
        open={open}
        type={type}
        selected={selected}
        close={handleClose}
      />
    </>
  );
}

export default Guests;
