const express = require("express");
const fs = require('fs');
// const users = require('./MOCK_DATA.json');
const { default: mongoose } = require("mongoose");
const { type } = require("os");
const app = express();
const PORT = 8000;
mongoose
.connect("mongodb://127.0.0.1:27017/practice-app")
.then(() => console.log("Mongo Connected"))
.catch(err => console.log("Mongo err" , err));
// Schema Design
const UserSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phoneNo:{
        type: String,
        required: true,
        unique: true,
    },
},
{timestamps: true}
);

// model
const User = mongoose.model("user" , UserSchema);

// MiddleWare/Plugin
app.use(express.urlencoded({extended: false}));
app.get("/users" ,async (req , res) =>{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.first_name}-${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
// Routes
app.get("/api/users" ,async (req,res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})

app
.route("/api/users/:id")
.get(async(req , res) =>{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).json({error: "user not found"});
    return res.json(user);
})
.patch(async(req,res) =>{
    // edit user with id
    await User.findByIdAndUpdate(req.params.id , {first_name: "Mohit", last_name: "Patel"});
    return res.json({status: "success"});
})
.delete(async(req,res) => {
    // delete user with id
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "success"});
});
app.post("/api/users" , async (req,res) =>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.phoneNo){
        return res.status(400).json({msg : "All fields are required"});
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phoneNo:body.phoneNo,
    });
    console.log("result",result);
    return res.status(201).json({msg: "success"});
    // users.push({...body , id: users.length + 1});
    // fs.writeFile('./MOCK_DATA.Json' , JSON.stringify(users) , (err,data) =>{
    //     return res.status(201).json({status: "Success" , id: users.length});
    // });
});
// app.listen(PORT , () => console.log('Server Started at Port: 8000'))