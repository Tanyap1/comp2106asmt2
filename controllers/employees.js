//import express and create router 
const express = require ('express')
const router = express.Router()
//import the model

const Employee = require('../models/emloyee')


//get root
router.get('/',(req,res)=>{

//use the database
Employee.find((err,employees)=>{
if (err){
    console.log(err)
}
else{
    res.render('employees/index', {
        title:'Employees',
        employees:employees
    })
}
})

})  

module.exports = router