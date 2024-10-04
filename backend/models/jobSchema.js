import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    minLength: [3, "Job title must be a minimum of 3 characters"],
    maxLength: [30, "Job title must be a maximum of 30 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide job description"],
    minLength: [5, "Job description must be a minimum of 5 characters"],
    maxLength: [100, "Job description must be a maximum of 50 characters"],
  },
  category: {
    type: String,
    required: [true, "Please provide job category"],
  },
  country: {
    type: String,
    required: [true, "Please enter country for job"],
  },
  city: {
    type: String,
    required: [true, "Please enter city for job"],
  },
  location: {
    type: String,
    required: [true, "Please enter location for job"],
    minLength: [10, "Job location should be a minimum of 10 characters"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Salary can have a minimum of 4 digits"],
    maxLength: [9, "Salary can have a max of 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "salaryFrom can have a minimum of 4 digits"],
    maxLength: [9, "salaryFrom can have a max of 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "salaryTo can have a minimum of 4 digits"],
    maxLength: [9, "salaryTo can have a max of 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },

  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  postedOn: {
    type: Date,
    default: Date.now,
  },
});


export const Job = mongoose.model("Job",jobSchema)
