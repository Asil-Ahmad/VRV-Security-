import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: Number, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Number, required: true }, //here we will use Date.now()
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
