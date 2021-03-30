const router = require("express").Router();
const guestController = require("../../controllers/guestController");

// Matches with "/api/books"
router
  .route("/guests")
  .get(guestController.findGuests)
  .post(guestController.createGuest);

module.exports = router;
