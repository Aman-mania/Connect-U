const { Router } = require("express");
const userMiddleware = require("../middleware/auth");
const { Client,Worker } = require("../db");
const { JWT_SECRET } = require("../config");
const { workersignupInput, signinInput } = require("@zaid1303/connectu5-common");
const cron=require("node-cron");
const moment=require("moment-timezone");
const router = Router();
const jwt = require("jsonwebtoken");

cron.schedule('0 0 * * *',async()=>{
    const curtime=moment.tz("Asia/Kolkata").format();
    try{
        await Worker.updateMany({},{  $set: { status:false}  })
        await Worker.updateMany({},{  $set: { notification:[]}  })
        res.json({
            msg:"done"
        })
    }catch(e){
        res.status(400).json({e});
    }

},{
    scheduled:true,
    timezone:"Asia/Kolkata"
})

router.get('/list', userMiddleware, async (req, res) => {
    const jwtToken=req.headers.authorization;
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    const phone=decodedValue.phone_number;
    try {
        const list = await Worker.find({
            phone_number:{$ne:phone},
            status:true
        });
        res.json({
            list
        })

    } catch (e) {
        res.status(411).json({
            e
        })
    }
})

router.put('/changestatus',userMiddleware,async (req,res)=>{
    console.log("cs")
    const jwtToken=req.headers.authorization;
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    const phone=decodedValue.phone_number;

    try{
        const user=await Worker.findOne({
            phone_number:phone
        })
        let new_status;
        if(user.status===false){
            new_status=true;
        }
        else{
            new_status=false;
        }
        const update = {
            $set: { 
                status:new_status
            }
        };

        await Worker.updateOne({
            phone_number:phone
        },update)

        const updated_user=await Worker.findOne({
            phone_number:phone
        })
        res.json({
            updated_user
        })
    }catch(e){
        res.status(400).json({
            e
        })
    }
})
router.get('/notification',async(req,res)=>{
    const jwtToken=req.headers.authorization;
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    const phone=decodedValue.phone_number;
    try{
        const user=await Worker.findOne({
            phone_number:phone
        })

        const msg=user.notification;
        // console.log(msg)
        res.json({
            msg
        })
    }catch(e){
        res.status(400).json({e})
        console.log(e)
    }
})




router.get('/feedback',async(req,res)=>{
    const jwtToken=req.headers.authorization;
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    const phone=decodedValue.phone_number;
    try{
        const user=await Worker.findOne({
            phone_number:phone
        })

        const msg=user.feedback;
        // console.log(msg)
        res.json({
            msg
        })
    }catch(e){
        res.status(400).json({e})
        console.log(e)
    }
})


router.post('/feedback/:id',async(req,res)=>{
    const msgid=req.params.id;
    const phone=await req.body.phone_number
    const cphone=await req.body.sendernum
    const rat=await req.body.rating
    try{
        const user = await Worker.findOne({
            phone_number:phone
        })
        const id=await Worker.findOne({
            phone_number:phone
        })
        let msg={}
        user.feedback.forEach(e=>{
            if(e._id==msgid){
                msg=e
            }
        })
        await Worker.updateOne({
            _id:id
        },{$pull:{feedback:msg}})
        await Client.updateOne({
            phone_number:cphone
        },{$set:{rating:rat}})

    }catch(e){
        res.status(400).json({e})
    }
})




router.get('/status',async(req,res)=>{
    const jwtToken=req.headers.authorization;
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    const phone=decodedValue.phone_number;

    // const phone=await req.body.phone_number
    // console.log(phone)
    try{
        const user=await Worker.findOne({
            phone_number:phone
        })

        const msg=user.status;
        // console.log(user)
        res.json({
            msg
        })
    }catch(e){
        res.status(400).json({e})
    }
})




router.get('/profile',userMiddleware,async (req,res)=>{
    const jwtToken=req.headers.authorization;
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    const phone=decodedValue.phone_number;
    try {
        const profile = await Worker.findOne({
            phone_number:phone
        });
        res.json({
            profile
        })
    }
    catch (e) {
        res.status(411).json({ e });
    }
})

// router.use("/list/:id",async(req,res,next)=>{
//     try{
//         const jwtToken=req.header("authorization")||"";
//         // console.log(jwtToken);
//         if(!jwtToken){
//             res.json({err:"unauthorized"})
//         }
//         else{
//             const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
//             // console.log(decodedValue)
//             if(!decodedValue.phone_number){
//                 console.log("yes")
//             }
//             else{
//                 req.phone_number=decodedValue.phone_number
//                 await next();
//             }
//         }
//     }catch(e){
//         console.log(e)
//         res.json({
//             // msg:"incorrect input.",
//             e
//         })
//     }
// })


