const { Router } = require("express");
const userMiddleware = require("../middleware/auth");
const { Client, Worker } = require("../db");
const { clientsignupInput, signinInput } = require("@zaid1303/connectu5-common");
const { JWT_SECRET } = require("../config");
const router = Router();
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const moment = require("moment-timezone");
require("dotenv").config();


cron.schedule('0 0 * * *', async () => {
    const curtime = moment.tz("Asia/Kolkata").format();
    try {
        await Client.updateMany({}, { $set: { notification: [] } })
        res.json({
            msg: "done"
        })
    } catch (e) {
        res.status(400).json({ e });
    }

}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
})


router.get('/list', userMiddleware, async (req, res) => {
    try {
        const list = await Worker.find({
            status: true
        });
        res.json({
            list
        })

    } catch (e) {
        res.json({
            e
        })
    }
})



router.post('/signup', async (req, res) => {
    console.log("hi");
    const body = await req.body;
    console.log(body);
    const { success } = clientsignupInput.safeParse(body);
    if (!success) {
        res.status(400).json({ error: "invalid input" });
    }
    else {
        const name = req.body.name;
        const phone_number = req.body.phone_number;
        const password = req.body.password;
        const address = req.body.address;

        try {
            const user = await Client.find({
                phone_number
            })
            if (user.length != 0) {
                res.status(403).json({
                    message: "Phone number already exist."
                })
                // alert("Phone number already exist")
            }
            else {
                await Client.create({
                    name: name,
                    phone_number: phone_number,
                    password: password,
                    address: address
                })
                const token = jwt.sign({
                    phone_number,
                    worker: false
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


router.get('/notification', async (req, res) => {
    // const phone=await req.body.phone_number
    const jwtToken = req.headers.authorization;
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    const phone = decodedValue.phone_number;
    try {
        const user = await Client.findOne({
            phone_number: phone
        })

        const msg = user.notification;
        res.json({
            msg
        })
    } catch (e) {
        res.status(400).json({ e })
    }
})


router.post("/list/:id", async (req, res) => {
    // const jwtToken = req.headers.authorization;
    // const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    // const phone = decodedValue.phone_number;
    console.log("hi")
    const body=await req.body;
    const phone=body.phone_number;
    console.log(phone);
    try {
        const sender = await Client.findOne({
            phone_number: phone
        })
        // console.log(sender)
        const id = req.params.id;

        const new_notification = {
            sendername: sender.name,
            sendernum: sender.phone_number,
            senderadd: sender.address,
            senderrat: sender.rating
        }
        console.log(new_notification)

        const reciever = await Worker.findOne({
            _id: id
        })
        // console.log(reciever)

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
    const phone=await req.body.phone_number
    const wphone=await req.body.reciever_num
    const rat=await req.body.rating
    console.log(req.body)
    try{
        const user=await Client.findOne({
            phone_number:phone
        })
        const id=await Client.findOne({
            phone_number:phone
        })
        let msg={};
        user.notification.forEach(element => {
            if(element._id==msgid){
                msg= element
            }
        });
        console.log(msg)

        await Client.updateOne({
            _id:id
        }, { $pull: { notification: msg } })


        await Worker.updateOne({
            phone_number:wphone
        },{$set:{rating:rat}})


    }catch(e){
        res.status(400).json({e})
    }


})





module.exports = router;