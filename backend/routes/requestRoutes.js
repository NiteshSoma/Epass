const express = require("express");
const {
  getRequests,
  getRequestById,
  createRequest,
  UpdateRequest,
  DeleteRequest,
} = require("../controllers/requestControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
router.route("/").get(protect, getRequests);
router.route("/create").post(protect, createRequest);
router.route("/:id").get(getRequestById).put(protect, UpdateRequest).delete(protect, DeleteRequest);

module.exports = router;
