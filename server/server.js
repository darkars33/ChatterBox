const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectToDB = require("./db/ConnectToDB");
const cookieParser = require("cookie-parser");


const userRoute = require("./routes/index.route");
const {app, server} = require("./socket/index");

// const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

server.listen(PORT, () => {
  ConnectToDB();
  console.log(`Server is running on port ${PORT}`);
});
