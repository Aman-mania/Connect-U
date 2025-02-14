const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://zaidkh1303:mdzaid13@cluster0.2mghbnx.mongodb.net/ConnectU");

const ClientSchema = new mongoose.Schema({
    name:String,
    phone_number:String,
    password:String,
    address:String,
    rating:String,
    notification:[{
        recievername:String,
        reciever_num:String
    }]
});

const WorkerSchema = new mongoose.Schema({
    name:String,
    phone_number:String,
    password:String,
    address:String,
    profession:String,
    charge_by_day:Number,
    charge_by_hours:Number,
    rating:String,
    status:Boolean,
    distance:String,
    notification:[{
        sendername:String,
        sendernum:String,
        senderadd:String,
        senderrat:String
    }],
    feedback:[{
        sendername:String,
        sendernum:String
    }]
});


const Client = mongoose.model('Client', ClientSchema);
const Worker = mongoose.model('Worker', WorkerSchema);

module.exports = {
    Client,
    Worker
}