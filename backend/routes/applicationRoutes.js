import express from "express"
import { isAuthenticated } from "../middlewares/auth.js"
import { deleteApplicationJobSeeker, getApplicationsEmployer, getApplicationsJobSeeker, postApplication } from "../controllers/applicationController.js"


const applicationRouter = express.Router()

applicationRouter
    .post("/postApplication",isAuthenticated,postApplication)
    .get("/getApplicationsEmployer",isAuthenticated,getApplicationsEmployer)
    .get("/getApplicationsJobSeeker",isAuthenticated,getApplicationsJobSeeker)
    .delete("/deleteApplicationJobSeeker/:id",isAuthenticated,deleteApplicationJobSeeker)

export default applicationRouter