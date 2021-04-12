import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RoomCard from "../components/Card";
import API from "../utils/API";
import Buttons from "../components/CardButtons";
import Capacity from "../components/Capacity";
import RoomModal from "../components/RoomModal";
import Heading from "../components/ Heading";

const useStyles = makeStyles((theme) => ({
  background: {
    color: "pink",
  },
}));

export default function Rooms() {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState([]);
  const [type, setType] = useState("");
  const [selected, setSelected] = useState({});
  const handleOpen = (type, selected = {}) => {
    console.log("Room.js",type, selected);
    setType(type);
    setSelected(selected);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadRooms = () => {
      API.getRooms().then((res) => {
        console.log("Room Api", res);
        setRooms(
          res.data.map((room) => {
            console.log("Room: ", room);
            return {
              number: room.number,
              name: room.name,
              rate: room.rate,
              capacity: room.capacity,
              id: room._id,
              //guests: room.guests.lastName,
            };
          })
        );
      });
    };
    loadRooms();
  }, [open]);

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
            const costA = guest.activities.reduce(
              (sum, curr) => sum + curr.cost,
              0
            );

            const rent = duration * guest.reservation.room.rate;

            const costS = guest.purchases.reduce(
              (sum, curr) => sum + curr.cost,
              0
            );
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
              activities: guest.activities,
              purchases: guest.purchases,
              rent: rent,
              tab: `$ ${costA + rent + costS}`,
              costA: costA,
              costS: costS,
              room: guest.reservation.room.name,
              roomId: guest.reservation.room._id,
            };
          })
        );
      });
    };
    loadGuests();
  }, []);

  const addRoomRecord = (newRoom) => setRooms([...rooms, newRoom]);

  return (
    <>
      <Heading heading="Rooms" />

      <Capacity rooms={rooms} guests={guests} />
      <RoomCard rooms={rooms} guests={guests} open={handleOpen} />
      <Buttons open={handleOpen} />
      <RoomModal
        open={open}
        type={type}
        selected={selected}
        close={handleClose}
      />
    </>
  );
}
