import React, { useState, useEffect } from "react";
import Heading from "../components/ Heading";
import MenuItem from "@material-ui/core/MenuItem";
import DashAct from "../components/DashActivities";
import DashGuest from "../components/DashGuest";

// import DashPro from "../components/DashPro";
import API from "../utils/API";

import Paper from "@material-ui/core/Paper";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation, EventTracker } from "@devexpress/dx-react-chart";

class TestChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      info: props["guests"],
      targetItem: undefined,
    };
  }

  render() {
    const { info: chartData, targetItem } = this.state;
    const data = this.props.guests;
    console.log(chartData, data, targetItem);

    return (
      <Paper
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          float: "right",
        }}
      >
        <Chart data={data}>
          <PieSeries valueField="val" argumentField="type" innerRadius={0.6} />\
          <Title text="Total income Breakdown" />
          <Animation />
          <Legend />
        </Chart>
      </Paper>
    );
  }
}

export default function Dash() {
  const [activities, setActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [guests, setGuests] = useState([]);
  const [chartData, setChartData] = useState([{}]);

  useEffect(() => {
    const loadActivities = () => {
      API.getActivities().then((res) => {
        setActivities(
          res.data
            .map((activity) => {
              return {
                title: activity.title,
                cost: activity.cost,
                startDate: activity.startDate,
                endDate: activity.endDate,
                location: activity.location,
                notes: activity.notes,
                id: activity._id,
              };
            })
            .filter(
              (act) =>
                new Date(act.startDate).getDate() <= new Date().getDate() &&
                new Date(act.startDate).getDate() >= new Date().getDate()
            )
        );
      });
    };
    loadActivities();
  }, []);

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

  useEffect(() => {
    const act = guests.reduce((prev, curr) => (prev += curr.costA), 0);
    const store = guests.reduce((prev, curr) => (prev += curr.costS), 0);
    const rent = guests.reduce((prev, curr) => (prev += curr.rent), 0);
    console.log(act, store, rent);
    setChartData([
      { type: "Activities", val: act },
      { type: "Store Purchases", val: store },
      { type: "Rooms", val: rent },
    ]);
  }, [guests]);

  return (
    <>
      <Heading heading="Dashboard" />
      <TestChart guests={chartData} />
      <DashAct acts={activities} />
      <DashGuest guests={guests} />
    </>
  );
}

// API.getActivities().then((res) => {
//   console.log(res);
//   setActivities(
//     const activitiesToday = res.data.filter(activity => activity.startDate === 1);
//     activitiesToday.map(activity) => {
//       activity.name

//     }

//   );
// }
{
  /* <List>
        {props.activity.map((activity) => {
          return (
            <ListItem>
              <ListItemText primary={{ activity }} />
            </ListItem>
          );
        })}
      </List> */
}
