import mongoose from "mongoose";
import TaskModel from "../models/task.js";

export const getTasks = async (req, res) => {
  try {
    const data = await TaskModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TaskModel.findOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const createTask = async (req, res) => {
  const request = req.body;
  const task = new TaskModel({
    ...request,
    createdBy: "admin",
    dateCreated: new Date(),
  });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateTask = async (req, res) => {
  console.log("update task");
  const { id } = req.params;
  const { code, title, status, label, priority } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No record found" });
    }

    const data = {
      _id: id,
      code,
      title,
      status,
      label,
      priority,
      modifiedBy: "admin",
      dateModified: new Date(),
    };

    await TaskModel.findByIdAndUpdate({ _id: id }, data, { new: true });
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No record found" });
    }

    await TaskModel.findByIdAndRemove({ _id: id });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
