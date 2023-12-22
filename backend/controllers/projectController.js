const db = require('../config/database');

const addProject = (req, res) => {
    const { id, project } = req.body;
    db.query("SELECT * FROM projects WHERE userid = ? AND name = ?", [id, project], (err, r) => {
        if(err)return res.send({err: err});
        if(r.length === 0){
            db.query("INSERT INTO projects (userid, name) VALUES (?, ?)", [id, project], (err, result) => {
                if (err) return res.send({ err: err });
                return res.send({ msg: "Project added successfully" });
            });
        }else{
            return res.send({msg: "The project already exists!"});
        }
    });
};

const deleteProject = (req, res) => {
    const { userId, project } = req.body;
    db.query("SELECT * FROM tasks WHERE userid = ? AND project = ?", [userId, project], (err, result) => {
        if (err) return res.send({ err: err });
        if (result.length === 0) {
            db.query("DELETE FROM projects WHERE userid = ? AND name = ?", [userId, project], (err, r) => {
                if (err) return res.send({ err: err });
                return res.send({ msg: "Project deleted successfully!" });
            })
        } else {
            return res.send({ msg: "There should be no related tasks with the project!" });
        }
    });
};

module.exports = { addProject, deleteProject };