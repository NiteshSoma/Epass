const Request = require("../models/requestModel");
const asyncHandler = require("express-async-handler");

const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({ user: req.user._id });
  res.json(requests);
});

const getRequestById = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (request) {
    res.json(request);
  } else {
    res.status(404).json({ message: "Request not found" });
  }
});

const createRequest = asyncHandler(async (req, res) => {
  const { origin, destination, date } = req.body;

  if (!origin || !destination || !date) {
    res.status(400);
    throw new Error("Please Fill all the fields");
    return;
  } else {
    const request = new Request({
      user: req.user._id,
      origin,
      destination,
      date,
    });

    const createdRequest = await request.save();

    res.status(201).json(createdRequest);
  }
});

const DeleteRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (request.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (request) {
    await request.remove();
    res.json({ message: "Request Removed" });
  } else {
    res.status(404);
    throw new Error("Request not Found");
  }
});

const UpdateRequest = asyncHandler(async (req, res) => {
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
    res.json(updatedRequest);
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
});

module.exports = {
  getRequestById,
  getRequests,
  createRequest,
  DeleteRequest,
  UpdateRequest,
};
