import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
  {
    user: {
      typeof: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
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
  mongoose.models.Events || mongoose.model("Events", eventsSchema);

export default EventsModel;
