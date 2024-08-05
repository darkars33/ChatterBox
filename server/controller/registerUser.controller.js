const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) =>{
          try {
                    const {name, email, password, profile_Pic} = req.body;
                    const user = await User.findOne({email, name});

                    if(user){
                              return res.status(404).json({message: "User already exists"});
                    }

                    const salt= await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);

                    const newUser= new User({
                              name,
                              email,
                              password: hashPassword,
                              profile_Pic
                    })

                    if(newUser){
                              await newUser.save();
                              res.status(201).json({
                                        message: "User created successfully",
                                        data: newUser,
                                        success: true
                              });
                    }

          } catch (error) {
                   console.log(error);
                   res.status(500).json({message: "Internal Server Error"}); 
          }
}


module.exports = {
     registerUser     
}