let mongoose =require('mongoose');

let userenquaryscema=mongoose.Schema({

name : {
    type:String,
    require:true
},
email : {
    type:String,
    require:true,
    unique:true
},
phone : {
    type:String,
    require:true,
   
},

message : {
    type:String,
    require:true,
   
}


});

let enquiremodel = mongoose.model("enq",userenquaryscema)
module.exports=enquiremodel;