import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://i.ibb.co/NjvDZcY/user-7993222.png",
    },
    number: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: null,
    },
    bloodGroup: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    sdg: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
      default: "General Member",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVolunteer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
