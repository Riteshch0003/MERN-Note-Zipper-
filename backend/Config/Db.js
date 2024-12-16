const mongoose=require('mongoose')
 const connectDb=async()=>{
        try {
            const conn=await mongoose.connect(process.env.MONGO_URI,{
           
        });
        console.log(`MongoDb Connected:${conn.connection.host}`);
        
    }
         catch (error) {
            console.error(`Error:${error.message}`);
            process.exit();
        }
    }
    module.exports=connectDb;