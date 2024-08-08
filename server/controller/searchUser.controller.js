const User = require("../models/User.model");

const searchUser = async (req, res) =>{
          try {
                 const {search}  = req.body;
                 
                 const query = new RegExp(search, "i", "g");

                 const user = await User.find({
                    "$or": [
                              {name: query},
                              {email: query},
                    ]
                 })

                 return res.status(200).json({
                    message: "all user found",
                    data: user,
                    success: true,
                 })

          } catch (error) {
                    return res.status(500).json({
                              message: error.message,
                              error: true
                    })
          }
}

module.exports = searchUser;