const express = require('express')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const router=express.Router()
const passport=require('passport')
const User=require('../models/user')

//registration
router.get('/register', (req,res)=>{
    res.render('auth/register',{
        title:'Registration'
    })
})

//post requset usernamne and password

router.post('/register', (req,res)=>{
    User.register(new User({username:req.body.username}), req.body.password , (err,user)=>{
       if(err){
           return res.render('auth/register')
       } 
       else{
           req.login(user,(err)=>{
               res.redirect('/employees')
           })
       }
    })
})



//login
router.get('/login', (req,res)=>{
    let messages= req.session.message || [] // messages session for invalid login
    req.session.message =[]

    res.render('auth/login', {
        title:'login',
        messages:messages
    })
})


router.post('/login',passport.authenticate('local',{
    successRedirect: '/employees',
    failureRedirect:'/auth/login',
    failureMessage:'Invalid Login'//this is the invalid massege for login
}))


//github
router.get('/github',passport.authenticate('github',{scope:['user.email']}))

router.get('/github/callback',passport.authenticate('github',{
    failureRedirect:'/auth/login'}),(req,res)=>{
        res.redirect('/employees')
    }
)

//logout
router.get('/logout', (req,res)=>{
    req.logOut()
    res.redirect('/auth/login')
})


//google
router.get('/google',passport.authenticate('google',{scope:['email','profile']}))

router.get('/google/callback',
passport.authenticate('google',{
    failureRedirect:'/auth/login'}),(req,res)=>{
        res.redirect('/employees')
    }
)


module.exports=router