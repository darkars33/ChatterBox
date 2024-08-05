const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectToDB = require("./db/ConnectToDB");
const cookieParser = require("cookie-parser");


const userRoute = require("./routes/index.route");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  ConnectToDB();
  console.log(`Server is running on port ${PORT}`);
});
