const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false,
        },
        pic:{
            type:String,
            required:true,
            default:"https://robohash.org/mail@ashallendesign.co.uk"
        },
    },
    {
        timestamps:true,
    }
);
// passed middleware om this async as next tpo make the checked if the thing is done move to next
userSchema.pre('save',async function (next) {
    // mongoose function
    if(!this.isModified('password')){
        next();
    }
    // bcrypt functionality salt to generate pass 
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})
userSchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const User=mongoose.model('User',userSchema);
module.exports=User;