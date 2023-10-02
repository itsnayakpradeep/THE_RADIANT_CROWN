import express from "express";
import {readdirSync} from 'fs';
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();

//DB CONNECTION
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch((err) => console.log("DB connection Error: ",err))

//middleware morgan
const morgan = require("morgan");
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

// route middleware
readdirSync('./routes').map((r) => 
// app.use('/api', router);
    app.use("/api", require(`./routes/${r}`))); 


const port = process.env.PORT || 8000; //THIS PORT IS NOT AVAILABLE USE 8000 PORT bydefault
app.listen(port, () => console.log(`Server running on port 8000`))
