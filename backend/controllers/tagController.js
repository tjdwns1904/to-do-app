const db = require('../config/database');

const addTag = (req, res) => {
    const { userID, name } = req.body;
    db.query("SELECT * FROM tags WHERE userid = ? AND name = ?", [userID, name], (err, r) => {
        if (err) return res.send({ err: err });
        if (r.length === 0) {
            db.query("INSERT INTO tags (userid, name) VALUES (?, ?)", [userID, name], (err, result) => {
                if (err) return res.send({ err: err });
                return res.send({ msg: "Tag added successfully" });
            });
        } else {
            return res.send({ msg: "The tag already exists!" });
        }
    });
};

const deleteTag = (req, res) => {
    const { name } = req.params;
    const { userID } = req.body;
    db.query("SELECT * FROM tasks WHERE userid = ? AND JSON_CONTAINS(tags, ?)", [userID, '"' + name + '"'], (err, result) => {
        if (err) return res.send({ err: err });
        if (result.length === 0) {
            db.query("DELETE FROM tags WHERE userid = ? AND name = ?", [userID, name], (err, r) => {
                if (err) return res.send({ err: err });
                return res.send({ msg: "Tag deleted successfully!" });
            })
        } else {
            return res.send({ msg: "There should be no related tasks with the tag!" });
        }
    });
};

module.exports = { addTag, deleteTag };