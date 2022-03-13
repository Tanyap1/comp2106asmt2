const mongoose=require('mongoose')//we required the mongoose

let employeeSchema = new mongoose.Schema({
    name: {

type:String,
required:'name is required',
trim:true
    },
    address:{
        type:String,
        required:'location is required',
        trim:true
    },
    position:{
        type:'String',
        trim:true,
    },
    employeeid:{
        type:String,
        required:"employeeid is required",
        trim:true,
    }
   
})

//make it public
module.exports = mongoose.model('Employee', employeeSchema)
