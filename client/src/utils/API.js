import axios from "axios";

export default {
  getGuests: function () {
    return axios.get("/api/guests");
  },
  saveGuest: function (guestData) {
    return axios.post("/api/guests", guestData);
  },
};
