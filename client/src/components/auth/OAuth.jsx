import React from "react";
import { Button } from "../ui/button";
import { AiFillGoogleCircle } from "react-icons/ai";
import { app } from "../utils/firebase.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { USER_API_END_POINT } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
const OAuth = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
      const data = {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoURL: resultsFromGoogle.user.photoURL,
      };
      console.log(data);
      setLoading(true)
      try {
        const res=await axios.post(`${USER_API_END_POINT}/google-oauth`,data,{withCredentials:true})
        console.log(res)
        if(res.status===200 || res.status===201){
         
          dispatch(setUser(res.data.user))
          toast.success(res.data.message)
         navigate('/')
        }
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      className="w-full my-4 flex items-center justify-center gap-2 p-4"
      onClick={handleGoogle}
    >
      Continue with Google
      <AiFillGoogleCircle className=" text-white  w-6 h-6" />
    </Button>
  );
};

export default OAuth;
