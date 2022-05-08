const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=> {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err) res.status(403).json("Invalid Token")
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Not authenticated")
    }
};

const verifyTokenAndAuthorisation = (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status.json("This functionality is not permitted to you");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin){
            next()
        }else{
            res.status.json("This functionality is not permitted to you");
        }
    });
};

module.exports = {verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin};