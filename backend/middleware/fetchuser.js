var jwt = require("jsonwebtoken");
const JWT_SECRET = "Umangisagoodboy";

const fetchuser = (req, res, next) => {

    // Get user from JWT token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticte using a valid token"});
    }

    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;    
        next();
    }catch(err){
        res.status(401).send({error:"please authenticte using a valid token"});
    }   
}

module.exports = fetchuser;