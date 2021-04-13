import React, { useState, useEffect } from "react";
import Heading from "../components/ Heading";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DashAct from "../components/DashActivities";
import DashGuest from "../components/DashGuest";

import { ResponsivePie } from "@nivo/pie";

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
      // style={{
      //   width: "50%",
      //   marginLeft: "auto",
      //   marginRight: "auto",
      //   float: "right",
      // }}
      >
        <Chart data={data}>
          <PieSeries valueField="val" argumentField="type" innerRadius={0.6} />
          <Title text="Total income Breakdown" />
          <Animation />
          <Legend />
        </Chart>
      </Paper>
    );
  }
}

function Ledger(props) {
  let tot = props.data.reduce((prev, curr) => (prev += curr.val), 0);
  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        Ledger
      </Typography>
      <Table size="small" aria-label="expenses">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((entry, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {entry.type}
              </TableCell>
              <TableCell align="right">${entry.val}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell component="th" scope="row">
              Total
            </TableCell>

            <TableCell align="right">${tot}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
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
      {
        id: "activities",
        label: "Activities",
        value: act,
        color: "hsl(47, 70%, 50%)",
      },
      {
        id: "storepurch",
        label: "Store Purchases",
        value: store,
        color: "hsl(305, 70%, 50%)",
      },
      {
        id: "rent",
        label: "Reservations",
        value: rent,
        color: "hsl(324, 70%, 50%)",
      },
    ]);
  }, [guests]);

  // useEffect(() => {
  //   const act = guests.reduce((prev, curr) => (prev += curr.costA), 0);
  //   const store = guests.reduce((prev, curr) => (prev += curr.costS), 0);
  //   const rent = guests.reduce((prev, curr) => (prev += curr.rent), 0);
  //   console.log(act, store, rent);
  //   setChartData([
  //     { type: "Activities", val: act },
  //     { type: "Store Purchases", val: store },
  //     { type: "Rooms", val: rent },
  //   ]);
  // }, [guests]);

  // ============================================================================ Vivo

  // <ResponsivePie
  //   data={guests}
  //   margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
  //   innerRadius={0.5}
  //   padAngle={0.7}
  //   cornerRadius={3}
  //   colors={{ scheme: "nivo" }}
  //   borderWidth={1}
  //   borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
  //   radialLabelsSkipAngle={10}
  //   radialLabelsTextColor="#333333"
  //   radialLabelsLinkColor={{ from: "color" }}
  //   sliceLabelsSkipAngle={10}
  //   sliceLabelsTextColor="#333333"
  //   defs={[
  //     {
  //       id: "dots",
  //       type: "patternDots",
  //       background: "inherit",
  //       color: "rgba(255, 255, 255, 0.3)",
  //       size: 4,
  //       padding: 1,
  //       stagger: true,
  //     },
  //     {
  //       id: "lines",
  //       type: "patternLines",
  //       background: "inherit",
  //       color: "rgba(255, 255, 255, 0.3)",
  //       rotation: -45,
  //       lineWidth: 6,
  //       spacing: 10,
  //     },
  //   ]}
  //   fill={[
  //     {
  //       match: {
  //         type: "Activities",
  //       },
  //       id: "dots",
  //     },
  //     {
  //       match: {
  //         type: "Store Purchases",
  //       },
  //       id: "dots",
  //     },
  //     {
  //       match: {
  //         type: "Rooms",
  //       },
  //       id: "dots",
  //     },
  //   ]}
  //   legends={[
  //     {
  //       anchor: "bottom",
  //       direction: "row",
  //       justify: false,
  //       translateX: 0,
  //       translateY: 56,
  //       itemsSpacing: 0,
  //       itemWidth: 100,
  //       itemHeight: 18,
  //       itemTextColor: "#999",
  //       itemDirection: "left-to-right",
  //       itemOpacity: 1,
  //       symbolSize: 18,
  //       symbolShape: "circle",
  //       effects: [
  //         {
  //           on: "hover",
  //           style: {
  //             itemTextColor: "#000",
  //           },
  //         },
  //       ],
  //     },
  //   ]}
  // />

  console.log({ guests });

  return (
    <>
      <Heading heading="Dashboard" />
      {/* <Box
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          float: "right",
        }}
      > */}
      <div style={{ height: "500px" }}>
        <ResponsivePie
          data={chartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "activities",
              },
              id: "dots",
            },
            {
              match: {
                id: "storepurch",
              },
              id: "dots",
            },
            {
              match: {
                id: "rent",
              },
              id: "dots",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
      {/* <TestChart guests={chartData} />
        <Ledger data={chartData} /> */}
      {/* </Box> */}
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
