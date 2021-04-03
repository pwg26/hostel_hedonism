const router = require("express").Router();
const guestController = require("../../controllers/guestController");

// Matches with "/api/guests"
// Guest API routes================================
router
  .route("/guests")
  .get(guestController.findGuests)
  .put(guestController.updateGuest)
  .post(guestController.createGuest);
router.route("/guests/:id").delete(guestController.deleteGuest);

// Rooms API routes================================
router
  .route("/rooms")
  .get(guestController.findRooms)
  .put(guestController.updateRoom)
  .post(guestController.createRooms);
router.route("/room/:id").delete(guestController.deleteRoom);

// Store API routes================================
router
  .route("/store")
  .get(guestController.findItems)
  .put(guestController.updateItem)
  .post(guestController.createItem);
router.route("/room/:id").delete(guestController.deleteRoom);

router.route("/login").post(guestController.login);

module.exports = router;
