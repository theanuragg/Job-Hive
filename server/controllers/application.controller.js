import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { asyncError } from "../middlewares/error.js"
import ErrorHandler from "../utils/error.js";

export const applyJob = asyncError(async (req, res, next) => {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
        return next(new ErrorHandler("Job id is required.", 400));
    };
    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

    if (existingApplication) {
        return next(new ErrorHandler("You have already applied for this job.", 400));
    }

    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
        return next(new ErrorHandler("Job not found", 404));
    }
    // create a new application
    const newApplication = await Application.create({
        job:jobId,
        applicant:userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
        message:"Job applied successfully.",
        success:true
    })
});
export const getAppliedJobs = asyncError(async (req, res, next) => {
    const userId = req.id;
    const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'company',
            options:{sort:{createdAt:-1}},
        }
    });
    if(!application){
        return next(new ErrorHandler("No Applications", 404));
    };
    return res.status(200).json({
        application,
        success:true
    })
});
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = asyncError(async (req, res, next) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
        path:'applications',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'applicant'
        }
    });
    if(!job){
        return next(new ErrorHandler("Job not found", 404));
    };
    return res.status(200).json({
        job, 
        succees:true
    });
});
export const updateStatus = asyncError(async (req, res, next) => {
    const {status} = req.body;
    const applicationId = req.params.id;
    if(!status){
        return next(new ErrorHandler("Status is required", 400));
    };

    // find the application by applicantion id
    const application = await Application.findOne({_id:applicationId});
    if(!application){
        return next(new ErrorHandler("Application not found.", 404));
    };

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
        message:"Status updated successfully.",
        success:true
    });
});