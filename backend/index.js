import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import { config } from "dotenv"
import cloudinary from "cloudinary"
import userRouter from "./routes/userRoutes.js"
import jobRouter from "./routes/jobRoutes.js"
import applicationRouter from "./routes/applicationRoutes.js"
import { dbConnection } from "./database/dbConnection.js"
import { errorMiddleware } from "./middlewares/error.js"

const server = express()

config() //connect to dotenv file

server.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))



//setting up initial required middlewares
server.use(cookieParser()) //to allow cookies to set and get
server.use(express.json()) //to be able to access body of requests
server.use(express.urlencoded({ extended: true }))
server.use( //for cloudinary file upload
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  )

  cloudinary.v2.config({ //configure cloudinary
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
  })

  

server.use("/api/users",userRouter)
server.use("/api/jobs",jobRouter)
server.use("/api/applications",applicationRouter)

dbConnection()



const port = process.env.BACKEND_PORT || 3000

server.use(errorMiddleware) //handle all the errors

server.listen(port,()=>{ //all operations of server end here
  console.log(`server started at ${port}`)
})



export default server
