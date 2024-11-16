const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, additionalNotes, date, time, status, group } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      additionalNotes,
      date,
      time,
      status,
      group,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getTasksByGroup = async (req, res) => {
  const { group } = req.params;

  try {
    const tasks = await Task.find({ user: req.user.id, group });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, additionalNotes, date, time, status, group } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.additionalNotes = additionalNotes || task.additionalNotes;
    task.date = date || task.date;
    task.time = time || task.time;
    task.status = status || task.status;
    task.group = group || task.group;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    // Use deleteOne() instead of remove()
    await Task.deleteOne({ _id: id });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 }); // Sort by latest
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllTasks = async (req, res) => {
  const { status } = req.query; // Get status from query parameter
  
  try {
    let tasks;

    if (status) {
      // Filter tasks by status
      tasks = await Task.find({ user: req.user.id, status }).sort({ createdAt: -1 });
    } else {
      // If no status is provided, return all tasks
      tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
