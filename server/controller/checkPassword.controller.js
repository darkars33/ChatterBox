const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const checkPassword = async (req, res) =>{
          try {
                    const {password, userId} = req.body;

                    const user = await User.findById(userId);

                    if(!user){
                              return res.status(404).json({message: "User not found"});
                    }

                    const verifyPassword = await bcryptjs.compare(password, user.password);

                    if(!verifyPassword){
                              return res.status(400).json({message: "Password is incorrect"});
                    }

                    const tokenData= {
                              id: user._id,
                              email: user.email,
                    }

                    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '15d'});

                    const cookieData= {
                              http: true,
                              secure: true,
                    }

                    res.cookie('token',token, cookieData).status(200).json({
                              message: "Login successful",
                              token: token,
                              success: true,
                    })

          } catch (error) {
                    console.log(error);
          }
}

module.exports = {checkPassword}