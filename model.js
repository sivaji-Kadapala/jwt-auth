//8.importingthe mongoose
const mongoose = require('mongoose');
//9Register is the schema,it contain values username,email,password,confirm password
let Registeruser = new mongoose.Schema({
    username :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required:true,
    },
    confirmpassword : {
        type : String,
        required : true,
    }
})
//10.Export schema,in this first one is the model,second argument is Schema,next go to the server.js
module.exports = mongoose.model('Registeruser',Registeruser)