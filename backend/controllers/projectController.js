const db = require('../config/database');

const addProject = (req, res) => {
    const { userID, name } = req.body;
    db.query("SELECT * FROM projects WHERE userid = ? AND name = ?", [userID, name], (err, r) => {
        if(err)return res.send({err: err});
        if(r.length === 0){
            db.query("INSERT INTO projects (userid, name) VALUES (?, ?)", [userID, name], (err, result) => {
                if (err) return res.send({ err: err });
                return res.send({ msg: "Project added successfully" });
            });
        }else{
            return res.send({msg: "The project already exists!"});
        }
    });
};

const deleteProject = (req, res) => {
    const { name } = req.params;
    const { userID } = req.body;
    db.query("SELECT * FROM tasks WHERE userid = ? AND project = ?", [userID, name], (err, result) => {
        if (err) return res.send({ err: err });
        if (result.length === 0) {
            db.query("DELETE FROM projects WHERE userid = ? AND name = ?", [userID, name], (err, r) => {
                if (err) return res.send({ err: err });
                return res.send({ msg: "Project deleted successfully!" });
            })
        } else {
            return res.send({ msg: "There should be no related tasks with the project!" });
        }
    });
};

module.exports = { addProject, deleteProject };