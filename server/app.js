import express from "express";
import userRouter from "./routes/user.js";

const app = express();

app.use("/user", userRouter);

app.listen(3000, () => {
    console.log("server listening on port 3000");
});
