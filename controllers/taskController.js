const { tasks } = require('../models/taskModel');

let nextId = tasks.length + 1;

// Get all tasks
const getAllTasks = (req, res) => {
  res.json(tasks);
};

// Create a new task
const createTask = (req, res) => {
  const { title, description, status, due_date } = req.body;
  const newTask = { id: nextId++, title, description, status, due_date };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Get tasks by status
const getTasksByStatus = (req, res) => {
  const { status } = req.params;
  const filteredTasks = tasks.filter(task => task.status.toLowerCase() === status.toLowerCase());
  res.json(filteredTasks);
};

// Update a task
const updateTask = (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id == id);
  if (!task) return res.status(404).send('Task not found');

  const { title, description, status, due_date } = req.body;
  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.due_date = due_date || task.due_date;

  res.json(task);
};

// Delete a task
const deleteTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) return res.status(404).send('Task not found');

  tasks.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getAllTasks,
  createTask,
  getTasksByStatus,
  updateTask,
  deleteTask,
};