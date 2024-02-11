const mongoose = require('mongoose')


const empSchema = new mongoose.Schema({
     empname: {
          type:String,
          required:true
     },
     empdept:{
         type:String,
         required:true
     },
     empdesignation:{
        type:String,
        required:true
    },
    empmail:{
        type:String,
        required:true,
        unique:true
    },
    empphonenumber:{
        type:Number,
        required:true,
        unique:true  
  }

},{
      timestamps:true
})



module.exports = mongoose.model('employee', empSchema)