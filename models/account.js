import mongoose from "mongoose";
import normalize from "normalize-mongoose";

const schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  id: { type: String },
});

schema.plugin(normalize);

export default mongoose.model("account", schema);
