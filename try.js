var express=require("express");
var app =express();
var mongo=require("mongodb");
var MongoClient=require("mongodb").MongoClient;
var bodyParser=require("body-parser");
var url="mongodb://localhost:27017/";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/employees",function(req,res){
    var eno=req.body.eno;
    var ename=req.body.ename;
    var retval={
        eno:eno,
        ename:ename
    };
    console.log(req.body);
    savemp(retval);
    console.log(retval);
    res.status(200).send(retval);

});
app.listen(5000);
function savemp(emp)
{
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
        if (err) throw(err);
        var dbo=db.db("empl");
        dbo.collection("info").insertOne(emp,function(err,res){
            if (err) throw err;
      console.log("Inserted 1 empolyee document !! ");
      db.close();
        });

    });
}