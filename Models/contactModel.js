const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")
const connectSchema = mongoose.Schema({
    user_id :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    name : {
        type: String,
        required : [true, "please add the contact name"],
    },
    email : {
        type : String,
        required : [true, "please add the cotact email"]
    },
    phone : {
        type : String,
        required : [true, "please add the cotact Phone Number"]
    }
},
{
    Timestamp : true,
}
)

module.exports = mongoose.model("contacts", connectSchema)