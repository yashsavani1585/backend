import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    Credential: true
}));

app.use(express.json({
    limit: "20kb"
}));
app.use(express.urlencoded({ extended: true }));



export default app;