import mongoose from "mongoose";
import ProjectModel from "../models/project.js";

export const getProjects = async (req, res) => {
  try {
    const data = await ProjectModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ProjectModel.findOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const createProject = async (req, res) => {
  const request = req.body;
  const project = new ProjectModel({
    ...request,
    createdBy: "admin",
    dateCreated: new Date()
  });

  try {
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateProject = async (req, res) => {
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

    await ProjectModel.findByIdAndUpdate({ _id: id }, data, { new: true });
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No record found" });
    }

    await ProjectModel.findByIdAndRemove({ _id: id });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error)
    console.log('delete')
    res.status(404).json({ message: "Something went wrong" });
  }
};
