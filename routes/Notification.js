const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const College = require('../models/College');
const Dir = require('../models/Directorate');
const Notification =require('../models/Notification')

router.put('/req',auth,async(req,res)=>{
    let field1={}
    let field2={}
    const {request,accept}=req.body
    console.log("request sent")
    console.log(req.body);
    try{
        //sender
       let notf1=await Notification.findOne({id:request})
       let a=notf1.Request
    
       if(!a){
       field1.Request=new Array(`${accept}`)}
       else if(a.indexOf(accept)!=-1){
       field1.Request=a;}
       else{
       field1.Request=new Array(...a,`${accept}`);}


       //reciever
       let notf2=await Notification.findOne({id:accept})
       a=notf2.Accept
       if(!a){
       field2.Accept=new Array(`${request}`)}
       else if(a.indexOf(request)!=-1){
       field2.Accept=a;}
       else{
       field2.Accept=new Array(...a,`${request}`);}
     
       if(!notf1||!notf2) return res.status(404).json({msg:'REQUEST_ACCEPT_ERROR'})
       try{
       if(notf2.Request.indexOf(`${request}`)!=-1&&notf1.Accept.indexOf(`${accept}`)!=-1){
           field1={}
           field2={}
           const friend1=notf1.Accept.pop(`${accept}`);
           if(!notf1.Friends){
               notf1.Friends=new Array(friend1)
           }
           else{
               let x =notf1.Friends
            notf1.Friends=new Array(...x,friend1)
           }

           const friend2=notf2.Request.pop(`${request}`);
                if(!notf2.Friends){
                    notf2.Friends=new Array(friend2)
                }
                else{
                    let x =notf2.Friends
                notf2.Friends=new Array(...x,friend2)
                }
                field1.Friends=notf1.Friends;
                field2.Friends=notf2.Friends;
                field1.Accept=notf1.Accept;
                field2.Request=notf2.Request;
            }
       }catch(err){
       console.log(err);
       }
       /*if(notf1.id!==req.user.id) 
       {console.log('REQUEST_ACCEPT_ERROR UNAUTHERIZED');
           return res.status(401).json({msg:'USER_NOT_AUTHERIZED'})}
       */
       notf1 =await Notification.findByIdAndUpdate(notf1._id,{$set:field1},{new:true});
       notf2 =await Notification.findByIdAndUpdate(notf2._id,{$set:field2},{new:true});
       res.send({friends:notf1.Friends,accept:notf1.Accept,request:notf1.Request});
    }catch(err){
        console.error(err.name+':'+err.message);
       res.status(500).json({msg:"SERVER_ERROR"})
    }
});


router.get('/:id',auth,async(req,res)=>{
    try{
        const notf= await Notification.findOne({id:req.params.id});
        console.log(notf);
        res.send({friends:notf.Friends,accept:notf.Accept,request:notf.Request});
    }catch(err){
        console.error(err.name+':'+err.message);
       res.status(500).json({msg:"SERVER_ERROR"})
    }
 
});

module.exports = router;


