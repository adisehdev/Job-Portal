import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

import {
  postJob,
  getMyJobs,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter
  .get("/allJobs", getAllJobs)
  .post("/postJob", isAuthenticated,postJob)
  .get("/myJobs", isAuthenticated,getMyJobs)
  .put("/updateJob/:id", isAuthenticated,updateJob)
  .delete("/deleteJob/:id", isAuthenticated,deleteJob)
  .get("/:id",isAuthenticated,getSingleJob);


export default jobRouter