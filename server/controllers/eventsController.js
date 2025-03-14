import EventsModel from "../models/eventsModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";


export const getAllEventsApi = async (req, res) => {
  const { userId } = req.params;

  if (!userId)
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "events",
          localField: "events",
          foreignField: "_id",
          as: "events",
        },
      },
    ]);

    if (!user.length) {
      return res
        .status(404)
        .json({ message: "User not found or no events found" });
    }

    res.status(200).json({ success: true, events: user[0].events });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const createEventApi = async (req, res) => {
  const { userId } = req;
  const { heading, description, eventTime } = req.body;

  if (!userId || !heading || !description || !eventTime)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    let user = await UserModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const eventObj = { user: user._id, heading, description, eventTime };
    const event = await EventsModel.create(eventObj);

    if (!event)
      return res
        .status(400)
        .json({ success: false, message: "Failed to create event" });

    user = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "events",
          localField: "events",
          foreignField: "_id",
          as: "events",
        },
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      events: user[0].events,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to create event",
        error: error.message,
      });
  }
};


export const updateEventApi = async (req, res) => {
  const { eventId } = req.params;
  const updateFields = req.body;

  if (!eventId || !updateFields)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const updatedEvent = await EventsModel.findByIdAndUpdate(
      eventId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteEventApi = async (req, res) => {
  const { eventId } = req.params;

  if (!eventId)
    return res
      .status(400)
      .json({ success: false, message: "Event ID is required" });

  try {
    const deletedEvent = await EventsModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    await UserModel.findByIdAndUpdate(deletedEvent.user, {
      $pull: { events: eventId },
    });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
