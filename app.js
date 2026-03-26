const express = require('express');
const connectToDatabase = require('./database');
const app = express();


connectToDatabase();

app.get("/",(res,req)=>{
  req.send("hello earth");
})

app.get('/toDoList',(res,req)=>{
  req.json({
    name : "cooking"
  })
})



app.listen(3000,()=>{
  console.log('NodeJs Project has started at 3000 port');
})