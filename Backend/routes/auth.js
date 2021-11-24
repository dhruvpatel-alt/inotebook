const express=require('express');
const router=express.Router();
const User=require('../model/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtsecret="DHruv PATel is gen!us"

//Create a user using post "/api/auth/" does not require authincation
//IF THERE ARE ERROR MAKE ERROR VISIBLE
router.post('/createuser',[
   body('email','Enter a valid email').isEmail(),
   body('name','Enter a valid name').isLength({ min: 3 }),
   body('password','Enter a password more than 5 character').isLength({ min: 5 }),
],async (req,res)=>{
   console.log(req.body);
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   // let user=User.findOne({email:req.body.email});
   // if(user)
   try { 
      //to check about some email
      const salt=await bcrypt.genSalt(10);
      const secpass=await bcrypt.hash(req.body.password,salt);
      let user=await User.findOne({email:req.body.email});
      if(user){
         return res.status(400).json({error:"Email already exists "})
      }
    user=await User.create({
      name: req.body.name,
      email: req.body.email, 
      password: secpass,})
      const data={user:{id:user.id}};
     const token = jwt.sign(data, jwtsecret);
     console.log(token);
      res.json({token});}
      catch (error) {
      console.error(error);
      res.status(500).send("SOME ERROR OCCUR");
   }
   //  }).then(user => res.json(user)).catch(err=>{console.log(err)
  
//Login for user using post "/api/auth/login" LOGIN page


})
router.post('/login',[
   body('email','Invalid Email for Login').isEmail(),
   body('password','Password cannot be blank').exists(),
],async (req,res)=>{
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array()});
   }
   const {email,password}=req.body;
   try {
      let user=await User.findOne({email:req.body.email});
      if(!user){
         return res.status(400).json({error:"Please try to login with correct Credentials"})
      }
      const comparepass=await bcrypt.compare(password,user.password);
      if(!comparepass){
         return res.status(400).json({error:"Please try to login with correct Credentials"})
      }
      const data={user:{id:user.id}};
      const token = jwt.sign(data, jwtsecret);
       res.json({token});
   } catch (error) {
      console.error(error.message());
      res.status(500).send("Internal Error occurs")
   }
})
module.exports=router;