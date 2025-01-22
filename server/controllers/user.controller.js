import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import ErrorHandler from "../utils/error.js";
import { asyncError } from "../middlewares/error.js"
import admin from 'firebase-admin';
import serviceAccount from '../utils/firebase-adminsdk.json' assert { type: "json" };

export const google = asyncError(async (req, res) => {
  const { name, email, googlePhotoURL } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = new User({
      fullname: name,
      email,
      password: hashedPassword,
      profile: {
        profilePhoto: googlePhotoURL,
      },
      role: "student",
    });
    
    await newUser.save();
    const tokenData = {
      userId: newUser._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const { password, ...rest } = newUser._doc;
    
    return res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpsOnly: true,
      sameSite: "strict",
    }).status(201).json({
      message: "account created successfully",
      user:{...rest},
      success: "true",
    });
  } else {
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const { password, ...rest } = user._doc;
    return res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpsOnly: true,
      sameSite: "strict",
    }).status(200).json({
      message: `Welcome back ${user.fullname}`,
      user:{...rest},
      success: true,
    });
  }
});

export const register = asyncError(async (req, res, next) => {
    const { fullname, email, phoneNumber, password, role, fcmToken } = req.body;
   
   
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const file = req.file;
    // if file is not uploaded
    if(!file){
      return next(new ErrorHandler("Profile photo is required", 400));
    }
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exist with this email.", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    const message = {
      notification: {
        title: `Welcome to Job-Hive, ${fullname}`,
        body: `🎉 Your journey to exciting opportunities starts here. Complete your profile to unlock personalized job recommendations and connect with top recruiters!`,
        image: "https://st4.depositphotos.com/17797916/20070/v/450/depositphotos_200702984-stock-illustration-job-logo-icon-design-vector.jpg"
      },
      token: fcmToken,
    };

    admin.messaging().send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
      
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
});
export const login = asyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Something is missing", 400));
  }
  let user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Incorrect email or password.", 400));
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Incorrect email or password.", 400));
  }
  // check role is correct or not
  if (role !== user.role) {
    return next(new ErrorHandler("Account doesn't exist with current role.", 400));
  }

  const tokenData = {
    userId: user._id,
  };
  const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res
    .status(200)
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpsOnly: true,
      sameSite: "strict",
    })
    .json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true,
    });
});
export const logout = asyncError(async (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out successfully.",
    success: true,
  });
});
export const updateProfile = asyncError(async (req, res, next) => {
  const { fullname, email, phoneNumber, bio, skills } = req.body;

  const file = req.file;
  // cloudinary ayega idhar
  let fileUri, cloudResponse = null;
  
  if(file){
      fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  }

  let skillsArray;
  if (skills) {
    skillsArray = skills.split(",");
  }
  const userId = req.id; // middleware authentication
  let user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found.", 400));
  }
  // updating data
  if (fullname) user.fullname = fullname;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;
  if (skills) user.profile.skills = skillsArray;

  // resume comes later here...
  if (cloudResponse) {
    user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
    user.profile.resumeOriginalName = file.originalname; // Save the original file name
  }

  await user.save();

  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res.status(200).json({
    message: "Profile updated successfully.",
    user,
    success: true,
  });
});
