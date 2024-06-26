const { Timestamp } = require("mongodb");
const  mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required : [true, "please enter username"]
    },
    email:{
        type : String,
        required : [true, "please enter email"],
        unique : [true, "email Address already exist"]
    },
    password:{
        type : String,
        required : [true, "please enter password"],
    }

},{
    Timestamp : true,
}
)

module.exports = mongoose.model("User", userSchema);

