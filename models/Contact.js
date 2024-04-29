const mongoose = require("mongoose")

const contactschema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true
    },
  });

const contact = mongoose.model('contact', contactschema); // (collection name, schema)

module.exports = contact;