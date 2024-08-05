const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const getUserDetailsFromToken = async (token,req, res) => {
          try {
                    if(!token){
                              return res.status(400).json({
                                        message: "session out",
                                        logout: true,
                              })
                    }

                    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

                    const user = await User.findById(decoded.id).select('-password');

                    return user;

          } catch (error) {
                    console.log(error);
                    res.status(500).json({message: "Internal Server Error"});
          }
}

module.exports = getUserDetailsFromToken;