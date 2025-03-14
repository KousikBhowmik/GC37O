import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is Required"],
    },
    heading: {
      type: String,
      required: [true, "Heading is Required"],
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    eventTime: {
      type: Date,
      required: [true, "Staring time is Required"],
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const EventsModel =
  mongoose.models.events || mongoose.model("events", eventsSchema);

export default EventsModel;
