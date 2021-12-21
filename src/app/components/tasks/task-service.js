const mysql = require('mysql');

const config = require('../../../config/app.js');

const { appPort, mysqlConfig } = config;

const connection = mysql.createConnection({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database
});

function myQueryPromise(data) {
    return new Promise((resolve, reject) => {
        connection.query(data, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

const getAllTasks = () => {
    return myQueryPromise(`select * from sometasks`);    
};

const taskValidation = (newTask) => {
    const { text, description } = newTask;
    const task = { text, description, isDone: false };
    for (let prop in task) {
        if(task.hasOwnProperty(prop) && task[prop] === undefined) {
            return false;
        }
    }
    return task;
};

const createTask = (newTask) => {
    const task = taskValidation(newTask);
    if(!task) {
        return Promise.reject();
    }
    return myQueryPromise(`insert into sometasks(text, description, isDone) values("${newTask.text}", "${newTask.description}", ${newTask.isDone})`);
};

const updateTask = (taskId, task) => {
    const { text, description, isDone } = task;
    const updetedTask = { text, description, isDone };
    
    let sql = `update sometasks set`;
    let str = "";
    
    for (let prop in updetedTask) {
        if (updetedTask[prop] !== undefined) {
            if (prop === 'isDone') {
                str += ` ${prop} = ${updetedTask[prop]},`;
            } else {
                str += ` ${prop} = "${updetedTask[prop]}",`;
            }
        }
    }
    sql += ` ${str.slice(0, -1)} where id = ${parseInt(taskId)}`;
    
    return myQueryPromise(sql);
};

const removeTask = (taskId) => {
    return myQueryPromise(`delete from sometasks where id = ${parseInt(taskId)}`);
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    removeTask
};
