const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));

const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
const timeStamp = new Date().getTime();
app.use(session({
    key: "username",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: timeStamp + (60 * 60 * 24 * 1000)
    }
}));

app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/task"));
app.use("/tags", require("./routes/tag"));
app.use("/projects", require("./routes/project"));
app.use("/", require("./routes/fetch"));

app.listen(3000, () => {
    console.log("Connected");
});

