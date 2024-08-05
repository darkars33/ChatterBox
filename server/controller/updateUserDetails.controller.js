const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');
const User = require('../models/User.model');

const updateUserDetails = async (req, res) =>{
          try {
                    const token = req.cookies.token || "";

                    const user = await getUserDetailsFromToken(token, req, res);
                    
                    const {name, profile_Pic} = req.body;

                    const updateUser= await User.updateOne({_id: user._id} ,{
                              name,
                              profile_Pic,
                    })

                    const updatedUser = await User.findById(user._id).select('-password');

                    res.status(200).json({
                              message: "User updated Successfully",
                              data: updatedUser,
                              success: true,
                    })
                    

          } catch (error) {
                    console.log(error);
                    res.status(500).jspn({message: error.message});
          }
}

module.exports = updateUserDetails