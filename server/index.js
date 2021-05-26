const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");

const app = express();

mongoose.connect("mongodb+srv://covisource:YMrnHuaKaNaFXNw5@cluster0.i1mxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch((error) => console.log(error));

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const PORT = 8000;

app.listen(PORT, ()=> console.log(`Server is running at PORT: ${PORT}`));