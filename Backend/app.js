const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Router = require("./routers");
dotenv.config();
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Allow CORS for all origins

mongoose
    .connect(process.env.DATABASE, {})
    .then((result) => {
        console.log("connected to mongodb and listening at port 5000");
    })
    .catch((err) => console.error(err));

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", function (req, res) {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.get("/", (req, res) => {
    res.send("<h1>Hello Welcome TO Expense tracker</h1>");
});

app.listen(port, () => {
    console.log(`Listening on Port http://localhost:${port}`);
});
