const router = require("express").Router();
const guestController = require("../../controllers/guestController");

// Matches with "/api/guests"
router
  .route("/guests")
  .get(guestController.findGuests)
  .put(guestController.updateGuest)
  .post(guestController.createGuest);
router.route("/guests/:id").delete(guestController.deleteGuest);
router
  .route("/rooms")
  .get(guestController.findRooms)
  .put(guestController.updateRoom)
  .post(guestController.createRooms);
router.route("/room/:id").delete(guestController.deleteRoom);

router
  .route("/store")
  .get(guestController.findItems)
  .post(guestController.createItem);

router.route("/login").post(guestController.login);

module.exports = router;
