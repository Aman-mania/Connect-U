const { Router } = require("express");
const { Client,Worker } = require("../db");
const { JWT_SECRET } = require("../config");
const { workersignupInput, signinInput } = require("@zaid1303/connectu5-common");
const router = Router();
const jwt = require("jsonwebtoken");


router.post('/', async (req, res) => {
    const body = await req.body;
    console.log(body);
    const { success } = signinInput.safeParse(body);
    try{

        if (!success) {
            res.status(400).json({ error: "invalid input" });
        }
    
        else {
            const phone_number = req.body.phone_number;
            const password = req.body.password;
    
            const worker = await Worker.find({
                phone_number:phone_number,
                password:password
            })
            console.log(worker)
            if (worker.length!=0) {
                const token = jwt.sign({
                    phone_number,
                    worker:true
                }, JWT_SECRET);
    
                res.json({
                    token
                })
            }
            else{
                const client=await Client.find({
                    phone_number:phone_number,
                    password:password
                })
                if(client.length!=0){
                    const token = jwt.sign({
                        phone_number,
                        worker:false
                    }, JWT_SECRET);
        
                    res.json({
                        token
                    })
                }
                
                else {
                    res.status(411).json({
                        message: "Incorrect phone_number and pass"
                    })
                }
            }
        }
    }catch(e){
        res.status(403).json({e});
    }
});


module.exports = router;