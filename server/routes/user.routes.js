import express from "express";
import { google, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
 
const router = express.Router();
router.route("/").get((req,res)=>{
    res.send("Hello from user routes");
});
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/google-oauth").post(google)
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;
