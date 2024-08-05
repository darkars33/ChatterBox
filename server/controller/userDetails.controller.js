const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');

const userDetails = async (req, res) =>{
          try {
                    const token = req.cookies.token || "";

                    const user = await getUserDetailsFromToken(token, req, res);

                    return res.status(200).json({
                              message: "User details",
                              data: user,
                              success: true,
                    })

          } catch (error) {
                    console.log(error);
                    res.status(500).json({message: "Internal Server Error"});
          }
}

module.exports = userDetails