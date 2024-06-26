import { Schema,model } from "mongoose";




const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    userEmail: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required:true
        },
        url: {
            type: String,
            required:true
        }
    }

}, {
    timestamps:true
})



export const User = model.User || model("User",userSchema)