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
//add create the form
router.get('/create', (req, res)=>{
    res.render('employees/create',{
        title:'Employee Details'
    })
})

//post create method
router.post('/create',(req,res)=>{
    Employee.create(req.body,(err, employee)=>{
if(err){
    console.log(err)
}
else{
    res.redirect('/employees')
}
    })
    
})
//delete get
router.get('/delete/:_id', (req, res)=>{
    Employee.remove({ _id: req.params._id },(err) => {
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/employees')
        }
    })
})

//edit
router.get('/edit/:_id', (req, res)=>{
    Employee.findById(req.params._id, (err, employee)=>{
        if (err){
            console.log(err)
        }
            else{
                res.render('employees/edit',{
                    title:'Employees Details',
                    employee:employee
                })
        }
    })

})

//post the changes we made in the edit
router.get('/edit/:_id', (req, res)=>{
Employee.findByIdAndUpdate({ _id: req.params._id}, req.body , null ,(err,employee)=>{
    if(err){
        console.log(err)
    }else{
        res.redirect('/employees')
    }
})
})

module.exports = router