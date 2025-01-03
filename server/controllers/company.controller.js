import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import ErrorHandler from "../utils/error.js"
import { asyncError } from "../middlewares/error.js"

export const registerCompany = asyncError(async (req, res, next) => {
    const { companyName } = req.body;
    if (!companyName) {
        return next(new ErrorHandler("Company name is required.", 400));
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
        return next(new ErrorHandler("You can't register same company.", 400));
    };
    company = await Company.create({
        name: companyName,
        userId: req.id
    });

    return res.status(201).json({
        message: "Company registered successfully.",
        company,
        success: true
    })
});
export const getCompany = asyncError(async (req, res, next) => {
    const userId = req.id; // logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
        return next(new ErrorHandler("Companies not found.", 404));
    }
    return res.status(200).json({
        companies,
        success:true
    })
});
// get company by id
export const getCompanyById = asyncError(async (req, res, next) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
        return next(new ErrorHandler("Company not found.", 404));
    }
    return res.status(200).json({
        company,
        success: true
    })
});
export const updateCompany = asyncError(async (req, res) => {
    const { name, description, website, location } = req.body;

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!company) {
        return res.status(404).json({
            message: "Company not found.",
            success: false
        })
    }
    return res.status(200).json({
        message:"Company information updated.",
        success:true
    })
});