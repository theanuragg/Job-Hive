import { Job } from "../models/job.model.js";
import { asyncError } from "../middlewares/error.js";
import ErrorHandler from "../utils/error.js"

// admin post krega job
export const postJob = asyncError(async (req, res, next) => {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
        return next(new ErrorHandler("Something is missing.", 400));
    };
    const job = await Job.create({
        title,
        description,
        requirements,
        salary: Number(salary),
        location,
        jobType,
        experienceLevel: experience,
        position,
        company: companyId,
        created_by: userId
    });
    return res.status(201).json({
        message: "New job created successfully.",
        job,
        success: true
    });
});
// student k liye
export const getAllJobs = asyncError(async (req, res, next) => {
    const keyword = req.query.keyword || "";
    const query = {
        $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ]
    };
    const jobs = await Job.find(query).populate({
        path: "company"
    }).sort({ createdAt: -1 });
    if (!jobs) {
        return next(new ErrorHandler("Jobs not found.", 404));
    };
    return res.status(200).json({
        jobs,
        success: true
    })
});
// student
export const getJobById = asyncError(async (req, res, next) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
        path:"applications"
    });
    if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
    };
    return res.status(200).json({ job, success: true });
})
// admin kitne job create kra hai abhi tk
export const getAdminJobs = asyncError(async (req, res, next) => {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
        path:'company',
        createdAt:-1
    });
    if (!jobs) {
        return next(new ErrorHandler("Jobs not found.", 404));
    };
    return res.status(200).json({
        jobs,
        success: true
    })
});