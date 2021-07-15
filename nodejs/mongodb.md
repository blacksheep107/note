# ndoejs访问mongodb
```
// 代码

const { MongoClient } = require('mongodb');

// mongo官方给的 <password>换成自己设置的密码，网页版可以查看，在主页菜单栏的Database Access配用户密码。
// 后面的test是数据库名

const uri = "mongodb+srv://cm:amanda1@cluster0.owa6y.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
client.connect(err => {
  const collection = client.db("test").collection("cmd");
  // perform actions on the collection object
  collection.find({}).toArray(function(err,result){
        if(err)   throw err;
        console.log(result);
        app.get('/api/get',bodyParser.json(),function(req,res){
            res.json(result);
        });
        app.listen('3001',function(){
            console.log('port start!');
        })
      client.close();
  })
});
```
