const db = require('../config/database');

const addTask = (req, res) => {
    const { userID, title, description, project, tags, time, date } = req.body;
    db.query("SELECT * FROM tasks WHERE userid = ? AND time = ? AND date = ? AND title = ?", [userID, time, date, title], (err, result) => {
        if (err) return res.send({ err: err });
        if (result.length === 0) {
            db.query("INSERT INTO tasks (userid, title, description, project, tags, time, date, isDone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [userID, title, description, project, tags, time, date, false], (err, r) => {
                    if (err) return res.send({ err: err });
                    return res.send({ code: 201, msg: "Task added successfully!" });
                });
        } else {
            return res.send({ code: 409, msg: "The task already exists!" });
        }
    });
};

const updateState = (req, res) => {
    const { id } = req.params;
    const { userID, isDone } = req.body;
    db.query("UPDATE tasks SET isDone = ? WHERE userid = ? AND id = ?", [!isDone, userID, id], (err, result) => {
        if (err) return res.send({ err: err });
        return res.send({ msg: "Update done." });
    });
}

const updateTask = (req, res) => {
    const { id } = req.params;
    const { userID, title, description, project, tags, time, date } = req.body;
    db.query("SELECT * FROM tasks WHERE userid = ? AND time = ? AND date = ? AND title = ? AND id NOT LIKE ?", [userID, time, date, title, id], (err, result) => {
        if (err) return res.send({ err: err });
        if (result.length === 0) {
            db.query(`UPDATE tasks SET title = ?, description = ?, project = ?, tags = ?, time = ?, date = ? WHERE userid = ? AND id = ?`,
                [title, description, project, tags, time, date, userID, id], (err, r) => {
                    if (err) return res.send({ err: err });
                    return res.send({ code: 200, msg: "Task updated successfully!" })
                })
        } else {
            return res.send({ code: 409, msg: "The task already exists!" });
        }
    });
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
        if (err) return res.send({ err: err });
        return res.send({ msg: "Task deleted succuessfully!" });
    });
};


module.exports = { addTask, updateTask, deleteTask, updateState };