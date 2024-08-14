import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    Credential: true
}));

app.use(express.json({
    limit: "40kb"
}));
app.use(express.urlencoded({ extended: true ,limit: "40kb" })); 

app.use(express.static("public"));

app.use(cookieParser());

// routes

import userRouter from "./routes/user.routes.js";

// route dicller

app.use("/api/v1/users", userRouter);


export default app;