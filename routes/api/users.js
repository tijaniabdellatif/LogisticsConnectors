const express = require('express');
const router = express.Router();
const {body,validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bycrypt = require('bcryptjs');
/**
 * @route  post api/users
 * @desc   Test route
 * @access Public
 */


router.post('/',[
     body('name','Name is required').not().isEmpty(),
     body('email','Please include a valid email').isEmail(),
     body('password','Please enter a password with 6 or more Characters').isLength({min:6})
],async (req,res) => {

        const errors = validationResult(req);
      
        if(!errors.isEmpty()){
               return res.status(400).json({
                       status:400,
                       errors:errors.array()
               });
          }

          const {name,email,password} = req.body;
          
          try{

             let user =  await User.findOne({ email })
             if(user){
                 res.status(400).json({
                    errors:[{msg:'User already exists'}]
                 })
             }

      
      const avatar = gravatar.url(email,{
           s:'200',
           r:'pg',
           d:'mm'
      });

      user = new User({
           name,
           email,
           avatar,
           password
       })

       const salt = await bycrypt.genSalt(10);
       user.password = await bycrypt.hash(password,salt);
       await user.save();

       //Rturn JSWON WEB TOKEN

       res.send('User registred');

          }catch(error){
                console.error(error.message);
                res.status(500).send({
                      status:500,
                      message:'Internal error Server'
                })
          }
          
})
module.exports = router;