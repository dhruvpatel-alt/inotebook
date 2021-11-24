const jwt = require('jsonwebtoken');
const jwtsecret="DHruv PATel is gen!us";
const fetchuser=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({error:"please login using valid token"});
    }
    try {
        const data=jwt.verify(token,jwtsecret);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please login using valid token"});
    }
}
 module.exports=fetchuser; 