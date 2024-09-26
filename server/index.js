import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.route.js";



dotenv.config({});

const app = express();

// Serve the React build files
const __dirname = path.resolve();
console.log(__dirname);



// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:true,
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.get("/",(req,res)=>{
    res.send("Welcome to Job Portal API");
})
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
})



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})