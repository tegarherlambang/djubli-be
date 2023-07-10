require('./cron-job/UpdateCarPromotion');
const express = require("express");
const moment = require("moment");
const cors = require("cors");
const Relationship = require("./models/Relationship")
const app = express();
const expressJSDocSwagger = require('express-jsdoc-swagger');
const fs = require('fs')
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

/* Read models */
fs.readdir('./models', async (err, files) => {
    files.forEach((file, i) => {
        import('./models/' + file);
    })
})
Relationship()
var corsOptons = {
    origin: "*"
};
app.use(cors(corsOptons));


global.moment = moment
global.io = io

moment.locale('id');

// API DOCS SWAGGER
if (process.env.NODE_ENV === "development") {
    const options = {
        info: {
            version: '1.0.0',
            title: 'Klapa Procurement',
            license: {
                name: 'PT. BISNIS INTEGRASI GLOBAL',
            },
        },
        security: {
            BearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
        filesPattern: ['./docs/*.js'], // Glob pattern to find your jsdoc files
        swaggerUIPath: '/api-web', // SwaggerUI will be render in this url. Default: '/api-docs'
        baseDir: __dirname,
    }

    expressJSDocSwagger(app)(options)
}

// parse requests of content-type - application/json

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const router = require('./routes/router');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/uploads'));

app.use(router)

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to API" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;


io.on("connection", socket => {
    console.log("Socked connected");
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
