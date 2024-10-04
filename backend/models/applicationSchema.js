import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name of applicant"],
    minLength: [3, "Applicant name must be atleast 3 characters"],
    maxLength: [30, "Applicant name must be atmost 30 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter phone number"],
  },
  address: {
    type: String,
    required: [true, "Please enter your address"],
  },
  coverLetter: {
    type: String,
  },
  resume: {
    publicId: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },

  jobDetails: {
    jobId : {type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true},
    jobTitle : {
      type : String,
      required : true
    }
  },

  applicantId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
