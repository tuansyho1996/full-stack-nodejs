import express from "express";
import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./route/web.js"
import connectDB from './config/connectDB.js';
// var cors = require('cors')
require('dotenv').config();

let app = express();
// app.use(cors())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('backend nodejs is runing on the port :' + port);
})
