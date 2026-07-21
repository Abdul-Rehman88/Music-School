import mongoose, { Schema } from "mongoose";

export const UserSchema = new Schema({
    
    userName:{
        type:String,
        required: [true, 'User name is required'],
    }, 
    email:{
        type:String,
        required: [true, 'Email is required'],
        unique: true
    },
    age:{
        type:Number,
        required: [true, 'Age is required'],
    },
    password:{
        type:String,
        required: [true, 'Password is required'],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyTokenExpiry: Date      
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User