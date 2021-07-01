const express =  require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log(" Database Connected!");
    createDB();
});
function createDB() {
    console.log("Creating database");
    connection.query("CREATE DATABASE poonam", (err, result) => {
        if (err && err.code != "ER_DB_CREATE_EXISTS") {
            throw err;
        }
        console.log("Database created");
        createTable();
    });
}
function createTable() {
    console.log("Creating Table");
    let sql = "CREATE TABLE poonam.student "
        + "( rollno int NOT NULL UNIQUE, name VARCHAR(255), class int, mobile int )";
    connection.query(sql, (err, result) => {
        if (err && err.code != "ER_TABLE_EXISTS_ERROR") throw err;
        console.log("Table created");
    });
}

app.post("/student/add",(req, res) => {
    // make call to database;
    function onInsert(err, result) {
        if (err) {
            console.log(err);
            res.json({status: 200, error: err});
        } else {
            res.json({status: 200, message: "Student inserted successfully"});
        }
    }
    insertInDB(req.body, onInsert);
});

function insertInDB(student, callBack) {
    let sql = "INSERT INTO poonam.student"
        + " values(" + student.rollno + ",\"" + student.name + "\"," + student.class + "," + student.mobile +");";
    connection.query(sql, callBack);
}
// promises
// async await.

app.get("/student/get",(req,res) => {
    debugger
    function onGet(err, result) {
        debugger
        if (err) {
            console.log(err);
            result.json({status: 200, error: err});
        } else {
            res.json({ status : 200, message: result});
        }
    }
    getInDB(req.query, onGet);
});

function getInDB(student, callback) {
    debugger
    let sql = "SELECT * FROM poonam.student";
    connection.query(sql, callback);
}

   /* debugger
    let studentClass = parseInt(req.query.class);
    let studentRollno= parseInt(req.query.rollno);

    // make call to database;
    console.log(studentClass);
    console.log(studentRollno);*/


app.listen(4000, () => {
    console.log("Server running..");
    console.log("URL: http://localhost:4000");
});
