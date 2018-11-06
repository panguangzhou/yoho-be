var express = require('express');
var router = express.Router();
let MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/yoho';
/* GET users listing. */
//查询所有数据显示到后台管理系统
router.get('/findall', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功！");
    //连接到集合
    let dbo = db.db('yoho');

    dbo.collection('goodslist').find({}).toArray(function (err, result) {
      if (err) {
        console.log(err)
      }
      res.send(result);
      //关闭数据库
      db.close();
    })
  });
});
//更新数据
router.get('/upadata', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  let obj = JSON.parse(req.query.data);
  let ids = obj.ids*1;
  let title = obj.title;
  let price = obj.price*1;
  let nums = obj.nums*1;
  let hot = obj.hot*1;
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功!");
    let dbo = db.db('yoho');
    var whereData = { ids }
    var updateDat = { $set: {title,price,nums,hot}}; //如果不用$set，替换整条数据
    // console.log(updateDat)
    dbo.collection('goodslist').update(whereData,updateDat, function (error, result) {
      if (error) {
        console.log('Error:' + error);
      } else {
        dbo.collection('goodslist').find({}).toArray(function (err, results){
          if (err) {
            console.log(err)
          }
          res.send(results);
          //关闭数据库
          db.close();
        })
      }
    });
  });
})
module.exports = router;
