const express=require("express");
const mongoose=require("mongoose");
let server=express();


//this allow the files in public folder to access directly and publically
server.use(express.static("public"))

//for access body or inforamtion comming from forms we use this middleware
server.use(express.urlencoded({extended:true}))

//for json request like fetch from client to the server
//this command allow to parse json information from the body
server.use(express.json())

//set the view engine ejs for use ejs files
server.set("view engine","ejs");

// server.get("/api/students",function(req,res){
// let students=[{"name":"ali"},{"name":"azeem"}]

// res.send(students);
// })


//for mongo db connection...
mongoose.connect("mongodb+srv://credential@cluster0.stvjsyv.mongodb.net/").then(()=>{
    console.log("Mongoose Connect Successfully")
}).catch(error=>console.log("Mongoose Connection error: "+error))

let studentSchema=mongoose.Schema({
    name : String,
    address: String
})
// let Student=require("./models/students");
let Student=mongoose.model("students",studentSchema);

server.get("/api/students",async function(req,res){
let students=await Student.find();
res.send(students);
})


server.get("/",(req,res)=>{
// res.status(500).json({message:"Azeem"})
// res.json({message:"Azeem"})
// res.download("express-app.js")
res.render("index",{name:"Azeem"})
})

//use routes so that we create nested url like for all the url in users
//starts with /users so we not define every time instead use routers
const userRouter= require('./routes/users')
server.use('/users',userRouter)


server.listen("5000",()=>{
console.log("Server is running on port: 5000")
})