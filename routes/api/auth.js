const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body,validationResult } = require('express-validator');
require('dotenv').config()


/**
 * @route  GET api/auth
 * @desc   Test route
 * @access Public
 */
router.get('/',auth, async (req,res) => {
     
     try{
          const user = await User.findById(req.user.id)
          .select('-password');
          res.json(user);
     }catch(err){
          console.log(err.message);
          res.status(500).send({
                   status:500,
                   message:'Error server'
          })

     }
})


/**
 * @route POST api/auth
 * @description authenticate a user get token
 * @access public
 * @param String uri 
 * @param Array validation
 * @callback (request,response)
 */
router.post('/',[
     body('email','Please include a valid email').isEmail(),
     body('password','Password is required').exists()
],async (req,res) => {

        const errors = validationResult(req);
      
        if(!errors.isEmpty()){
               return res.status(400).json({
                       status:400,
                       errors:errors.array()
               });
          }

          const {email,password} = req.body;
          
          try{

             let user =  await User.findOne({ email })
             if(!user){
                 res.status(400).json({
                    errors:[{msg:'Invalid credentials'}]
                 })
             }

      
             const isMatch = await bycrypt.compare(password,user.password); 

             if(!isMatch){

               res.status(400).json({
                    errors:[{msg:'Invalid credentials'}]
                 })
             }
        const payload = {
              user:{
                   id:user.id,
              }
        }

          jwt.sign(payload,process.env.JWT_SECRET,{
               expiresIn:3600000
          },(err,token) => {

                  if(err) throw err;
                  res.json({ token:token,bags:[
                      {status:200,msg:'success',color:'green',additional:[]},
                      
                  ]});
                  
          })

          }
          catch(error){
                console.error(error.message);
                res.status(500).send({
                      status:500,
                      message:'Internal error Server'
                })
          }
          
})

module.exports = router;