const mongoose = require('mongoose');

const foodschema = new mongoose.Schema({
    foodid: {
        type: Number,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    foodname: {
        type: String,
        required: true
    },
    fooddescription: {
        type: String,
        required: true
    },
    foodcategory: {
        type: String,
        required: true,
        enum: ['breakfast', 'lunch', 'snacks', 'dinner', 'desserts']        
    },
    foodsubcategory: {
        type: [String],
        required: true,
        enum: ['veg', 'non-veg']        
    },
    foodprice: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
              return value >= 0;
            },
            message: 'Price must be valid number'
          }
    },
    seller: {
        type: Object,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const food = mongoose.model('Food', foodschema);

function generateRandomId() {
    return Math.floor(Math.random() * 900000) + 100000;
}

module.exports = food;