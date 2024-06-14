import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import adminRouter from "./routes/admin.js";
import { createGroupChats, createMessagesInAChat, createSingleChats, createUser } from "./seeders/user.js";

dotenv.config({
    path:"./.env"
})


const app = express();

connectDB(process.env.MONGO_URL);
// createUser(10)
// createSingleChats(10);
// createGroupChats(10)

// createMessagesInAChat("6669e52a6605ccbed117a872",50)


// here we are using middleware

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", async (req, res) => {
    res.send("hello from this side")
})

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/admin", adminRouter);

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log("server listening on port 3000");
});
