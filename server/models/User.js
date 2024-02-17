const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   
    userId: String,
   
    username: String,
   
    email: String,
   
    profile: String,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;