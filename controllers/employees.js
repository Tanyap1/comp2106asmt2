//import express and create router 
const express = require ('express')
const router = express.Router()
const multer = require ('multer')//upload files

//storage 

const storage = multer.diskStorage({
    destination:function (request,file,callback){
        callback(null, './public/uploads/');
    },

    filename:function(request,file,callback){
        callback(null, Date.now() + file.originalname)
    },
})

//uplload formulter
const upload=multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*3,

    }
})
//import the model

const Employee = require('../models/emloyee')

//require passport
const passport = require('passport')
function isAuthenticated(req,res,next){
    //use passport to see if user authorized
    if(req.isAuthenticated()){
        return next()
    
    }
    res.redirect('/auth/login')
}

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
        employees:employees,
        user: req.user    

    })
}
})

})  
//add create the form
router.get('/create', isAuthenticated, (req, res)=>{
    res.render('employees/create',{
        title:'Employee Details',
        user: req.user    

    })
})

//post create method
router.post('/create', upload.single('file'),isAuthenticated, (req,res)=>{
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
router.get('/delete/:_id',upload.single('file'),isAuthenticated, (req, res)=>{
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
router.get('/edit/:_id',upload.single('file'),isAuthenticated, (req, res)=>{
    Employee.findById(req.params._id, (err, employee)=>{
        if (err){
            console.log(err)
        }
            else{
                res.render('employees/edit',{
                    title:'Employees Details',
                    employee:employee,
                    user: req.user    

                })
        }
    })

})

//post the changes we made in the edit
router.post('/edit/:_id', (req, res)=>{
Employee.findByIdAndUpdate({ _id: req.params._id}, req.body, null, (err, employee)=>{
    if(err){//if error show it is not redirect to emmployees index
        console.log(err)
    }else{
        res.redirect('/employees')
    }
})
})








module.exports = router