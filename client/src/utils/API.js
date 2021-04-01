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
  saveRooms: function (roomData) {
    return axios.post("/api/rooms", roomData);
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
