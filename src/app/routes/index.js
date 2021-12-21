const Router = require('express').Router;

const tasks = require('./tasks-route');

module.exports = () => {
  const routing = Router();

  routing.use('/tasks', tasks());

  return routing;
}