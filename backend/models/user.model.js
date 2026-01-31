import mongoose, { mongo, Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: ''
    },

    address: {
        type: String,
        default: ''
    },

    dob:{
        type: String,
        default: ''
    },

    gender:{
        type: String,
        default: 'Not Specified'
    },

    age: {
        type: Number,
        default: null
    }

},{minimize: false})

const userModel = mongoose.models.user ||  mongoose.model("user", userSchema)

export default userModel