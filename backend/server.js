const express=require("express");
// set the env in different file to make secret
const dotenv=require('dotenv');
const connectDb=require('./Config/Db');
const userRoutes=require('./routes/userRoutes');
const noteRoutes=require('./routes/noteRoutes')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app =express();
dotenv.config();
connectDb();
app.use(express.json())


// app.get('/',(req,res)=>{
//     res.send("API is running")
// })
// app.get('/api/notes',(req,res)=>{
//     res.json(notes)
// })
// the uid from th eapi to get the single data by parameters
// app.get('/api/notes/:id',(req,res)=>{
// const note =notes.find((n)=>n._id===req.params.id)
// res.send(note)
// })

app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT||5000;
// Express is like telling your app to start listening for visitors on a specific address and port
app.listen(PORT,console.log(`server started on PORT ${PORT}`)
)
