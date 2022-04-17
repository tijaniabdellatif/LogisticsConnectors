const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
     user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'user'
     },
     website:{
        type:String
     },
     location:{
        type:String
     },

     status:{
        type:String,
        required:true
     },

     position:{
        
          lat:{
              type:Number
          },
          lng:{

            type:Number
          }
     },

     tags:{

        type:[String],
        required:true
     },

     bio:{

          type:String
     },

     githubusername:{

        type:String
     },

     experience:[
         {
              title:{
                   type:String,
                   required:true
              },

              company:{
                  type:String,
                  required:true
              },

              location:{
                  type:String
              },

              from:{

                type:Date,
                required:true
              },

              
              to:{

                type:Date,
                
              },

              
              current:{

                type:Boolean,
                default:false
              },

              
              description:{

                type:String,
               
              }
         }
     ],


     eduction:[

          {
               school:{

                type:String,
                required:true
               },

               degree:{

                type:String,
                required:true
               },

               fields:{

                   type:String,
                   required:true
               },

               tagsfield:{

                 type:[String]
               },

               from:{

                type:Date,
                required:true
               },

               to:{

                  type:Date
               },

               current:{

                type:Boolean,
                default:false,
               },

               description:{

                type:String
               }


          }

     ],

     social:{

        youtube:{
            type:String
        },

        twitter:{

            type:String
        },
        linkedin:{

            type:String
        }, 
     },

     date:{

          type:Date,
          default:Date.now
     }



});


module.exports = Profile = mongoose.model('profile',ProfileSchema);