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
  let ids = obj.ids * 1;
  let title = obj.title;
  let price = obj.price * 1;
  let nums = obj.nums * 1;
  let hot = obj.hot * 1;
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功!");
    let dbo = db.db('yoho');
    var whereData = { ids }
    var updateDat = { $set: { title, price, nums, hot } }; //如果不用$set，替换整条数据
    // console.log(updateDat)
    dbo.collection('goodslist').update(whereData, updateDat, function (error, result) {
      if (error) {
        console.log('Error:' + error);
      } else {
        dbo.collection('goodslist').find({}).toArray(function (err, results) {
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
//商品数据排序
router.get('/sort', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功！");
    //连接到集合
    let dbo = db.db('yoho');
    let change = req.query.change;
    let boom = req.query.boom;
    if (change == 'true') {
      change = 1;
    } else if (change == 'false') {
      change = -1;
    } else {
      change = 1;
    }
    if (boom == 'price') {
      dbo.collection('goodslist').find().sort({ 'price': change }).toArray(function (err, result) {
        if (err) {
          console.log(err)
        }
        res.send(result);
        //关闭数据库
        db.close();
      })
    }
    if (boom == 'nums') {
      dbo.collection('goodslist').find().sort({ 'nums': change }).toArray(function (err, result) {
        if (err) {
          console.log(err)
        }
        res.send(result);
        //关闭数据库
        db.close();
      })
    }
    if (boom == 'hot') {
      dbo.collection('goodslist').find().sort({ 'hot': change }).toArray(function (err, result) {
        if (err) {
          console.log(err)
        }
        res.send(result);
        //关闭数据库
        db.close();
      })
    }
  });
});
//添加商品的路由
//先查询是否存在该ID的产品
router.get('/check', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功！");
    //连接到集合
    let dbo = db.db('yoho');
    let idsMore = JSON.parse(req.query.idsMore);
    dbo.collection('goodslist').find({ ids: idsMore }).toArray(function (err, result) {
      if (err) {
        console.log(err)
      }
      console.log(result)
      if (result == '') {
        res.send('yes')
      } else {
        res.send('no')
      }
      //关闭数据库
      db.close();
    })
  });
});
//插入数据
router.get('/insert', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功！");
    //连接到集合
    let dbo = db.db('yoho');
    let data = JSON.parse(req.query.data)
    let ids = data.idsMore * 1;
    let nums = data.numsMore * 1;
    let name = data.nameMore;
    let title = data.titleMore;
    let price = data.priceMore * 1;
    let imgUrl = data.imgMore;
    dbo.collection('goodslist').insert([{ ids, nums, name, title, price, imgUrl }], function (err, result) {
      if (err) {
        console.log(err)
      }
      //如果插入数据成功，重新返回数据到管理界面渲染
      if (result !== '') {
        dbo.collection('goodslist').find().toArray(function (error, results) {
          if (error) {
            console.log(error);
          }
          res.send(results)
        })
      }
      db.close();
    })
  });
});
//删除选中的数据
router.get('/delete', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功！");
    //连接到集合
    let dbo = db.db('yoho');
    let ids = JSON.parse(req.query.ids)
    dbo.collection('goodslist').remove({ ids }, function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result !== '') {
        dbo.collection('goodslist').find().toArray(function (error, results) {
          if (error) {
            console.log(error);
          }
          res.send(results)
        })
      }
      db.close();
    })
  });
});
//注册普通用户
router.get('/kefu', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功！");
    //连接到集合
    let dbo = db.db('yoho');
    let username = req.query.username;
    let password = req.query.password;
    dbo.collection('be-kefu-admin').find({ username }).toArray(function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result == '') {
        dbo.collection('be-kefu-admin').insert([{ username, password }], function (error, results) {
          if (error) {
            console.log(error)
          }
          res.send('yes')
        })
      } else {
        res.send('no')
      }
      //关闭数据库
      db.close();
    })
  });
});
//登录页面，并区分是什么用户登录
router.get('/admin', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功！");
    //连接到集合
    let dbo = db.db('yoho');
    let radio = req.query.radio;
    let username=req.query.username;
    let password = req.query.password;
    let list;
    if(radio==='1'){
      list='boss';
    }else if(radio==='2'){
      list='be-admin';
    }else if(radio==='3'){
      list='be-kefu-admin';
    }
    dbo.collection(list).find({username,password}).toArray(function (err, result) {
      if (err) {
        console.log(err)
      }
      console.log(result)
      if(result.length>0){
        res.send('yes')
      }else{
        res.send('no')
      }
      db.close();
    })
  });
});
//分类去渲染数据
router.get('/traverse', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功！");
    //连接到集合
    let dbo = db.db('yoho');
    let name= req.query.name;
    dbo.collection('goodslist').find({name}).toArray(function (err, result) {
      if (err) {
        console.log(err)
      }
      console.log(result)
      res.send(result);
      //关闭数据库
      db.close();
    })
  });
});
//搜索界面数据查询
router.get('/all', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', "*");
  MongoClient.connect(DB_CONN_STR, function (error, db) {
    console.log("连接成功！");
    //连接到集合
    let dbo = db.db('yoho');
    let name = req.query.data
    dbo.collection('goodslist').find({name}).toArray(function (err, result) {
      if (err) {
        console.log(err)
      }
      res.send(result);
      //关闭数据库
      db.close();
    })
  });
});
module.exports = router;
