const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String
    },
    email: {
        type: String,
    },

    nic: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roles: {
        type: String,
    }

})

const Iuser = mongoose.model("iuser", userSchema);
module.exports = Iuser;