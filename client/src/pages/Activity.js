import Calendar from "../components/Calendar";
import React, { useState, useEffect } from "react";

import GuestModal from "../components/GuestModal";
import GuestTable from "../components/GuestTable";
import GuestButtons from "../components/GuestButtons";
import AddGuest from "../components/AddGuest";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import Heading from "../components/ Heading";

function activity() {
  // const [activities, setActivities] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [type, setType] = useState("");
  // const [selected, setSelected] = useState({});
  // const handleOpen = (type, selected = {}) => {
  //   setType(type);
  //   setSelected(selected);
  //   setOpen(true);
  // };

  // // const handleClose = () => {
  // //   setOpen(false);
  // // };

  // useEffect(() => {
  //   const loadActivities = () => {
  //     API.getActivities().then((res) => {
  //       console.log(res);
  //       setActivities(
  //         res.data.map((activity) => {
  //           return {
  //             name: activity.name,
  //             date: activity.date,
  //             cost: activity.cost,
  //             timeStart: activity.timeStart,
  //             timeEnd: activity.timeEnd,
  //             description: activity.description,
  //             id: activity._id,
  //           };
  //         })
  //       );
  //     });
  //   };
  //   loadActivities();
  // }, [open]);

  return (
    <>
      <Heading heading="Activity Manager" />
      <Calendar />
    </>
  );
}

export default activity;
