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

const useStyles = makeStyles((theme) => ({
  background: {
    color: "pink",
  },
}));

export default function Rooms() {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [selected, setSelected] = useState({});
  const handleOpen = (type, selected = {}) => {
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
        console.log(res);
        setRooms(
          res.data.map((room) => {
            return {
              number: room.number,
              name: room.name,
              rate: room.rate,
              capacity: room.capacity,
              // guests: room.guests.lastName,
            };
          })
        );
      });
    };
    loadRooms();
  }, [, open]);

  const addRoomRecord = (newRoom) => setRooms([...rooms, newRoom]);

  return (
      <>
          
      <Capacity />
      <RoomCard cardComps={rooms} />
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
