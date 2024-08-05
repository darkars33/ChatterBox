const mongoose = require('mongoose');

const ConnectToDB = async () =>{
          try {
                    const Connection = (await mongoose.connect(process.env.MONGODB_URL));

                    console.log(`Connected to DB: ${Connection.connection.host}`);
                    
          } catch (error) {
                    console.log(error);
          }
}

module.exports = ConnectToDB;