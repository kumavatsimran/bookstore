const  mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/userData");

const db=mongoose.connection;

db.on('connection',(err)=>{
    if (err) {
        console.log("database not connect");
        return false
    }
    else{
        console.log("database is connected");
        return true
    }
})
