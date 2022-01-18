const express = require("express");
const {
  getRequests,
  postRequests,
  getRequestById,
  updateRequest,
} = require("../controllers/requestControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
router.route("/").get(protect, getRequests);
router.route("/create").post(protect, postRequests);
router.route("/:id").get(getRequestById).put(protect, updateRequest);

module.exports = router;
