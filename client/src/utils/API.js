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
  getRooms: function () {
    return axios.get("/api/rooms");
  },
  deleteGuest: function (id) {
    return axios.delete("/api/guests/" + id);
  },
  login: function (creds) {
    return axios.post("/api/login", creds);
  },
  findItems: function () {
    return axios.get("/api/store");
  },
  saveItem: function (creds) {
    return axios.post("/api/store", creds);
  },
};
