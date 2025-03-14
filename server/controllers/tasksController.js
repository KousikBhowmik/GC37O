import UserModel from "../models/userModel.js";
import TasksModel from "../models/tasksModel.js";
import mongoose from "mongoose";


export const getAllTasksApi = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const user = await UserModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'tasks',
                    localField: 'tasks',
                    foreignField: '_id',
                    as: 'tasks'
                }
            }
        ]);

        if (!user.length) {
            return res.status(404).json({ message: 'User not found or no tasks found' });
        }

        res.status(200).json({ success: true, tasks: user[0].tasks });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


export const createTaskApi = async (req, res) => {
  const { userId } = req;
  const { heading, description, startTime, endTime } = req.body;

  if (!userId && !heading && !description && !startTime && !endTime)
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
      startTime: startTime,
      endTime: endTime,
    };

    const task = await TasksModel.create(taskObj);

    if (!task)
      return res
        .status(400)
        .json({ success: false, message: "Failed to create user" });

    user = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      // @ts-ignore
      { $push: { tasks: task._id } },
      {
        $lookup: {
          from: "tasks",
          localField: "tasks",
          foreignField: "_id",
          as: "tasks",
        },
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      tasks: user[0].tasks,
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

export const updateTaskApi = async (req, res) => {
  const { taskId } = req.params;
  const updateFields = req.body;

  if (!taskId && !updateFields)
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
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const statusUpdateApi = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  if (!taskId && !status)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const validStatuses = ["todo", "progress", "pending", "completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedTask = await TasksModel.findByIdAndUpdate(
      taskId,
      { $set: { status } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task status updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteTaskApi = async (req, res) => {
    const { taskId } = req.params;
if (!taskId )
  return res
    .status(400)
    .json({ success: false, message: "Task Id is Required" });

  try {

    const deletedTask = await TasksModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await UserModel.findByIdAndUpdate(deletedTask.user, {
      $pull: { tasks: taskId },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
