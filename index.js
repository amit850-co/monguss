let express=require('express');
var mongoose =require('mongoose');
let enquiremodel=require('./models/Enquary.model');
const { Await } = require('react-router-dom');
require('dotenv').config();

let app =express();



app.use(express.json());
app.post('/api/enquery-inseart',(req,res)=>{

let {sname,sgmail,sphone,smassage}=req.body;

 let enq= new enquiremodel({
    name:sname,
    email:sgmail,
    phone:sphone,
    message:smassage
 });
 enq.save().then(()=>{
  res.send({status:1,message:"Enquiry saved successfully"});
 
 }).catch((err)=>{
  res.send({status:0,message:"Enquiry while saving Enquiry",error:err
  });
  
 })
})

app.get('/api/enquery-list',async(req,res)=>{

  let enlist=await enquiremodel.find();
  res.status(200).json({status:1,message:"Enquiry list",data:enlist} )
     })

     app.delete('/api/enquery-delete/:id',async(req,res)=>{
      
      let enqid=req.params.id;
      let deleteenquery=await enquiremodel.deleteOne({_id:enqid});
      res.send({status:1,message:"Enquiry delete successfully",id:enqid,delRes:deleteenquery})
     })

     app.put("/api/enquery-update/:id",async(req,res)=>{
      let enqid=req.params.id;

      let {sname,sgmail,sphone,smassage}=req.body;
      let updateobj={
        name:sname,
        email:sgmail,
        phone:sphone,
        message:smassage
      
      
      
      }
      let updateres=await enquiremodel.updateOne({_id:enqid},updateobj)
      res.send({status:1,message:"Enquiry update successfully",updateobj})

      })




mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connect to mongodb");
  app.listen(process.env.PORT,()=>{
    console.log("surver is running"+process.env.PORT);
  })

 
})
