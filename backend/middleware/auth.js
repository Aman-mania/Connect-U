const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");


async function userMiddleware(req, res, next) {
    // console.log(jwtToken)
    try{
        const jwtToken=req.header("authorization")||"";
        // console.log(jwtToken);
        if(!jwtToken){
            res.json({err:"unauthorized"})
        }
        else{
            const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
            // console.log(decodedValue)
            if(!decodedValue.phone_number){
                console.log("yes")
            }
            else{
                req.phone_number=decodedValue.phone_number
                await next();
            }
        }
    }catch(e){
        console.log(e)
        res.json({
            // msg:"incorrect input.",
            e
        })
    }
}

module.exports = userMiddleware;