import React, { useState, useEffect } from "react";
import Heading from "../components/ Heading";
import MenuItem from "@material-ui/core/MenuItem";
import DashAct from "../components/DashActivities";
import DashGuest from "../components/DashGuest";

// import DashPro from "../components/DashPro";
import API from "../utils/API";

export default function Dash() {
  const [activities, setActivities] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const loadActivities = () => {
      API.getActivities().then((res) => {
        console.log(res);
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
              (act) => act.startDate <= Date.now() && Date.now() <= act.endDate
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
            const activities = guest.activities.reduce(
              (sum, curr) => sum + curr.cost,
              0
            );
            const rent = duration * guest.reservation.room.rate;

            // const Cart= guest.shoppingCart.reduce(
            //   (sum, curr) => sum + curr.cost,
            //   0
            // );
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
            const purchases = guest.purchases.reduce(
              (sum, curr) => sum + curr.cost,
              0
            );
            const rent = duration * guest.reservation.room.rate;

            // const Cart= guest.shoppingCart.reduce(
            //   (sum, curr) => sum + curr.cost,
            //   0
            // );
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
              roomId: guest.reservation.room._id,
            };
          })
        );
      });
    };
    loadGuests();
  }, []);

  return (
    <>
      <Heading heading="Dashboard" />
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
