const mongoose = require("mongoose");
const connectionString = "mongodb://dawa:dawa@ac-g8olncw-shard-00-00.z7rdqts.mongodb.net:27017,ac-g8olncw-shard-00-01.z7rdqts.mongodb.net:27017,ac-g8olncw-shard-00-02.z7rdqts.mongodb.net:27017/?ssl=true&replicaSet=atlas-f5dopq-shard-0&authSource=admin&appName=Cluster0";

async function connectToDatabase(){
  await mongoose.connect(connectionString);
  console.log("connected to Database successfully");
}

module.exports = connectToDatabase;