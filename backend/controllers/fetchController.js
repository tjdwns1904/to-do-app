const db = require('../config/database');

const setQuery = (query) => {
    let result = `SELECT * FROM tasks WHERE userid = ?`;
    if(query.title){
        result = result.concat(` AND title = '${query.title}'`);
    }
    if(query.project){
        result = result.concat(` AND project = '${query.project}'`);
    }
    if(query.date && query.time){
        result = result.concat(` AND date >= '${query.date}' AND time >= '${query.time}'`);
    }else if(query.date){
        result = result.concat(` AND date = '${query.date}'`);
    }
    if(query.tag){
        result = result.concat(` AND JSON_CONTAINS(tags, '"${query.tag}"')`);
    }
    if(query.isDone){
        result = result.concat(` AND isDone = ${query.isDone}`);
    }
    return result;
}

const getTasks = (req, res) => {
    const { userID } = req.query;
    let query = setQuery(req.query);
    db.query(query, [userID], (err, result) => {
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