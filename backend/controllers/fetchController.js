const db = require('../config/database');

const getTasks = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM tasks WHERE userid = ?", [id], (err, result) => {
        if(err)return res.send({err: err});
        return res.send(result);
    });
}

const getProjects = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM projects WHERE userid = ?", [id], (err, result) => {
        if(err)return res.send({err: err});
        return res.send(result);
    });
}

const getTags = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM tags WHERE userid = ?", [id], (err, result) => {
        if(err)return res.send({err: err});
        return res.send(result);
    });
}

module.exports = { getTasks, getProjects, getTags };