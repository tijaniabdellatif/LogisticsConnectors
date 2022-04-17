const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * @route get api/profile/me
 * @description Get current user profile
 * @access private {token based}
 * @param String uri 
 * @param Array validation
 * @callback (request,response)
 */
router.get('/me',auth,async (req,res) => {
     
     try{
             const profile  = await Profile.findOne({ user : req.user.id})
             .populate('user',['name','avatar']);

             if(!profile){

                res.status(400).json({
                        
                        status:res.statusCode,
                        msg:"there's no profile for this user"
                }) 
             }


             res.json(profile);

     }catch(e){

           console.error(e.message);
           res.status(500).send('Server Error')
     }
})


module.exports = router;