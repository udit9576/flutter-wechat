const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

mongoose.connect(
    "mongodb://127.0.0.1:27017/wechat-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
    }
);


app.use(express.json());
app.use(cors());


const router = require("./routes/user_auth_routes");

app.use("/", router);

const port = 3000 || process.env.port;

app.listen(port, ()=>{
    console.log("Listening on port ", port);
});