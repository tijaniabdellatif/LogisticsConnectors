const jwt = require('jsonwebtoken');
require('dotenv').config();


/**
 * Manipulate the token
 * @param {Object} request 
 * @param {Object} response 
 * @param {CallableFunction} next 
 */
module.exports = function(request,response,next){
 
     const token = request.header('x-auth-token');


      if(!token){

          return response.status(401).json({
               message:'No token, Authorization denied'
          })
      }

      try{
           
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        request.user = decoded.user;
        next();

      }catch(err){
          response.status(401).json({

               message:'Token is not Valid'
          })
      }
}