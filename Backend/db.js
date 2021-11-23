const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connecting to MONGODB Successfully");
    });
}
module.exports=connectToMongo;