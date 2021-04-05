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
  addToGuest: function (id, item, type) {
    return axios.put("/api/guests/" + id, { item: item, type: type });
  },
  saveRoom: function (roomData) {
    return axios.post("/api/rooms", roomData);
  },
  updateRoom: function (roomData) {
    console.log(roomData);
    return axios.put("/api/rooms", roomData);
  },
  deleteRoom: function (id) {
    return axios.delete("/api/rooms/" + id);
  },
  getRooms: function () {
    return axios.get("/api/rooms");
  },
  getRoomInfo: function () {
    return axios.get("/api/rooms/guests");
  },
  login: function (creds) {
    return axios.post("/api/login", creds);
  },
  findItems: function () {
    return axios.get("/api/store");
  },
  saveItem: function (itemData) {
    console.log("CREATE ITEM", itemData);
    return axios.post("/api/store", itemData);
  },
  updateItem: function (itemData) {
    console.log(itemData);
    return axios.put("/api/store", itemData);
  },
  deleteItem: function (id) {
    return axios.delete("/api/store/" + id);
  },
  getActivities: function () {
    return axios.get("/api/activity");
  },
  saveActivity: function (actData) {
    console.log("CREATE ACT", actData);
    return axios.post("/api/activity", actData);
  },
  updateActivity: function (actData) {
    console.log("update ACT", actData);
    return axios.put("/api/activity", actData);
  },
  deleteActivity: function (id) {
    console.log(id);
    return axios.delete("/api/activity/" + id);
  },
};
