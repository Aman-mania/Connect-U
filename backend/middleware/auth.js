const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");


function userMiddleware(req, res, next) {
    const jwtToken=req.headers.authorization;
    try{
        const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
        if(decodedValue.phone_number){
            next();
        }
        else{
            res.status(403).json({
                msg:"user not found."
            })
        }
    }catch(e){
        res.json({
            msg:"incorrect input.",
            e
        })
    }
}

module.exports = userMiddleware;