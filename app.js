const express = require('express');
const app = express();
const connectToDatabase = require('./database');
const toDoList = require('./Model/toDoListModel');


connectToDatabase();
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("hello earth");
})

app.get('/toDoList',async (req,res)=>{
  const todoLists = await toDoList.find();
  res.status(200).json({
    message : "Data Fetched Successfully",
    data : todoLists
  })
})

app.get('/toDoList/:id',async(req,res)=>{
  const id = req.params.id;
  const toDo = await toDoList.findById(id);
  res.status(200).json({
    message : 'Data Fetched Successfully',
    data : toDo
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


app.patch('/toDoList/:id',async (req,res)=>{
  const id = req.params.id;
  const {name , date , time , photoUrl , status} = req.body;
  await toDoList.findByIdAndUpdate(id,{
    name,
    date,
    time,
    photoUrl,
    status
  })

  res.status(201).json({
    "message" : "Data Updated Successfully"
  })
})

app.delete('/toDoList/:id',async (req,res)=>{
  const id = req.params.id;
  await toDoList.findByIdAndDelete(id);

  res.status(200).json({
    message : 'Data Deleted Successfully'
  })
})

app.listen(3000,()=>{
  console.log('NodeJs Project has started at 3000 port');
})