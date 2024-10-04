import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";


export const postApplication = catchAsyncError(async (req, res, next) => {
console.log("Application Post Functionality")
  const { role } = req.user;

  //if role !== Job Seeker
  if (role === "Employer")
    return next(
      new ErrorHandler("Employer not allowed to access this resource", 400)
    );

  //if any file not found in request
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume file required", 400));
  }

  const { resume } = req.files;
  
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"]; //list of allowed formats
  if (!allowedFormats.includes(resume.mimetype)) {
    //resume type not in allowedFormats
    return next(new ErrorHandler("Resume format is not compatible"));
  }

  const cloudinaryResp = await cloudinary.uploader.upload(
    //clodinary upload
    resume.tempFilePath
  );

  if (!cloudinaryResp || cloudinaryResp.error) {
    //issue with cloudinary response
    console.error(
      "Cloudinary Error:",
      cloudinaryResp.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload resume to Cloudinary", 500));
  }

  const { name, email, phone, address, coverLetter, jobId } = req.body;

  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job does not exist", 404));
  }

  const applicantId = {
    user: req.user._id,
    role: "Job Seeker",
  };

  const employerId = {
    user: job.postedBy,
    role: "Employer",
  };

  const jobDetails = {
    jobId: job._id,
    jobTitle: job.title,
  };

  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !coverLetter ||
    !resume ||
    !employerId ||
    !applicantId ||
    !jobDetails
  ) {
    return next(new ErrorHandler("Enter complete details", 400));
  }

  const application = new Application({
    name,
    email,
    phone,
    address,
    coverLetter,
    jobDetails,
    resume: {
      publicId: cloudinaryResp.public_id,
      url: cloudinaryResp.secure_url,
    },
    employerId,
    applicantId,
  });

  await application.save()

  res.status(200).json({
    success : true,
    message : "Application posted",
    application
  })
})

export const getApplicationsEmployer = catchAsyncError(async (req,res,next)=>{
    const {role} = req.user
    if(role === "Job Seeker")return next(new ErrorHandler("Job Seeker can't access this resource",400))

    const {_id} = req.user //user id of employer

    const applications = await Application.find({"employerId.user" : _id})

    res.status(200).json({
        success : true,
        applications
    })
})


export const getApplicationsJobSeeker = catchAsyncError(async (req,res,next)=>{
    const {role} = req.user
    if(role === "Employer")return next(new ErrorHandler("Employer can't access this resource",400))

    const {_id} = req.user //user id of applicant

    const applications = await Application.find({"applicantId.user" : _id})

    res.status(200).json({
        success : true,
        applications
    })
})

export const deleteApplicationJobSeeker = catchAsyncError(async (req,res,next)=>{
    
        const {role} = req.user
        if(role === "Employer")return next(new ErrorHandler("Employer can't access this resource",400))
    
        const {id} = req.params // id of application
    
        const application = await Application.findById(id)
    
        if(!application)return next(new ErrorHandler("Application not found",404))

        const deletedApplication = await Application.findByIdAndDelete(id,{new: true})

        res.status(200).json({
            success : true,
            message : "Application deleted successfully",
            application : deletedApplication

        })
    
})







