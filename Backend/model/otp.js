const mongoose = require('mongoose');
const db=require('../db');
const {Schema}=mongoose;
const OtpSchema = new Schema({
  
email:{type:String},
code:{type:String},
expireIn:{type:Number}
},{
    timestamps:true
});
let otp=mongoose.model('otp',OtpSchema,'otp');