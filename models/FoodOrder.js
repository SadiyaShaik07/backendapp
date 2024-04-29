const mongoose = require('mongoose');
const moment = require('moment-timezone');

const foodOrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    //this value will be taken from Food model
    foodid: {
        type: Number,
        required: true
    },
    //this value will be taken from Customer model
    customeremail: {
        type: String,
        required: true
    },
    customerlocation: {
        type:String,
        required:true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "ORDERED"
    },
    orderedTime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    },
    quantity: {
        type: Number,
        required: true
    }
});

const FoodOrder = mongoose.model('FoodOrder', foodOrderSchema);

function generateRandomId() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "J" + randomNumber;
}

module.exports = FoodOrder;