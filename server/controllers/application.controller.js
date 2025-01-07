import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { asyncError } from "../middlewares/error.js"
import ErrorHandler from "../utils/error.js";
import { sendMail } from "../utils/sendMail.js";
import { offerLetterHtml } from "../html/offer-letter.js";
import { generateOfferLetterPdf } from "../utils/pdf-generator.js";

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

// Send offer letter
export const sendOfferLetter = asyncError(async (req, res, next) => {
    const { candidateName, jobTitle, companyId, salary, location, recruiterName, userEmail } = req.body;

    if(!candidateName || !jobTitle || !companyId || !salary || !location || !recruiterName || !userEmail){
        return next(new ErrorHandler("All fields are required", 400));
    };

    const company = await Company.findById(companyId);
    if (!company) {
        return next(new ErrorHandler("Company not found.", 404));
    }

    const currentDate = new Date().toLocaleDateString();

    const offerLetter = offerLetterHtml({
        candidateName,
        jobTitle,
        companyName: company.name,
        salary,
        startDate: currentDate,
        location,
        recruiterName,
    })

    await sendMail(userEmail, "Offer Letter", "Please find the attached offer letter.", offerLetter);

    return res.status(200).json({
        message:"Offer letter sent successfully.",
        success:true
    });
});

export const downloadOfferLetter = asyncError(async (req, res, next) => {
    const { candidateName, jobTitle, companyId, salary, location, recruiterName } = req.body;

    if (!candidateName || !jobTitle || !companyId || !salary || !location || !recruiterName) {
        return next(new ErrorHandler("All fields are required to download the offer letter.", 400));
    }

    const company = await Company.findById(companyId);
    if (!company) {
        return next(new ErrorHandler("Company not found.", 404));
    }

    const currentDate = new Date().toLocaleDateString();

    const pdfContent = {
        candidateName,
        jobTitle,
        companyName: company.name,
        salary,
        location,
        recruiterName,
        startDate: currentDate
    };
    
    const pdfBytes = await generateOfferLetterPdf(pdfContent);

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Offer_Letter_${candidateName}.pdf"`,
    });

    return res.status(200).send(Buffer.from(pdfBytes));
});