import axios from "axios";

export default {
  getGuests: function () {
    return axios.get("/api/guests");
  },
  saveGuest: function (guestData) {
    return axios.post("/api/guests", guestData);
  },
  updateGuest: function (guestData) {
    return axios.put("/api/guests", guestData);
  },

  deleteGuest: function (id) {
    return axios.delete("/api/guests/" + id);
  },
  getRooms: function () {
    return axios.get("/api/rooms");
  },
  saveRoom: function (roomData) {
    return axios.post("/api/rooms", roomData);
  },
  deleteRoom: function (id) {
    return axios.delete("/api/rooms/" + id);
  },
  login: function (creds) {
    return axios.post("/api/login", creds);
  },
  findItems: function () {
    return axios.get("/api/store");
  },
  saveItem: function (itemData) {
    return axios.post("/api/store", itemData);
  },
};
