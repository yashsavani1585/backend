// require("dotenv").config({path: "./.env"  });

import dotenv from "dotenv";
import connectDb from "./db/index.js";
import app from "./app.js";


dotenv.config({ path: "./.env" });
connectDb()

.then(() => {
    app.listen(process.env.PORT || 8001, () => {
        console.log(`Server is running on port : ${process.env.PORT}`);
    })
})
.catch((error) => console.error("Error connecting to MongoDB:", error));


// import express from "express";

// const app = express();

// (async ()=> {
//     try {
//      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//      app.on("error",(error)=>{
//         console.error("MongoDB connection error:", error);
//         throw error;
//      })

//      app.listen(process.env.PORT, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//      })
//     } catch (error) {
//         console.log("error :",error);
//         throw error;
//     }
// })()