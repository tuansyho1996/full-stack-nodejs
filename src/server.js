import express from "express";
import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./route/web.js"
require('dotenv').config();

let app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('backend nodejs is runing on the port :' + port);
})
