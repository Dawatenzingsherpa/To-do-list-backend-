const mongoose = require("mongoose");

const toDoListScheme = new mongoose.Schema({
  name :{
    type : String,
    unique : true
  },
  date :{
    type : String
  },
  time : {
    type : String
  },
  photoUrl : {
    type : String
  },
  status : {
    type : String
} 

  
})

const toDoList = mongoose.Model("toDoList",toDoListScheme);
module.exports = toDoList;