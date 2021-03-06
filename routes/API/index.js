const router = require("express").Router();
const guestController = require("../../controllers/guestController");

// Matches with "/api/guests"
// Guest API routes================================
router
  .route("/guests")
  .get(guestController.findGuests)
  .put(guestController.updateGuest)
  .post(guestController.createGuest);
router
  .route("/guests/:id")
  .delete(guestController.deleteGuest)
  .put(guestController.addToGuest);

// Rooms API routes================================
router
  .route("/rooms")
  .get(guestController.findRooms)
  .put(guestController.updateRoom)
  .post(guestController.createRooms);
router.route("/rooms/:id").delete(guestController.deleteRoom);

router.route("/rooms/guests").get(guestController.roomsByGuests);

// Store API routes================================
router
  .route("/store")
  .get(guestController.findItems)
  .put(guestController.updateItem)
  .post(guestController.createItem);
router.route("/store/:id").delete(guestController.deleteItem);

// activity API Routes=================================
router
  .route("/activity")
  .get(guestController.findActivities)
  .post(guestController.createActivity)
  .put(guestController.updateActivity);
router.route("/activity/:id").delete(guestController.deleteActivity);
router.route("/login").post(guestController.login);

module.exports = router;
