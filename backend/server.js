const express=require("express");
const notes = require("./data/notes");
// set the env in different file to make secret
const dotenv=require('dotenv')
const app =express();
dotenv.config();


app.get('/',(req,res)=>{
    res.send("API is running")
})
app.get('/api/notes',(req,res)=>{
    res.json(notes)
})
// the uid from th eapi to get the single data by parameters
app.get('/api/notes/:id',(req,res)=>{
const note =notes.find((n)=>n._id===req.params.id)
res.send(note)
})
const PORT=process.env.PORT||5000;
// Express is like telling your app to start listening for visitors on a specific address and port
app.listen(PORT,console.log(`server started on PORT ${PORT}`)
)
