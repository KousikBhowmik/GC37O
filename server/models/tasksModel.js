import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema(
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
  mongoose.models.Tasks || mongoose.model("Tasks", tasksSchema);

export default TasksModel;
