import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary"; //add image
import upload from "../middleware/multer.js"; //middleware
import validator from "validator";

//!List all users in database
const listUser = async (req, res) => {
  try {
    const allUser = await userModel.find({});
    res.status(200).json({ message: "success", allUser });
  } catch (error) {
    console.log(error);
  }
};

//!Register user with new emial
const registerUser = async (req, res) => {
  try {
    const { name, email, number, designation, gender, courses } = req.body; //!we extract these from req.body
    const imageFile = req.file; //!need to add file

    let imageUrl = ""; //!if no file we get this url image else true we use user upload image
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }
    const isEmailExist = await userModel.findOne({ email: email });
    if (isEmailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }
    //!Using validator to check is email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }
    const userData = {
      name,
      email,
      number,
      designation,
      gender,
      courses,
      image: imageUrl,
      date: Date.now(),
    };

    const user = userModel(userData);
    await user.save();

    res.status(200).json({ message: "User Added Succesfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//!Using Promise to Login Admin User
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res
        .status(200)
        .json({ message: true, token, name: process.env.ADMIN_NAME });
    } else {
      res.status(400).json({ message: "Invalid login details" });
    }
  } catch (error) {
    res.status(400).json({ message: false, error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, name, email, number, designation, gender, courses } = req.body;
    const imageFile = req.file; //!need to add file

    let imageUrl = ""; //!if no file we get this url image else true we use user upload image
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    const userData = {
      name,
      email,
      number,
      designation,
      gender,
      courses,
      image: imageUrl,
      date: Date.now(),
    };
    const updatedUser = await userModel.findByIdAndUpdate(_id, userData, {
      new: true,
    });
    res
      .status(200)
      .json({ success: true, message: "Status updated", updatedUser });
  } catch (error) {
    res.status(400).json({ message: false, message: "error" });
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Cannot find user" });
  }
};

const singleUser = async (req, res) => {
  try {
  } catch (error) {}
};

export {
  registerUser,
  listUser,
  deleteUser,
  adminLogin,
  updateUser,
  singleUser,
};
