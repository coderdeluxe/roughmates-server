import mongoose from "mongoose";
import normalize from 'normalize-mongoose';

const schema = mongoose.Schema({
    id: String,
    code: String,
    title: String,
    status: String,
    label: String,
    priority: String,
    createdBy: String,
    dateCreated: Date,
    modifiedBy: String,
    dateModified: Date,
});

schema.plugin(normalize);


const TaskModel = mongoose.model("Task", schema);

export default TaskModel;