router.post("/list/:id", async (req, res) => {
    console.log("hi")
    const body=await req.body;
    const phone=body.phone_number;
    console.log(phone);

    try {
        const sender = await Worker.findOne({
            phone_number: phone
        })

        console.log(phone)
        const id = req.params.id;

        const new_notification = {
            sendername: sender.name,
            sendernum: sender.phone_number,
            senderadd: sender.address
        }
        const reciever = await Worker.findOne({
            _id: id
        })
        const accountSid = process.env.Accountsid;
        const authToken = process.env.Accounttoken;
        const client = require('twilio')(accountSid, authToken);

        const sendSMS=async(body)=>{
            let msg={
                from:process.env.from,
                to:'+91'+reciever.phone_number,
                body,
            };
            try{
                const message=await client.messages.create(msg);
                console.log(message);
            }
            catch(e){
                console.log(e)
            }
        }; 
        sendSMS('You recieved a notification in ConnectU');
        await Worker.updateOne({
            _id: id
        }, { $push: { notification: new_notification } })
        res.json({
            msg: "done"
        })
    } catch (e) {
        res.status(400).json({ e })
    }
})



router.post('/notification/:id',async(req,res)=>{
    const msgid=req.params.id;
    // const jwtToken=req.headers.authorization;
    // const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    // const phone=decodedValue.phone_number;
    const phone=await req.body.phone_number
    try{
        const user=await Worker.findOne({
            phone_number:phone
        })
        const id=await Worker.findOne({
            phone_number:phone
        })
        let msg={};

        user.notification.forEach(element => {
            if(element._id==msgid){
                msg= element
            }
        });
        console.log(msg)
        const sendernum=msg.sendernum
        const sendername=msg.sendername
        console.log(sendernum)

        await Worker.updateOne({
            phone_number:phone,
        },{
            $set: { 
                status:false
            }
        })

        await Worker.updateOne({
            _id:id
        }, { $pull: { notification: msg } })

        const new_notification={
            recievername:user.name,
            reciever_num:phone
        }
        const new_feedback={
            sendername:sendername,
            sendernum:sendernum
        }
        console.log(new_notification)

        const accountSid = process.env.Accountsid;
        const authToken = process.env.Accounttoken;
        const client = require('twilio')(accountSid, authToken);

        const sendSMS=async(body)=>{
            let msg={
                from:process.env.from,
                to:'+91'+sendernum,
                body,
            };
            try{
                const message=await client.messages.create(msg);
                console.log(message);
            }
            catch(e){
                console.log(e)
            }
        }; 
        sendSMS(`${user.name} accept your job.This is his phone number ${user.phone_number} feel free to contact him.`);
        


        await Client.updateOne({
            phone_number:sendernum
        },{$push:{notification:new_notification}})

        await Worker.updateOne({
            _id:id
        },{$push:{feedback:new_feedback}})

        res.json({
            msg: "done"
        })
    }catch(e){
        res.status(400).json({e})
    }
})



router.post('/notification/reject/:id',async(req,res)=>{
    const msgid=req.params.id;
    // const jwtToken=req.headers.authorization;
    // const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    // const phone=decodedValue.phone_number;
    const phone=await req.body.phone_number
    try{
        const user=await Worker.findOne({
            phone_number:phone
        })
        const id=await Worker.findOne({
            phone_number:phone
        })
        let msg={};

        user.notification.forEach(element => {
            if(element._id==msgid){
                msg= element
            }
        });
        console.log(msg)
        const sendernum=msg.sendernum
        console.log(sendernum)

        await Worker.updateOne({
            _id:id
        }, { $pull: { notification: msg } })

        const accountSid = process.env.Accountsid;
        const authToken = process.env.Accounttoken;
        const client = require('twilio')(accountSid, authToken);

        const sendSMS=async(body)=>{
            let msg={
                from:process.env.from,
                to:'+91'+sendernum,
                body,
            };
            try{
                const message=await client.messages.create(msg);
                console.log(message);
            }
            catch(e){
                console.log(e)
            }
        }; 
        sendSMS(`${user.name} don't accept your job.So try to connect to the other workers.`);
        
    }catch(e){
        res.status(400).json({e})
    }
})







router.post('/signup', async (req, res) => {
    const body = await req.body;
    const { success } = workersignupInput.safeParse(body);
    console.log(body);
    if (!success) {
        res.status(400).json({ error: "invalid input" });
    }
    else {
        const name = req.body.name;
        const phone_number = req.body.phone_number;
        const password = req.body.password;
        const address = req.body.address;
        const profession = req.body.profession;
        const charge_by_day = req.body.charge_by_day;
        const charge_by_hours = req.body.charge_by_hours;
        const rating = 0;
        const status=true;
        const notification=[];

        try {
            const user = await Worker.find({
                phone_number
            })
            console.log(user);
            if (user.length != 0) {
                res.status(403).json({
                    message: "Phone number already exist."
                })
            }
            else {
                await Worker.create({
                    name: name,
                    phone_number: phone_number,
                    password: password,
                    address: address,
                    profession: profession,
                    charge_by_day: charge_by_day,
                    charge_by_hours: charge_by_hours,
                    rating: rating,
                    status:status,
                    notification:notification
                })
                const token = jwt.sign({
                    phone_number,
                    Worker: true
                }, JWT_SECRET);
                // console.log(token);
                res.json({
                    token
                })
            }
        } catch (e) {
            res.json({
                e
            })
        }
    }
});


module.exports = router;