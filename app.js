const express = require('express');
const app = express();
const connectToDatabase = require('./database');
const toDoList = require('./Model/toDoListModel');

const fs = require('fs')

const {multer,storage}= require("./Middleware/multerConfig")


const upload = multer({storage : storage})


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


app.post("/toDoList",upload.single('photoUrl'),async (req,res)=>{
  let fileName;
  if(req.file){
    fileName = req.file.filename;
  }
  
    const {name , date , time , status} = req.body;


    await toDoList.create({
      name,
      date,
      time,
      photoUrl : "http://localhost:3000/"+fileName,
      status
    })
    res.status(201).json({
    "message" : "Data post Successfully"
  })
  
  

  
})


app.patch('/toDoList/:id',upload.single('photoUrl'),async (req,res)=>{
  let fileName;
  
  const id = req.params.id;
  const oldData = await toDoList.findById(id);

  if(req.file){
    
    
    const oldPhotoUrl = oldData.photoUrl;
    
    const Url = 'http://localhost:3000/'.length;

    const newPhotoUrl = oldPhotoUrl.slice(Url);

    fs.unlink(`storage/${newPhotoUrl}`,(error)=>{
      if(error){
        console.log(error);
      }else{
        console.log("file Deleted Successfully");
      }

    })
    fileName = req.file.filename;
  }
  

  const {name , date , time , status} = req.body;
  await toDoList.findByIdAndUpdate(id,{
    name,
    date,
    time,
    photoUrl : 'http://localhost:3000/'+fileName,
    status
  })

  res.status(201).json({
    "message" : "Data Updated Successfully"
  })
})

app.delete('/toDoList/:id',async (req,res)=>{
  const id = req.params.id;

  const oldData = await toDoList.findById(id);
  const oldPhotoUrl = oldData.photoUrl;
  const Url = 'http://localhost:3000/'.length;

  const newPhotoUrl = oldPhotoUrl.slice(Url);

  fs.unlink(`storage/${newPhotoUrl}`,(error)=>{
    if(error){
      console.log(error);
    }else{
      console.log("file Deleted Successfully");
    }

  })
  await toDoList.findByIdAndDelete(id);

  res.status(200).json({
    message : 'Data Deleted Successfully'
  })
})


app.use(express.static("/storage/"))

app.listen(3000,()=>{
  console.log('NodeJs Project has started at 3000 port');
})