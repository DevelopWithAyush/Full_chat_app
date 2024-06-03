import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from 'jsonwebtoken'

const isAuthenticated = TryCatch(async (req, res, next) => {

    const token = req.cookies.authToken;
    if (!token) return next(new ErrorHandler("Please login to access this route", 401))

    const decodeData = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodeData)
    req.user = decodeData._id
    next()
})

export { isAuthenticated };