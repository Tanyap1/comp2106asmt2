var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Employees Managment System' , user: req.user });
});

//about page
router.get('/about',(req,res)=>{
  res.render('about',{title: 'About',user: req.user })
}

)
//contct us
router.get('/contact',(req,res)=>{
  res.render('contact',{title: 'Contact Us',user: req.user })
}

)
module.exports = router;
