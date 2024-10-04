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
router.get('/notification',userMiddleware,async(req,res)=>{
    const jwtToken=req.headers.authorization;
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    const phone=decodedValue.phone_number;
    try{
        const user=await Worker.findOne({
            phone_number:phone
        })

        const msg=user.notification;
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



router.post("/list/:id", userMiddleware, async (req, res) => {
    const jwtToken = req.headers.authorization;
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    const phone = decodedValue.phone_number;

    try {
        const sender = await Worker.findOne({
            phone_number: phone
        })
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



router.post('/notification/:id', userMiddleware,async(req,res)=>{
    const msgid=req.params.id;
    const jwtToken=req.headers.authorization;
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    const phone=decodedValue.phone_number;
    try{
        const user=await Worker.findOne({
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

        await Worker.updateOne({
            phone_number:phone,
        },{
            $set: { 
                status:false
            }
        })

        const new_notification={
            recievername:user.name,
            reciever_num:phone
        }
        // console.log(new_notification)

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
        
        sendSMS('You recieved a notification in ConnectU');


        await Client.updateOne({
            phone_number:sendernum
        },{$push:{notification:new_notification}})
        res.json({
            msg: "done"
        })


    }catch(e){
        res.status(400).json({e})
    }


})





router.post('/signup', async (req, res) => {
    const body = await req.body;
    const { success } = workersignupInput.safeParse(body);
    // console.log(body);
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

router.post('/signin', async (req, res) => {
    const body = await req.body;
    const { success } = signinInput.safeParse(body);
    if (!success) {
        res.status(400).json({ error: "invalid input" });
    }

    else {
        const phone_number = req.body.phone_number;
        const password = req.body.password;

        const user = await Worker.find({
            phone_number,
            password
        })
        if (user) {
            const token = jwt.sign({
                phone_number
            }, JWT_SECRET);

            res.json({
                token
            })
        } else {
            res.status(411).json({
                message: "Incorrect phone_number and pass"
            })
        }
    }
});


module.exports = router;