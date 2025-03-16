import EventsModel from "../models/eventsModel.js";
import UserModel from "../models/userModel.js";

// --------------------- API to get all events ----------------------

export const getAllEventsApi = async (req, res) => {
  const { userId } = req;

  if (!userId)
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });

  try {
    const user = await UserModel.findById(userId).populate("events");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found or no events found" });
    }

    res.status(200).json({ success: true, events: user.events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// --------------------- API to add single event ----------------------

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

    const eventObj = {
      user: user._id,
      heading,
      description,
      eventTime: new Date(eventTime),
    };
    const event = await EventsModel.create(eventObj);

    if (!event)
      return res
        .status(400)
        .json({ success: false, message: "Failed to create event" });

    user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { events: event._id } },
      { new: true }
    ).populate("events");

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      events: user.events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to create event",
      error: error.message,
    });
  }
};

// --------------------- API to update event fields/field ----------------------

export const updateEventApi = async (req, res) => {
  const { eventId } = req.params;
  const updateFields = req.body;
  console.log(eventId);
  console.log(updateFields);

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
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Event updated successfully",
        updatedEvent,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// --------------------- API to delete single event ----------------------

export const deleteEventApi = async (req, res) => {
  const { eventId } = req.params;

  if (!eventId)
    return res
      .status(400)
      .json({ success: false, message: "Event ID is required" });

  try {
    const deletedEvent = await EventsModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    await UserModel.findByIdAndUpdate(deletedEvent.user, {
      $pull: { events: eventId },
    });

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
