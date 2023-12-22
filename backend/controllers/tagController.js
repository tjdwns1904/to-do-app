const db = require('../config/database');

const addTag = (req, res) => {
    const { id, tag } = req.body;
    db.query("SELECT * FROM tags WHERE userid = ? AND name = ?", [id, tag], (err, r) => {
        if(err)return res.send({err: err});
        if(r.length === 0){
            db.query("INSERT INTO tags (userid, name) VALUES (?, ?)", [id, tag], (err, result) => {
                if (err) return res.send({ err: err });
                return res.send({ msg: "Tag added successfully" });
            });
        }else{
            return res.send({msg: "The tag already exists!"});
        }
    });
};

const deleteTag = (req, res) => {
    const { userId, tag } = req.body;
    db.query("SELECT * FROM tasks WHERE userid = ? AND JSON_CONTAINS(tags, ?)", [userId, '"'+tag+'"'], (err, result) => {
        if (err) return res.send({ err: err });
        if (result.length === 0) {
            db.query("DELETE FROM tags WHERE userid = ? AND name = ?", [userId, tag], (err, r) => {
                if (err) return res.send({ err: err });
                return res.send({ msg: "Tag deleted successfully!" });
            })
        } else {
            return res.send({ msg: "There should be no related tasks with the tag!" });
        }
    });
};

module.exports = { addTag, deleteTag };