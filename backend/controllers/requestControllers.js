const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");

const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({ user: req.user._id });
  res.json(requests);
});

const postRequests = asyncHandler(async (req, res) => {
  const { origin, destination, date } = req.body;

  if (!origin || !destination || !date) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const request = new Request({
      user: req.user._id,
      origin,
      destination,
      date,
    });
    const createRequest = await request.save();
    res.status(201).json(createRequest);
  }
});

const getRequestById = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (request) {
    res.json(request);
  } else {
    res.status(401).json({ message: "Request not found" });
  }
});

const updateRequest = asyncHandler(async (req, res) => {
  const { origin, destination, date } = req.body;

  const request = await Request.findById(req.params.id);

  if (request.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (request) {
    request.origin = origin;
    request.destination = destination;
    request.date = date;
    const updatedRequest = await request.save();
    res.status(201).json(updatedRequest);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getRequests, postRequests, getRequestById, updateRequest };
