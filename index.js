'use strict';

const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
// const cors = require('cors');

const databaseUrl = process.env.NODE_ENV === 'production' ?
    'mongodb://tccmoveis:tccmoveis@ds245755.mlab.com:45755/tccmoveis' :
    'mongodb://localhost:27017/tccmoveis';

global.conn = mongoose.connect(databaseUrl);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(morgan("dev"));

app.use(
    (req, res, next) => {
        // res.setHeader("Cache-Control", "public, max-age=30");
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.append("Access-Control-Allow-Origin", "*");
        res.append("Access-Control-Allow-Methods", ["GET", "POST", "PUT", "OPTIONS", "DELETE"]);
        res.append("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin");
        next();
    }
);

app.get('/', (req, res, next) => {
    res.status(200).send("Connect in server!!!")
})

app.use('/api', routes);

app.listen(process.env.PORT || 8080, console.log("Connect Server port 8080 !!!"));