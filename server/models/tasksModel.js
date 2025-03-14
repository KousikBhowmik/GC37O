import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema(
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
    startTime: {
      type: Date,
      required: [true, "Staring time is Required"],
    },
    endTime: {
      type: Date,
      required: [true, "Ending time is Required"],
    },
    status: {
      type: String,
      enum: ["todo", "progress", "pending", "completed"],
      default: "todo",
    },
  },
  {
    timestamps: true,
  }
);

const TasksModel =
  mongoose.models.tasks || mongoose.model("tasks", tasksSchema);

export default TasksModel;
