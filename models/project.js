import mongoose from "mongoose";
import normalize from "normalize-mongoose";

const schema = mongoose.Schema({
  id: String,
  name: String,
  description: String,
  createdBy: String,
  dateCreated: Date,
  modifiedBy: String,
  dateModified: Date,
});

schema.plugin(normalize);

const ProjectModel = mongoose.model("Project", schema);

export default ProjectModel;
