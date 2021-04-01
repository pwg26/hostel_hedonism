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

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadRooms = () => {
      API.getRooms().then((res) => {
        console.log(res);
        setRooms(
          res.data.map((room) => {
            return room;
          })
        );
      });
    };
    loadRooms();
  }, []);

  const addRoomRecord = (newRoom) => setRooms([...rooms, newRoom]);

  return <RoomCard cardComps={rooms} />;
}
