const db = require("../config/database");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const checkAuth = (req, res) => {
    if (req.session.user) {
        return res.send({ isLoggedIn: true, user: req.session.user });
    } else {
        return res.send({ isLoggedIn: false });
    }
}

const login = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE BINARY(email) = ?", [email], (err, result) => {
        if (err) return res.send({ err: err });
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, same) => {
                if (same) {
                    req.session.user = result;
                    return res.send({ code: 200, msg: "Welcome" });
                } else {
                    return res.send({ code: 401, msg: "Account not registered!" });
                }
            })
        } else {
            return res.send({ code: 401, msg: "Account not registered!" });
        }
    });
};

const register = (req, res) => {
    const { name, username, email, password } = req.body;
    db.query("SELECT * FROM users WHERE BINARY(name)=?", [name], (err, nResult) => {
        if (err) {
            return res.send({ err: err });
        }
        if (nResult.length === 0) {
            db.query("SELECT * FROM users WHERE BINARY(username)=?", [username], (err, uResult) => {
                if (err) {
                    return res.send({ err: err });
                }
                if (uResult.length === 0) {
                    db.query("SELECT * FROM users WHERE BINARY(email)=?", [email], (err, eResult) => {
                        if (err) {
                            return res.send({ err: err });
                        }
                        if (eResult.length === 0) {
                            bcrypt.hash(password, saltRounds, (err, hash) => {
                                if (err) {
                                    return res.send({ err: err });
                                }
                                db.query("INSERT INTO users (name, username, password, email) VALUES (?, ?, ?, ?)",
                                    [name, username, hash, email],
                                    (err, result) => {
                                        if (err) {
                                            return res.send({ err: err });
                                        } else {
                                            return res.send({ code: 201, msg: "Registered successfully!" });
                                        }
                                    }
                                );
                            });
                        } else {
                            return res.send({ code: 409, msg: "Account with the same email already exists!" });
                        }
                    })
                } else {
                    return res.send({ code: 409, msg: "Account with the same username already exists!" });
                }
            })
        } else {
            return res.send({ code: 409, msg: "Account with the same name already exists!" });
        }
    })
}

const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie("username");
    res.status(200).send({ msg: "Logged out succesfully!" });
}

module.exports = { login, register, checkAuth, logout };