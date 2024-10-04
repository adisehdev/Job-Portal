import mongoose from "mongoose";

export const dbConnection = () => {
  
  mongoose
    .connect(process.env.MONGO_URI, {
      //will connect to cloud database
      dbName: "Jobs_DB_2024", //name of DB
    })
    .then(() => {
      console.log("connected to DB");
    }) //if successfully connected
    .catch((err) => {
      console.log(`some error occured in DB connection ${err}`);
    }); //if not connected
};
