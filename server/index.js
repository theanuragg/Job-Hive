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
// const __dirname = path.resolve();
// console.log(__dirname);



// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    // origin:true,
    // credentials:true
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials':true,
    'Access-Control-Allow-Methods':['POST','GET', "PUT", "DELETE"],
    'Access-Control-Allow-Headers':'Content-Type'
}

app.use(cors(
    {
      // origin:"http://localhost:5174",
      origin:true,
      methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
      credentials: true,
    }
  ));

  app.use(function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', true,);
    // res.header('Access-Control-Allow-Origin', "http://localhost:5174",);
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.get("/",(req,res)=>{
    res.send("Welcome to Job Portal API");
})
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// })



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})