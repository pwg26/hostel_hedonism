import axios from "axios";

export default {
  getGuests: function () {
    return axios.get("/api/guests");
  },
  saveGuest: function (guestData) {
    return axios.post("/api/guests", guestData);
  },
  login: function (creds) {
    return axios.post("/api/login", creds);
  },
  getItems: function (creds) {
    return axios.post("/api/store", creds);
  },
  saveItem: function (creds) {
    return axios.post("/api/store", creds);
  },
};
