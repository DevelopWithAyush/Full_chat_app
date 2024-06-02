import { Schema,Types,model } from "mongoose";




const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    groupChat: {
        type: Boolean,
        default:false
    },
    creator: {
        type: Types.ObjectId,
        ref: "User"
    },
   

}, {
    timestamps:true
})



export const User = model.User || model("User",userSchema)