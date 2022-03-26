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
    },
    startdate:{
        type:Date,
        required:"Date is required",
        trim:true,
    },
    phone:{
        type:String,
        required:"Phone is required",
        trim:true,
    },
    city:{
        type:String,
        required:"City is required",
        trim:true,
    },
    status:{
    type:String,
    required:"Phone is required",
    trim:true,
},
file:{
    type:String,
    
}
})

//make it public
module.exports = mongoose.model('Employee', employeeSchema)
