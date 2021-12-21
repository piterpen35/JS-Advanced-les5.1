const mysql = require('mysql');

const config = require('../../../../config/app.js');

const { appPort, mysqlConfig } = config;


const connection = mysql.createConnection({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password
});

function myQuery(data) {
    connection.query(data, error => {
        if (error) {
            console.log(error);
            return error;
        }
    });
}

myQuery('create database if not exists myDB');
myQuery('use myDB');
myQuery(`create table if not exists someTasks(
            id int not null primary key auto_increment,
            text varchar(255) not null,
            description varchar(120),
            isDone boolean not null default false
            );`);