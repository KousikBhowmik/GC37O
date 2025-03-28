import UserModel from "../models/userModel.js";
import TasksModel from "../models/tasksModel.js";

// --------------------- API to get all tasks ----------------------

export const getAllTasksApi = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await UserModel.findById(userId).populate("tasks");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or no tasks found" });
    }

    res.status(200).json({
      success: true,
      message: "Fetched tasks successfully",
      tasks: user.tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// --------------------- API to add single task ----------------------

export const createTaskApi = async (req, res) => {
  const { userId } = req;
  const { heading, description, startTime, endTime } = req.body;

  if (!userId || !heading || !description || !startTime || !endTime)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    let user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    const taskObj = {
      user: user._id,
      heading: heading,
      description: description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };

    const task = await TasksModel.create(taskObj);

    if (!task)
      return res
        .status(400)
        .json({ success: false, message: "Failed to create tasl" });

    user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { tasks: task._id } },
      { new: true }
    ).populate("tasks");

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      tasks: user.tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "unable to create task",
      error: error.message,
    });
  }
};

// --------------------- API to update task fields/field ----------------------

export const updateTaskApi = async (req, res) => {
  const { taskId } = req.params;
  const updateFields = req.body;

  if (!taskId || !updateFields)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const updatedTask = await TasksModel.findByIdAndUpdate(
      taskId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// --------------------- API to delete single task ----------------------

export const deleteTaskApi = async (req, res) => {
  const { taskId } = req.params;
  if (!taskId)
    return res
      .status(400)
      .json({ success: false, message: "Task Id is Required" });

  try {
    const deletedTask = await TasksModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await UserModel.findByIdAndUpdate(deletedTask.user, {
      $pull: { tasks: taskId },
    });

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
