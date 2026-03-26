const express = require('express');
const app = express();
const connectToDatabase = require('./database');
const toDoList = require('./Model/toDoListModel');


connectToDatabase();
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("hello earth");
})

app.get('/toDoList',(req,res)=>{
  res.json({
    name : "cooking"
  })
})


app.post("/toDoList",async (req,res)=>{
  const {name , date , time , photoUrl , status} = req.body;
  await toDoList.create({
    name,
    date,
    time,
    photoUrl,
    status
  })

  res.status(201).json({
    "message" : "Data post Successfully"
  })
})

app.listen(3000,()=>{
  console.log('NodeJs Project has started at 3000 port');
})