const TaskModel = require("../models/Tasks")

exports.createTask = async (req, res) => {
    const task = new TaskModel({ title: 'Zildjian' });
    task.save().then(() => res.send(task));
}