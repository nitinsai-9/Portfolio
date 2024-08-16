const mongoose=require('mongoose');

const responseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});

const resSchema=mongoose.model('responseSchema',responseSchema);
module.exports=resSchema;