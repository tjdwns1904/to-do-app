const db = require('../config/database');

const addTask = (req, res) => {
    const { id, task, tags } = req.body;
    db.query("SELECT * FROM tasks WHERE userid = ? AND time = ? AND date = ? AND title = ?", [id, task.time, task.date, task.title], (err, result) => {
        if (err) return res.send({ err: err });
        if (result.length === 0) {
            db.query("INSERT INTO tasks (userid, title, description, project, tags, time, date, isDone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [id, task.title, task.description, task.project, tags, task.time, task.date, false], (err, r) => {
                    if (err) return res.send({ err: err });
                    return res.send({ msg: "Task added successfully!" });
                });
        } else {
            return res.send({ msg: "The task already exists!" });
        }
    });
};

const updateState = (req, res) => {
    const { userId, taskId, isDone } = req.body;
    db.query("UPDATE tasks SET isDone = ? WHERE userid = ? AND id = ?", [!isDone, userId, taskId], (err, result) => {
        if(err)return res.send({err: err});
        return res.send({msg: "Update done."});
    });
}

const updateTask = (req, res) => {
    const { userId, taskId, task, tags } = req.body;
    db.query("SELECT * FROM tasks WHERE userid = ? AND time = ? AND date = ? AND title = ? AND id NOT LIKE ?", [userId, task.time, task.date, task.title, taskId], (err, result) => {
        if (err) return res.send({ err: err });
        if (result.length === 0) {
            db.query("UPDATE tasks SET title = ?, description = ?, project = ?, tags = ?, time = ?, date = ? WHERE userid = ? AND id = ?",
                [task.title, task.description, task.project, tags, task.time, task.date, userId, taskId], (err, r) => {
                    if (err) return res.send({ err: err });
                    return res.send({ msg: "Task updated successfully!" })
                })
        } else {
            return res.send({ msg: "The task already exists!" });
        }
    });
};

const deleteTask = (req, res) => {
    const { userId, taskId } = req.body;
    db.query("DELETE FROM tasks WHERE userId = ? AND id = ?", [userId, taskId], (err, result) => {
        if (err) return res.send({ err: err });
        return res.send({ msg: "Task deleted succuessfully!" });
    });
};


module.exports = { addTask, updateTask, deleteTask, updateState };