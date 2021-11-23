const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{obj={b:"this",number:45}
res.json(obj)})
module.exports=router;