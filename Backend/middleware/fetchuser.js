var jwt=require('jsonwebtoken');
const JWT_SECRET="hellosainty";


const fetchuser=(req, res, next)=>{
    const token=req.header('authtoken')
    if(!token){
        return res.status(401).send({error: "Enter a valid token"})
    }
    try {
        const data=jwt.verify(token, JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        return res.status(401).send({error: "Enter a valid token"})
    }
}

module.exports=fetchuser