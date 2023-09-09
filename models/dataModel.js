const mongoose = require('mongoose') ;

const chatSchema = mongoose.Schema(
    {
        name:{
            type:String ,
            required:true ,
            default : 'anonymous'
        } ,
        place : {
            type: String ,
            required : true ,
            default : ''
        },
        data : {
            type: String ,
            required : true ,
            default : ''
        },
        date : {
            type: Date ,
            required : true ,
            default : Date.now
        },
        
    } ,
    {
        timestamps: true
    }
)

const Chat  = mongoose.model('chat_1',chatSchema) ;
// 'expense_1' will be created inside mongo db cluster which model like studentSchema
module.exports = Chat ;