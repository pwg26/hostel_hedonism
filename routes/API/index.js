const router = require("express").Router();
const guestController = require("../../controllers/guestController");

// Matches with "/api/guests"
router
  .route("/guests")
  .get(guestController.findGuests)
  .post(guestController.createGuest);

router
  .route("/store")
  .get(guestController.findItems)
  .post(guestController.createItem);

router.route("/login").post(guestController.login);

module.exports = router;
