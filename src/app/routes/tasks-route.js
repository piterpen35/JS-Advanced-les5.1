const express = require('express');
const route = express.Router();

const taskController = require('../components/tasks/task-controller');

module.exports = () => {
  route.get('/', taskController.getAllTask);
  route.post('/', taskController.createTask);
  route.put('/:id', taskController.updateTask);
  route.delete('/:id', taskController.removeTask);

  return route;
}