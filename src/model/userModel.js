const mongoose = require("mongoose");

const user = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{
        taskName: {
            type: String
        },
        creationDate: {
            type: Date
        },
        isComplete: {
            type: Boolean
        }

    }]

})

const User = new mongoose.model("user", user)
module.exports = User