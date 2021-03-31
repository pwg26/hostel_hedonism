import axios from "axios";

export default {
  getGuests: function () {
    return axios.get("/api/guests");
  },
  saveGuest: function (guestData) {
    return axios.post("/api/guests", guestData);
  },
  saveItem: function (itemData) {
    return axios.post("/api/items", itemData);
  },
};

// const room = { number: 1, name: "sierra", rate: 60, capacity: 12 };
// const reservation = { room: 1, checkIn: "5/12/21", checkOut: "5/14/21" };
// const guest = { first: "charles", last: "zoeller", country: "USA" };

// API.getGuests().then((res) => {
//   let guest1 = res.data[0];
//   console.log(guest1);
//   rows.push(
//     createData(
//       guest1._id,
//       guest1.lastName,
//       guest1.firstName,
//       guest1.country,
//       guest1.reservations[0].room.name,
//       guest1.checkedIn,
//       guest1.reservations[0].checkIn,
//       guest1.reservations[0].checkOut,
//       100,
//       guest1.paid
//     )
//   );
// });
// API.saveGuest({
//   room: room,
//   reservation: reservation,
//   guest: guest,
// }).then((res) => console.log(res));
