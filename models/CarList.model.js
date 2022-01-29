const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  id: {
    type : Number,
    required: true
  },
  carmake: {
    type : String,
  },
  carmodel: {
    type : String,
  },
  carcompany: {
    type : String,
  },
})

const CarList = mongoose.model("car", carSchema);

module.exports =  { CarList };