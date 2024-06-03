import express from "express";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

dotenv.config({
    path:"./.env"
})


const app = express();

connectDB(process.env.MONGO_URL)


// here we are using middleware

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", async (req, res) => {
    res.send("hello from this side")
})

app.use("/user", userRouter);

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log("server listening on port 3000");
});
