const multer = require("multer");
const storage = multer.diskStorage({
  destination : function(req,file,cb){
    const fileAllowed = ['image/png','image/jpg','image/jpeg'];
    if(!fileAllowed.includes(file.mimetype)){
      cb("Error File Type is not Supported");
      return;
    }else{
      cb(null,'./storage');
    }
    
  },

  filename : function(req,file,cb){
    cb(null,Date.now()+"-"+file.originalname)
  }
})


module.exports = {multer,storage}