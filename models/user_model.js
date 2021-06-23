const mongoose = require("mongoose");

const newSchema = mongoose.Schema({
        name : {
        type: String,
        required: true,
        },
        phone : {
        type: Number,
        required: false,
                },
        username : {
        type: String,
        required: true,
        unique: true
        },
        password: {
        type: String,
        required: true,
        }
    },
    {
        collection: "users"
    }
);

const model = mongoose.model("UserSchema", newSchema);

module.exports = model;