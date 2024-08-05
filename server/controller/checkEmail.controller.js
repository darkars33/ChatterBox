const User = require('../models/User.model');

const checkEmail = async (req, res) =>{
          try {
                    const {email} = req.body;

                    const userEmail= await User.findOne({email});

                    if(!userEmail){
                              return res.status(404).json({message: "Email not found"});
                    }

                    res.status(200).json({
                              message: "Email found",
                              data: userEmail,
                              success: true,
                    })

          } catch (error) {
                    console.log(error);
                    res.status(500).json({message: "Internal Server Error"});
          }
}


module.exports = {checkEmail}