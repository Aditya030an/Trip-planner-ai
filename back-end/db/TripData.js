const mongoos = require("mongoose");

const tripSchema = new mongoos.Schema({
    docID:String,
    hotelOption:Array,
    days:Array,
    userEmail:String,
    formData:Object,
})

module.exports = mongoos.model("products" , tripSchema);