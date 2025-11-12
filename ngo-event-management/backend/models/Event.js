import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateTime: { type: Date, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  image: { type: String },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO" },
});

export default mongoose.model("Event", eventSchema);
