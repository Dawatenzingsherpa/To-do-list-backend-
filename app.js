const express = require('express');
const app = express();


app.get("/",(res,req)=>{
  req.send("hello earth");
})

app.listen(3000,()=>{
  console.log('NodeJs Project has started at 3000 port');
})