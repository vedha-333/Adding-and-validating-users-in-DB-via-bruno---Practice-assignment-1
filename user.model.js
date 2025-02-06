const mongoose=require('mongoose')

const userModel=new mongoose.Schema({
    username:{
        type:String,
        requried:true
    },email:{
        type:String,
        requried:true
    },password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('userModel', userModel)
