import axios from "axios";

export default {
  getGuests: function () {
    return axios.get("/api/guests");
  },
  saveGuest: function (guestData) {
    return axios.post("/api/guests", guestData);
  },
  getRooms: function () {
    return axios.get("/api/rooms");
  },
  login: function (creds) {
    return axios.post("/api/login", creds);
  },
};
