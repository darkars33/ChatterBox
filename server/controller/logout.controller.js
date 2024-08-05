const logout = async (req, res) =>{
          try {
                    const cookieData = {
                              http: true,
                              secure: true,
                    }

                    res.cookie("token", "", cookieData).status(200).json({
                              message: "Session out",
                              success: true,
                    })
          } catch (error) {
                    console.log(error);
                    res.status(500).json({message: "Internal server error"});
          }
}

module.exports = logout;