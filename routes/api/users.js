const express = require('express');
const router = express.Router();
const {body,validationResult } = require('express-validator');

/**
 * @route  post api/users
 * @desc   Test route
 * @access Public
 */
// router.get('/',(req,res) => {
//      res.send('User Route');
// })

router.post('/',[

     body('name','Name is required').not().isEmpty(),
     body('email','Please include a valid email').isEmail(),
     body('password','Please enter a password with 6 or more Characters').isLength({min:6})
],(req,res) => {

        const errors = validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){

               return res.status(400).json({
                       status:400,
                       errors:errors.array()
               });
          }
     

       res.send('Registration')
})


module.exports = router;