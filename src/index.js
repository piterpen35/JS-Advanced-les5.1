const express = require('express');
const mysql = require('mysql');
require('./app/components/shared/models/index.js');
const bodyParser = require('body-parser');

const routing = require('./app/routes/index.js');
const config = require('./config/app.js');

const app = express();

app.use(bodyParser.json());
app.use('/api', routing());

const {appPort, mysqlConfig} = config;

const connection = mysql.createConnection({
    host:mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password
});

connection.connect(error => {
    if (error) {
        console.log(error);
        return error;
    }
    app.listen(appPort, () => console.log(`Listen on port: ${appPort} \nConnection started!`));
});