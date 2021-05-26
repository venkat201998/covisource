const express = require("express");
const mongoose = require("mongoose");
const admin = require("./firebase");

const app = express();

const PORT = 8000;

mongoose.connect("mongodb+srv://covisource:YMrnHuaKaNaFXNw5@cluster0.i1mxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch((error) => console.log(error));

app.listen(PORT, ()=> console.log(`Server is running at PORT: ${PORT}`));