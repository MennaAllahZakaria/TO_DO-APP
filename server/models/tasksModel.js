const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    description:{
        type:String,
        trim:true,
        maxLength:200
    },
    completed:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    dueDate:{
        type:Date,
        default:null
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("Task",taskSchema);

