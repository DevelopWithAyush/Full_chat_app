import { Schema,model } from "mongoose";




const requestSchema = new Schema({
    status: {
        type: String,
        default: "pending",
        enum: ["pending","accepted", "rejected"]
    },
     reciver: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    sender: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    }
},{
    timestamps:true
})



export const Request = model.Request || model("Request",requestSchema)