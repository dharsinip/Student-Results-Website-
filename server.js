var express = require("express");

var app = express();
var bodyParser = require("body-parser");
var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/employees", (req, res) => {
  var dept = req.query.dept;

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Faculty");

    var data = dbo
      .collection("facInfo")
      .find({ dept: dept })
      .toArray(function (err, items) {
        if (err) throw err;
        console.log(items);
        res.status(200).send(items);
      });
    //console.log(data);
  });

  //res.status(200).send(data);
});

app.post("/api/employee", (req, res) => {
  var eno = req.body.eno;
  var dept = req.body.dept;
  var ename = req.body.ename;
  var eage = req.body.eage;
  var retVal = {
    eno: eno,
    name: ename,
    age: eage,
    dept: dept,
  };

  console.log(req.body);
  savemp(retVal);
  console.log(retVal);
  res.status(200).send(retVal);
});

app.listen(5000, () => {
  console.log("server has started");
});

function savemp(emp) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Faculty");

    dbo.collection("facInfo").insertOne(emp, function (err, res) {
      if (err) throw err;
      console.log("Inserted 1 faculty document !! ");
      db.close();
    });
  });
}
