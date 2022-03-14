const mongoose = require('mongoose')
const { transformAuthInfo } = require('passport/lib')

let userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:'user name is required',
        trim:true
    },
    password:{
        type:String,
        required: 'Password is required',
        trim:true
    
    }
})