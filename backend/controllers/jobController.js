import { Job } from "../models/jobSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";

//functionality to get all jobs --> irrespective of who has posted
export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

//functionality to post a new job
export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker")
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );

  const {
    //destructure job info (to post new job)
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !city || !location) {
    return next(new ErrorHandler("Please input complete job details", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    //if no type of salary present
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary",
        400
      )
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    //if all types all salary present->err
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }

  const postedBy = req.user._id; //it will pass throught auth middleware, so gets user id

  const newJob = new Job({
    title,
    category,
    description,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });

  await newJob.save();

  res.status(201).json({
    success: true,
    message: "Job posted successfully",
    job: newJob,
  });
});

//functionality get all jobs of a user->created by employer
export const getMyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker")
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );

  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

//functionality to update a job
export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker")
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );

  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job)
    return next(new ErrorHandler("The requested job does not exist", 404)); //if job not found

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    job: updatedJob,
  });
});

//functionality to delete job
export const deleteJob = catchAsyncError(async (req,res,next)=>{
    const { role } = req.user;

  if (role === "Job Seeker")
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );

    const {id} = req.params

    const job = await Job.findById(id)

    if(!job)return next(new ErrorHandler("Job to be deleted does not existed",404))

    const deletedJob = await Job.findByIdAndDelete(id,{new : true})
    res.status(200).json({
        success : true,
        message : "Job deleted successfully",
        job : deletedJob
    })
})

//functionality to get single job by job id
export const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  });
